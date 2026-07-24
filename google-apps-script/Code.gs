/**
 * HAWEE International Trade Fair — ghi dữ liệu form đăng ký vào Google Sheet.
 *
 * Cách cài đặt: xem README.md trong cùng thư mục này.
 */

var SPREADSHEET_ID = '1njlgjdF50IYZQEaapLYxyCk6zqyHjPJqOhxdHZoZSDc';

// Đánh dấu phiên bản — dùng để xác nhận deployment đang chạy đúng code mới nhất
// (kiểm tra bằng cách xem field "version" trong response JSON trả về).
var CODE_VERSION = 'v11-2026-07-24-secrets-in-script-properties';

// Secret key reCAPTCHA v3 + admin key cho action bảo trì (fix_headers) — KHÔNG hardcode trong source
// nữa (file này nằm trong git repo, hardcode secret ở đây là rò rỉ tiềm ẩn nếu repo có remote/được
// chia sẻ). Đọc từ Script Properties (File → Project settings → Script Properties trong Apps Script
// editor) — chỉ người có quyền truy cập project mới xem được, không nằm trong source code.
//   RECAPTCHA_SECRET_KEY = 6LdwTVYtAAAAAKaFHkI03QyZyrdslUBoccNd4lZr  (giá trị hiện tại, lấy tại
//   https://www.google.com/recaptcha/admin, cùng site đã đăng ký với VITE_RECAPTCHA_SITE_KEY)
//   ADMIN_SECRET = (chị tự đặt 1 chuỗi bất kỳ, dùng để xác thực action bảo trì fix_headers)
var SCRIPT_PROPS = PropertiesService.getScriptProperties();
var RECAPTCHA_SECRET_KEY = SCRIPT_PROPS.getProperty('RECAPTCHA_SECRET_KEY');
var ADMIN_SECRET = SCRIPT_PROPS.getProperty('ADMIN_SECRET');
var RECAPTCHA_MIN_SCORE = 0.5;

// Đổi sang tab MỚI (thay vì dùng lại "Đăng ký gian hàng" cũ) vì tab cũ đã có sẵn dòng tiêu đề
// từ bản code trước — getOrCreateSheet() chỉ ghi header lúc TẠO MỚI sheet nên header cũ không tự
// cập nhật theo cấu trúc field mới (thêm Chức vụ, Email nhận Phiếu thu/Hợp đồng...), khiến dữ liệu
// ghi vào bị lệch cột so với tiêu đề hiển thị. Tab mới đảm bảo header luôn khớp 100% với dữ liệu.
var SHEET_GIAN_HANG = 'Đăng ký gian hàng (v2)';
var SHEET_TAI_TRO = 'Đăng ký tài trợ';

var HEADERS_GIAN_HANG = [
  'Thời gian',
  'Tên doanh nghiệp',
  'Mã số thuế',
  'Địa chỉ trụ sở chính',
  'Website / Facebook',
  'Thị trường xuất khẩu',
  'Họ & Tên',
  'Chức vụ',
  'Email',
  'Email nhận Phiếu thu / Hợp đồng',
  'Số điện thoại',
  'Chi hội',
  'Lĩnh vực hoạt động',
  'Loại vé đăng ký',
  'Quan tâm trở thành NTT',
  'Sản phẩm trưng bày',
  'Ghi chú bảo mật',
];

var HEADERS_TAI_TRO = [
  'Thời gian',
  'Họ & Tên',
  'Tên Doanh nghiệp',
  'Gói tài trợ quan tâm',
  'Số điện thoại',
  'Email',
  'Ghi chú bảo mật',
];

// Google Sheets diễn giải ô bắt đầu bằng =, +, -, @ thành công thức (vd. =HYPERLINK(...)) —
// thêm dấu nháy đơn để ép Sheets hiển thị nguyên văn thay vì chạy công thức (chặn CSV/formula injection
// từ dữ liệu người dùng nhập trong form public).
function sanitizeCell(value) {
  var str = String(value == null ? '' : value);
  if (/^[=+\-@]/.test(str)) return "'" + str;
  return str;
}

// Ép Sheets hiểu ô là văn bản thuần (không tự chuyển thành số) — bắt buộc cho SĐT/MST vì
// Sheets tự cắt số 0 ở đầu khi đoán giá trị dạng số (vd. "0900000001" → 900000001,
// hoặc chuỗi toàn số 0 như "0000000000" → 0). Dấu nháy đơn đứng đầu chỉ là chỉ báo định dạng,
// Sheets không hiển thị dấu nháy đó trong ô.
function forceText(value) {
  return "'" + String(value == null ? '' : value);
}

