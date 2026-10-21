/**
 * HAWEE International Trade Fair — ghi dữ liệu form đăng ký vào Google Sheet.
 *
 * Cách cài đặt: xem README.md trong cùng thư mục này.
 */

var SPREADSHEET_ID = '1njlgjdF50IYZQEaapLYxyCk6zqyHjPJqOhxdHZoZSDc';

// Đánh dấu phiên bản — dùng để xác nhận deployment đang chạy đúng code mới nhất
// (kiểm tra bằng cách xem field "version" trong response JSON trả về).
var CODE_VERSION = 'v15-2026-10-21-luckydraw-log-no-prize';

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
var SHEET_SPAM_LOG = 'Đăng ký bị chặn (spam)';

// Tên field honeypot ẩn — input này KHÔNG hiển thị với người dùng thật (CSS ẩn ngoài màn hình,
// không phải display:none để qua mặt bot đơn giản chỉ check computed style), chỉ bot điền form
// mù (không quan tâm CSS) mới điền vào. Có giá trị = chặn ngay, không cần gọi reCAPTCHA.
var HONEYPOT_FIELD = 'company_website_2';

var HEADERS_SPAM_LOG = ['Thời gian', 'Form', 'Lý do chặn', 'Dữ liệu (JSON)'];

// ===== Quay số trúng thưởng (/luckydraw) =====
var SHEET_LD_PLAYERS = 'Quay số - Người chơi';
var SHEET_LD_PRIZES = 'Quay số - Quà';
var LD_FORM_SOURCE = 'luckydraw';

var HEADERS_LD_PLAYERS = [
  'Thời gian', 'Họ & Tên', 'Chức vụ', 'Công ty', 'Số điện thoại', 'Email',
  'Giải', 'Loại giải', 'Nơi nhận', 'Nguồn', 'Đã nhận', 'Ghi chú bảo mật', 'Mã lượt chơi',
];

// Mỗi lượt quay có 1 mã riêng (hiện trên màn kết quả) để gian hàng chụp lại, đối chiếu từng người thắng.
var LD_CODE_COL = 13;
var LD_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // bỏ I, O, 0, 1 cho dễ đọc
var LD_NO_PRIZE_TYPE = 'none'; // cột "Loại giải" của khách quay lúc đã hết quà

// Tab Quà là bảng cấu hình sống — ban tổ chức sửa trực tiếp trong lúc sự kiện (thêm/tắt giải,
// đổi tồn kho, đổi trọng số). Loại: booth | forum50 | forumfree | thanks.
var HEADERS_LD_PRIZES = ['Tên quà', 'Loại', 'Nơi nhận / Gian hàng', 'Tồn kho', 'Trọng số', 'Bật (TRUE/FALSE)'];

// Dữ liệu mẫu — chỉ chèn khi tab Quà vừa được tạo lần đầu. Thay bằng danh sách thật trong Sheet.
var LD_SAMPLE_PRIZES = [
  ['Voucher giảm 50% vé HAWEE Leaders Forum 2026', 'forum50', 'Mã ưu đãi gửi qua email', 100, 5, true],
  ['Vé tham dự HAWEE Leaders Forum 2026 (miễn phí)', 'forumfree', 'Mã vé gửi qua email', 5, 1, true],
  ['Quà tặng từ gian hàng (cập nhật)', 'booth', 'HAWEE Pavilion', 500, 30, true],
];

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
// doPost() quyết định. Phân biệt rõ 2 loại "không đạt":
//   1. Google ĐÃ TRẢ LỜI RÕ RÀNG đây là bot/điểm thấp (success:false hoặc score < ngưỡng) →
//      CHẶN CỨNG (blocking:true). Đây chính là mục đích của reCAPTCHA v3 — nếu không chặn ở
//      bước này thì cả hệ thống coi như không có tác dụng chống spam nào (đã xảy ra thực tế:
//      3 lượt đăng ký bot 28-30/8/2026 lọt qua vì bước xác minh bị lỗi quyền UrlFetchApp).
//   2. Apps Script KHÔNG GỌI ĐƯỢC Google (lỗi mạng/config, không phải Google từ chối) → KHÔNG
//      chặn (blocking:false), vẫn ghi vào sheet + đánh dấu "cần xem lại", vì đây là lỗi hạ tầng
//      tạm thời phía mình, không phải tín hiệu bot — không nên đánh đổi mất lead thật vì lỗi này.
// THIẾU token hẳn (gọi thẳng URL bằng curl/Postman, không qua form thật) cũng chặn cứng — đúng
// mục đích chống spam ban đầu.
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
      blocking: true,
      note: 'reCAPTCHA từ chối (score=' + score + (codes ? ', ' + codes : '') + ')',
    };
  } catch (err) {
    return { verified: false, blocking: false, note: 'Không gọi được Google để xác minh reCAPTCHA (' + err.toString() + ') — vui lòng kiểm tra thủ công' };
  }
}

// Ghi lại các lượt bị chặn (honeypot hoặc reCAPTCHA từ chối rõ ràng) vào sheet riêng thay vì
// bỏ hẳn — để vẫn xem lại thủ công được nếu nghi ngờ có lead thật bị chặn nhầm, mà không làm
// bẩn 2 sheet chính (đặc biệt tránh ghi domain/link rác từ bot vào sheet chính, vốn là nguyên
// nhân Google Drive/Gmail có thể gắn cờ "file đáng ngờ" cho cả file Sheet).
function logRejected(data, reason) {
  try {
    var sheet = getOrCreateSheet(SHEET_SPAM_LOG, HEADERS_SPAM_LOG);
    var safeData = {};
    for (var key in data) {
      if (key === 'recaptcha_token') continue;
      safeData[key] = data[key];
    }
    sheet.appendRow([new Date(), sanitizeCell(data.form_source || ''), sanitizeCell(reason), sanitizeCell(JSON.stringify(safeData))]);
  } catch (err) {
    // Không để lỗi ghi log làm hỏng luồng chính — bỏ qua, response error vẫn trả về bình thường.
  }
}

// Tiện ích bảo trì: gọi 1 lần (payload { action: 'fix_headers', admin_key: '...' }) để đồng bộ lại
// dòng tiêu đề của 2 sheet theo đúng HEADERS_GIAN_HANG / HEADERS_TAI_TRO hiện tại. Cần thiết vì
// getOrCreateSheet() chỉ ghi header lúc TẠO MỚI sheet — khi đổi cấu trúc cột mà sheet đã có sẵn dữ
// liệu cũ, header cũ sẽ không tự cập nhật. Chỉ ghi đè dòng 1, không đụng dữ liệu bên dưới — an toàn
// để gọi lại nhiều lần (idempotent). Yêu cầu admin_key khớp ADMIN_SECRET vì URL endpoint này là công
// khai (nằm trong bundle JS của site) — nếu không xác thực, bất kỳ ai biết URL + tên action đều có
// thể gọi được.
function fixHeaders() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  [
    [SHEET_GIAN_HANG, HEADERS_GIAN_HANG],
    [SHEET_TAI_TRO, HEADERS_TAI_TRO],
    [SHEET_SPAM_LOG, HEADERS_SPAM_LOG],
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
      if (!ADMIN_SECRET || data.admin_key !== ADMIN_SECRET) {
        result = { result: 'error', error: 'unauthorized' };
        return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
      }
      fixHeaders();
      result.fixed_headers = true;
      return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
    }

    if (data[HONEYPOT_FIELD]) {
      logRejected(data, 'honeypot');
      result = { result: 'error', error: 'rejected' };
      return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
    }

    var recaptcha = verifyRecaptcha(data.recaptcha_token);

    if (recaptcha.blocking) {
      logRejected(data, recaptcha.note);
      result = { result: 'error', error: 'recaptcha_failed' };
      return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
    }

    if (data.form_source === LD_FORM_SOURCE) {
      return ContentService.createTextOutput(JSON.stringify(handleLuckyDraw(data, recaptcha)))
        .setMimeType(ContentService.MimeType.JSON);
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

// Trả danh sách nhãn giải đang bật để vẽ vòng quay (không lộ tồn kho/trọng số).
// Gọi: GET <web app url>?action=luckydraw_prizes
function doGet(e) {
  var out = { result: 'success', version: CODE_VERSION };
  try {
    if (e && e.parameter && e.parameter.action === 'luckydraw_prizes') {
      out.prizes = ldWheelPrizes();
    }
  } catch (err) {
    out = { result: 'error', error: err.toString() };
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

function ldPrizesSheet() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var existed = !!ss.getSheetByName(SHEET_LD_PRIZES);
  var sheet = getOrCreateSheet(SHEET_LD_PRIZES, HEADERS_LD_PRIZES);
  if (!existed) {
    sheet.getRange(2, 1, LD_SAMPLE_PRIZES.length, HEADERS_LD_PRIZES.length).setValues(LD_SAMPLE_PRIZES);
  }
  return sheet;
}

// Đọc tab Quà → mảng object, kèm số dòng để trừ tồn kho. Dòng có Bật = FALSE hoặc thiếu tên bị bỏ qua.
function ldReadPrizes() {
  var sheet = ldPrizesSheet();
  var last = sheet.getLastRow();
  if (last < 2) return [];
  var values = sheet.getRange(2, 1, last - 1, HEADERS_LD_PRIZES.length).getValues();
  var list = [];
  for (var i = 0; i < values.length; i++) {
    var v = values[i];
    if (!v[0]) continue;
    var on = v[5] === true || String(v[5]).toUpperCase() === 'TRUE';
    list.push({
      row: i + 2,
      name: String(v[0]),
      type: String(v[1] || 'booth'),
      place: String(v[2] || ''),
      stock: Number(v[3]) || 0,
      weight: Number(v[4]) || 0,
      on: on,
    });
  }
  return list;
}

// Nhãn hiển thị trên vòng quay: chỉ giải đang bật & còn tồn kho. Cache 60 giây.
function ldWheelPrizes() {
  var cache = CacheService.getScriptCache();
  var hit = cache.get('ld_wheel');
  if (hit) return JSON.parse(hit);
  var labels = ldReadPrizes()
    .filter(function (p) { return p.on && p.stock > 0 && p.weight > 0; })
    .map(function (p) { return { name: p.name, type: p.type }; });
  cache.put('ld_wheel', JSON.stringify(labels), 60);
  return labels;
}

function ldWeightedPick(pool) {
  var total = pool.reduce(function (sum, p) { return sum + p.weight; }, 0);
  var r = Math.random() * total;
  for (var i = 0; i < pool.length; i++) {
    r -= pool[i].weight;
    if (r < 0) return pool[i];
  }
  return pool[pool.length - 1];
}

// Sinh mã dạng HW-K7M4Q, kiểm tra không trùng mã đã có (existing: mảng mã đang dùng).
function ldNewCode(existing) {
  for (var tries = 0; tries < 50; tries++) {
    var c = 'HW-';
    for (var i = 0; i < 5; i++) c += LD_CODE_ALPHABET.charAt(Math.floor(Math.random() * LD_CODE_ALPHABET.length));
    if (existing.indexOf(c) === -1) return c;
  }
  return 'HW-' + Date.now().toString(36).toUpperCase();
}

function ldValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Xử lý 1 lượt quay. Mọi lượt đều trúng 1 giải. Mỗi email chỉ quay 1 lần (quay lại → trả kết quả cũ);
// email khác → quay mới (không giới hạn theo SĐT, theo yêu cầu ban tổ chức).
function handleLuckyDraw(data, recaptcha) {
  var email = String(data.email || '').trim().toLowerCase();
  var name = String(data.contact_name || '').trim();
  var phone = String(data.phone || '').trim();
  if (!name || !phone || !ldValidEmail(email)) {
    return { result: 'error', error: 'invalid_input' };
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var players = getOrCreateSheet(SHEET_LD_PLAYERS, HEADERS_LD_PLAYERS);
    // Sheet tạo từ bản cũ chưa có cột Mã lượt chơi → bổ sung tiêu đề.
    if (!players.getRange(1, LD_CODE_COL).getValue()) {
      players.getRange(1, LD_CODE_COL).setValue('Mã lượt chơi').setFontWeight('bold');
    }
    var last = players.getLastRow();
    var usedCodes = [];
    if (last >= 2) {
      var rows = players.getRange(2, 1, last - 1, LD_CODE_COL).getValues();
      for (var i = 0; i < rows.length; i++) {
        usedCodes.push(String(rows[i][LD_CODE_COL - 1]));
        // Dòng "Hết quà" không tính là đã quay → nếu BTC bổ sung quà, email này vẫn được quay.
        if (String(rows[i][7]) === LD_NO_PRIZE_TYPE) continue;
        if (String(rows[i][5]).trim().toLowerCase() === email) {
          return {
            result: 'success', version: CODE_VERSION, already_played: true,
            code: String(rows[i][LD_CODE_COL - 1]),
            prize: { name: rows[i][6], type: rows[i][7], place: rows[i][8] },
          };
        }
      }
    }

    var prizes = ldReadPrizes();
    var pool = prizes.filter(function (p) { return p.on && p.stock > 0 && p.weight > 0; });
    var won;
    if (pool.length) {
      won = ldWeightedPick(pool);
      ldPrizesSheet().getRange(won.row, 4).setValue(won.stock - 1);
      CacheService.getScriptCache().remove('ld_wheel');
    } else {
      // Hết quà: vẫn ghi nhận thông tin khách, không để sót data.
      won = { name: 'Hết quà', type: LD_NO_PRIZE_TYPE, place: '' };
    }

    var code = pool.length ? ldNewCode(usedCodes) : '';
    var row = [
      new Date(),
      sanitizeCell(name),
      sanitizeCell(data.job_title),
      sanitizeCell(data.company),
      forceText(phone),
      sanitizeCell(email),
      sanitizeCell(won.name),
      sanitizeCell(won.type),
      sanitizeCell(won.place),
      sanitizeCell(data.src),
      false,
      sanitizeCell(recaptcha.note),
      code,
    ];
    players.appendRow(row);
    players.getRange(players.getLastRow(), 11).insertCheckboxes();

    if (!pool.length) return { result: 'error', error: 'no_prize_left', version: CODE_VERSION };
    return {
      result: 'success', version: CODE_VERSION, already_played: false, code: code,
      prize: { name: won.name, type: won.type, place: won.place },
    };
  } finally {
    lock.releaseLock();
  }
}

/** Chạy thử trong editor: 1 lượt quay mẫu (tạo sẵn 2 tab Quay số). */
function testLuckyDraw() {
  var res = handleLuckyDraw({
    form_source: LD_FORM_SOURCE, contact_name: 'Test Quay Số', job_title: 'Giám đốc',
    company: 'Công ty Test', phone: '0900000001', email: 'test+' + Date.now() + '@example.com', src: 'test',
  }, { verified: false, note: 'Dòng test từ testLuckyDraw()' });
  Logger.log(JSON.stringify(res));
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