// Verify token với Google trước khi ghi sheet. Trả về chi tiết (không chỉ true/false) để
// doPost() quyết định: THIẾU token hẳn (gọi thẳng URL bằng curl/Postman, không qua form thật)
// thì chặn cứng — đúng mục đích chống spam ban đầu. Nhưng CÓ token mà verify không đạt (điểm thấp,
// hoặc lỗi mạng gọi Google từ phía Apps Script) thì KHÔNG chặn — vẫn ghi vào sheet và đánh dấu
// "cần xem lại" ở cột riêng, vì với form đăng ký kinh doanh, mất 1 lead thật đắt hơn nhiều so với
// việc thỉnh thoảng có 1 dòng rác cần xoá tay.
function verifyRecaptcha(token) {
  if (!token) return { verified: false, blocking: true, note: 'Không có reCAPTCHA token — có thể gọi thẳng vào URL, không qua form web' };
  if (!RECAPTCHA_SECRET_KEY) {
    return { verified: false, blocking: false, note: 'Chưa cấu hình RECAPTCHA_SECRET_KEY trong Script Properties — vui lòng kiểm tra thủ công' };
  }
  try {
    var resp = UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'post',
      payload: { secret: RECAPTCHA_SECRET_KEY, response: token },
      muteHttpExceptions: true,
    });
    var result = JSON.parse(resp.getContentText());
    var score = typeof result.score === 'number' ? result.score : null;
    var passed = !!(result.success && (score === null || score >= RECAPTCHA_MIN_SCORE));
    if (passed) return { verified: true, blocking: false, note: '' };
    var codes = result['error-codes'] ? result['error-codes'].join(',') : '';
    return {
      verified: false,
      blocking: false,
      note: 'reCAPTCHA điểm thấp/không xác minh được (score=' + score + (codes ? ', ' + codes : '') + ') — vui lòng kiểm tra thủ công',
    };
  } catch (err) {
    return { verified: false, blocking: false, note: 'Không gọi được Google để xác minh reCAPTCHA (' + err.toString() + ') — vui lòng kiểm tra thủ công' };
  }
}

// Tiện ích bảo trì: gọi 1 lần (payload { action: 'fix_headers' }) để đồng bộ lại dòng tiêu đề
// của 2 sheet theo đúng HEADERS_GIAN_HANG / HEADERS_TAI_TRO hiện tại. Cần thiết vì getOrCreateSheet()
// chỉ ghi header lúc TẠO MỚI sheet — khi đổi cấu trúc cột (thêm/bớt/đổi thứ tự field) mà sheet đã
// có sẵn dữ liệu cũ, header cũ sẽ không tự cập nhật. Chỉ ghi đè dòng 1, không đụng dữ liệu bên dưới —
// an toàn để gọi lại nhiều lần (idempotent).
function fixHeaders() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  [
    [SHEET_GIAN_HANG, HEADERS_GIAN_HANG],
    [SHEET_TAI_TRO, HEADERS_TAI_TRO],
  ].forEach(function (pair) {
    var sheet = ss.getSheetByName(pair[0]) || ss.insertSheet(pair[0]);
    sheet.getRange(1, 1, 1, pair[1].length).setValues([pair[1]]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, pair[1].length).setFontWeight('bold');
  });
}

function doPost(e) {
  var result = { result: 'success', version: CODE_VERSION };
  try {
    var data = parseRequest(e);

    if (data.action === 'fix_headers') {
      fixHeaders();
      result.fixed_headers = true;
      return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
    }

    var recaptcha = verifyRecaptcha(data.recaptcha_token);

    if (recaptcha.blocking) {
      result = { result: 'error', error: 'recaptcha_missing' };
      return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
    }

    var isSponsor = data.form_source === 'Đăng ký tài trợ';
    var sheetName = isSponsor ? SHEET_TAI_TRO : SHEET_GIAN_HANG;
    var headers = isSponsor ? HEADERS_TAI_TRO : HEADERS_GIAN_HANG;
    var sheet = getOrCreateSheet(sheetName, headers);

    var row = isSponsor
      ? [
          new Date(),
          sanitizeCell(data.contact_name),
          sanitizeCell(data.company),
          sanitizeCell(data.sponsor_package),
          forceText(data.phone),
          sanitizeCell(data.email),
        ]
      : [
          new Date(),
          sanitizeCell(data.company),
          forceText(data.tax_code),
          sanitizeCell(data.address),
          sanitizeCell(data.website),
          sanitizeCell(data.export_markets),
          sanitizeCell(data.contact_name),
          sanitizeCell(data.job_title),
          sanitizeCell(data.email),
          sanitizeCell(data.invoice_email),
          forceText(data.phone),
          sanitizeCell(data.member_status),
          sanitizeCell(data.industry_group),
          sanitizeCell(data.ticket_type),
          sanitizeCell(data.sponsor_interest),
          sanitizeCell(data.exhibit_products),
        ];
    row.push(sanitizeCell(recaptcha.note));

    sheet.appendRow(row);
    if (!recaptcha.verified) result.recaptcha_note = recaptcha.note;
  } catch (err) {
    result = { result: 'error', error: err.toString() };
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function parseRequest(e) {
  // Frontend luôn gửi body là chuỗi JSON (Content-Type: text/plain để né CORS
  // preflight mà Apps Script không hỗ trợ). Đọc e.postData.contents bằng JSON.parse
  // giữ đúng UTF-8 — khác với e.parameter (multipart/form-urlencoded) hay bị vỡ
  // font tiếng Việt do lỗi decode của Apps Script.
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      // Không phải JSON — rơi về form-encoded/multipart như cũ.
    }
  }
  return e.parameter || {};
}

function getOrCreateSheet(name, headers) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

/**
 * Chạy thử hàm này trong trình soạn thảo Apps Script để kiểm tra ghi dữ liệu mẫu — sheet "Đăng ký gian hàng".
 * LƯU Ý: vì không có token reCAPTCHA thật, dòng test sẽ vẫn được ghi vào sheet nhưng cột
 * "Ghi chú bảo mật" sẽ có nội dung nhắc kiểm tra lại — đó là hành vi ĐÚNG (xem verifyRecaptcha()).
 */
function testDoPost() {
  var fakeEvent = {
    postData: {
      type: 'text/plain',
      contents: JSON.stringify({
        form_source: 'Đăng ký gian hàng',
        company: 'Công ty TNHH Test',
        tax_code: '0312345678',
        address: '123 Đường ABC, Q.1, TP.HCM',
        website: 'https://example.com',
        contact_name: 'Nguyễn Văn A',
        job_title: 'Giám đốc',
        email: 'test@example.com',
        invoice_email: 'ketoan@example.com',
        phone: '0900000000',
        member_status: 'Chi Hội Kết Nối',
        industry_group: 'Nông sản, Lương thực, Thực phẩm',
        export_markets: 'Mỹ, EU',
        ticket_type: 'Ticket A',
        sponsor_interest: 'Có',
        exhibit_products: 'Cà phê, hạt điều',
      }),
    },
  };
  var res = doPost(fakeEvent);
  Logger.log(res.getContent());
}

/**
 * Chạy thử hàm này để kiểm tra ghi dữ liệu mẫu — sheet "Đăng ký tài trợ".
 * LƯU Ý: cũng sẽ ghi kèm ghi chú "cần kiểm tra" như testDoPost() ở trên — xem giải thích phía trên.
 */
function testDoPostSponsor() {
  var fakeEvent = {
    postData: {
      type: 'text/plain',
      contents: JSON.stringify({
        form_source: 'Đăng ký tài trợ',
        contact_name: 'Trần Thị B',
        company: 'Công ty CP Test Tài Trợ',
        sponsor_package: 'Gói Vàng (50 triệu)',
        phone: '0911111111',
        email: 'sponsor@example.com',
      }),
    },
  };
  var res = doPost(fakeEvent);
  Logger.log(res.getContent());
}

/** Test riêng phần ghi sheet, bỏ qua bước verify reCAPTCHA — ghi 1 dòng mẫu vào "Đăng ký gian hàng". */
function testAppendRowDirectly() {
  var sheet = getOrCreateSheet(SHEET_GIAN_HANG, HEADERS_GIAN_HANG);
  sheet.appendRow([new Date(), 'Test trực tiếp (không qua reCAPTCHA)', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
  // (17 cột: Thời gian, Tên doanh nghiệp, Mã số thuế, Địa chỉ, Website, Thị trường XK, Họ & Tên,
  //  Chức vụ, Email, Email nhận Phiếu thu/Hợp đồng, SĐT, Chi hội, Lĩnh vực, Loại vé, Quan tâm NTT,
  //  Sản phẩm trưng bày, Ghi chú bảo mật)
  Logger.log('Đã ghi 1 dòng test vào sheet "' + SHEET_GIAN_HANG + '"');
}
