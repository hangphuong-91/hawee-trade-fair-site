# Ghi dữ liệu đăng ký vào Google Sheet

Script này nhận dữ liệu từ form đăng ký trên website và ghi vào Google Sheet:
https://docs.google.com/spreadsheets/d/1njlgjdF50IYZQEaapLYxyCk6zqyHjPJqOhxdHZoZSDc

Tự động tạo 2 sheet, phân loại theo form nào gửi lên (field `form_source` ẩn trong mỗi form):
- **"Đăng ký gian hàng"** — từ form đăng ký chính (section "Đăng ký gian hàng / tài trợ")
- **"Đăng ký tài trợ"** — từ box "Bạn quan tâm trở thành Nhà Tài trợ?" ở cuối section Vé tham gia

## Cài đặt (làm 1 lần)

1. Mở Google Sheet ở link trên.
2. Vào menu **Tiện ích mở rộng (Extensions) → Apps Script**.
3. Xoá hết code mẫu trong file `Code.gs`, dán toàn bộ nội dung file `Code.gs` trong thư mục này vào.
4. Nhấn **Lưu** (biểu tượng đĩa mềm hoặc Ctrl+S).
4b. Vào **⚙️ Project Settings** (biểu tượng bánh răng bên trái) → kéo xuống mục **Script Properties** → **Add script property**, thêm 2 dòng:
   - `RECAPTCHA_SECRET_KEY` = `6LdwTVYtAAAAAKaFHkI03QyZyrdslUBoccNd4lZr` (giá trị hiện tại — nếu đổi site key reCAPTCHA sau này thì lấy secret key mới tại https://www.google.com/recaptcha/admin)
   - `ADMIN_SECRET` = tự đặt 1 chuỗi bất kỳ (chỉ chị và Claude biết) — dùng để xác thực khi cần gọi lệnh bảo trì `fix_headers`.
   Bấm **Save script properties**. (Từ bản v11 trở đi, 2 giá trị này **không còn nằm trong source code** — tránh rò rỉ nếu file `Code.gs` từng bị chia sẻ/commit lên git.)
5. (Tuỳ chọn) Chọn hàm `testDoPost` ở thanh công cụ trên cùng → nhấn **Chạy (Run)** để kiểm tra thử — lần đầu Google sẽ yêu cầu cấp quyền, làm theo hướng dẫn (Advanced → Go to project (unsafe) → Allow). Sau khi chạy xong, mở lại Sheet sẽ thấy 1 dòng dữ liệu mẫu trong sheet "Đăng ký gian hàng" — có thể xoá dòng này đi.
6. Nhấn nút **Triển khai (Deploy) → Triển khai mới (New deployment)**.
7. Ở mục "Select type", chọn **Web app**.
8. Điền:
   - Description: `HAWEE Trade Fair Register`
   - Execute as: **Me (tài khoản của chị)**
   - Who has access: **Anyone**
9. Nhấn **Deploy**. Nếu được hỏi cấp quyền lần nữa, làm theo hướng dẫn để cho phép.
10. Sao chép **Web app URL** hiện ra (dạng `https://script.google.com/macros/s/xxxxxxxx/exec`).
11. Gửi URL đó cho Claude (hoặc tự thêm vào file `.env.local` của site, biến `VITE_APPS_SCRIPT_URL=<URL vừa copy>`), rồi chạy lại `npm run build` + deploy site.

## Lưu ý

- Mỗi lần sửa code trong Apps Script, phải tạo **deployment mới** (hoặc "Manage deployments → Edit → New version") thì thay đổi mới có hiệu lực trên URL đang dùng.
- Không cần thêm biến môi trường nào phía Google — `SPREADSHEET_ID` đã được ghi cứng trong code trỏ đúng vào Sheet của chị.
- Nếu muốn đổi cột hoặc thêm trường dữ liệu, sửa mảng `HEADERS_GIAN_HANG` / `HEADERS_TAI_TRO` và phần `row = ...` trong `Code.gs` cho khớp.
- **Đã sửa 3 lỗi (cần re-deploy code mới để có hiệu lực):**
  1. Form "Đăng ký tài trợ" trước đây chưa hề gửi dữ liệu lên Apps Script (chỉ gửi Formspree) — đã nối thêm.
  2. Sheet bị vỡ font tiếng Việt do Apps Script decode sai UTF-8 khi nhận `multipart/form-data` — frontend giờ gửi JSON qua `text/plain` thay vì FormData thô, `Code.gs` đọc bằng `JSON.parse` nên giữ đúng dấu tiếng Việt.
  3. **[Bảo mật] Google Sheets Formula Injection:** dữ liệu form (vd. "Tên doanh nghiệp") được ghi thẳng vào sheet không qua kiểm tra — nếu ai đó cố tình điền giá trị bắt đầu bằng `=`, `+`, `-`, `@` (vd. `=HYPERLINK("http://evil.com","bấm vào đây")`), Google Sheets sẽ diễn giải thành công thức khi chị mở file, có thể dẫn tới link độc/phishing. Đã thêm hàm `sanitizeCell()` tự động thêm dấu `'` phía trước các giá trị này để Sheets hiển thị nguyên văn thay vì chạy công thức.
  4. **[Bảo mật] Chặn spam/bot gọi thẳng vào URL Apps Script:** trước đây ai biết được URL (URL này không bí mật — nó nằm ngay trong code JS public của site) đều có thể POST thẳng dữ liệu rác vào Sheet, không cần qua form thật. Đã thêm **Google reCAPTCHA v3**: frontend lấy token vô hình lúc submit, `Code.gs` gọi `verifyRecaptcha()` xác minh token với Google trước khi ghi — request không có token hợp lệ (vd. gọi thẳng qua curl/Postman) sẽ bị từ chối với `{"result":"error","error":"recaptcha_missing"}`, không ghi vào sheet.
- **[2026-07-20] Sửa lỗi mất lead thật do reCAPTCHA từ chối nhầm:** kiểm tra bằng cách tự động submit thật vào form live phát hiện các lượt đăng ký thật (có token reCAPTCHA hợp lệ, gửi từ đúng domain production) vẫn bị từ chối với `recaptcha_failed`, khiến Sheet ngừng nhận dữ liệu hoàn toàn dù không có ai request rác. Đã đổi cách xử lý: **chỉ chặn khi hoàn toàn không có token** (đúng trường hợp gọi thẳng URL bằng curl/Postman, không qua form web — vẫn bị chặn với `recaptcha_missing`). Nếu **có** token nhưng verify với Google không đạt (điểm thấp hoặc lỗi mạng gọi Google), Sheet vẫn ghi nhận dòng đó bình thường, chỉ thêm ghi chú ở cột **"Ghi chú bảo mật"** (cuối mỗi sheet) để xem lại thủ công — vì với form đăng ký kinh doanh, mất 1 lead thật đắt hơn nhiều so với thỉnh thoảng có 1 dòng cần xoá tay. **Nên kiểm tra thêm:** vào https://www.google.com/recaptcha/admin, xác nhận domain `giaothuongquocte.hawee.vn` đã có trong danh sách domain của site key đang dùng — nếu thiếu, đó rất có thể là lý do verify hay thất bại.
- **Sau khi dán code mới vào Apps Script, nhớ tạo deployment mới** (bước 6-10 ở trên, hoặc "Manage deployments → Edit → New version") — nếu chỉ Lưu (Ctrl+S) mà không deploy lại, URL cũ vẫn chạy code cũ và các lỗi trên sẽ không hết.
- **[2026-07-24] Đồng bộ header + sửa mất số 0 đầu SĐT/MST (cần re-deploy):**
  1. Thêm 2 field mới (`job_title` → "Chức vụ", `invoice_email` → "Email nhận Phiếu thu / Hợp đồng") và dời "Thị trường xuất khẩu" lên đúng vị trí trong form — nhưng nếu sheet "Đăng ký gian hàng" **đã có sẵn từ trước**, dòng tiêu đề (header) cũ sẽ không tự cập nhật (`getOrCreateSheet` chỉ ghi header lúc tạo sheet mới), khiến dữ liệu ghi vào bị lệch cột. Đã thêm hàm bảo trì `fixHeaders()` — gọi 1 lần bằng cách POST `{"action":"fix_headers"}` tới Web App URL (Claude đã chạy hộ) sẽ ghi đè lại đúng dòng header, không đụng dữ liệu các dòng bên dưới, an toàn gọi lại nhiều lần.
  2. **Sửa lỗi mất số 0 ở đầu Mã số thuế / Số điện thoại:** Google Sheets tự đoán các chuỗi toàn số là kiểu Number nên cắt mất số 0 đầu (vd. `0900000001` → `900000001`). Đã thêm hàm `forceText()` ép 2 cột này luôn ở định dạng văn bản thuần.
- **[2026-07-24] [Bảo mật] Chuyển secret ra khỏi source code (cần re-deploy + set Script Properties):**
  1. `RECAPTCHA_SECRET_KEY` trước đây hardcode thẳng trong `Code.gs` — file này nằm trong git repo của site, rò rỉ tiềm ẩn nếu repo từng có remote công khai. Đã chuyển sang đọc từ **Script Properties** (xem bước 4b ở mục Cài đặt) — bắt buộc set property này thì reCAPTCHA mới hoạt động, nếu thiếu sẽ báo lỗi rõ trong cột "Ghi chú bảo mật" thay vì âm thầm hỏng.
  2. Action bảo trì `fix_headers` trước đây **không xác thực** — vì URL Web App là công khai (nằm trong bundle JS site), bất kỳ ai đoán được tên action đều gọi được (rủi ro thấp vì chỉ ghi đè header, không xoá/lộ dữ liệu, nhưng vẫn là lỗ hổng phân quyền). Đã thêm yêu cầu `admin_key` khớp `ADMIN_SECRET` trong Script Properties — thiếu hoặc sai sẽ bị từ chối với `{"result":"error","error":"unauthorized"}`.
- **[2026-07-24] reCAPTCHA verify thất bại do thiếu quyền `UrlFetchApp`:** phát hiện lỗi `Bạn không có quyền thực hiện lệnh gọi UrlFetchApp.fetch. Các quyền cần có: .../auth/script.external_request` trong cột "Ghi chú bảo mật" ở mọi dòng — nghĩa là Apps Script deployment hiện tại **chưa từng được cấp quyền gọi mạng ra ngoài**, nên reCAPTCHA không bao giờ xác minh được thật (vẫn ghi lead bình thường nhờ cơ chế không chặn, nhưng mất luôn tác dụng chống spam). Cách sửa: mở lại Apps Script editor → chọn hàm `testDoPost` ở thanh công cụ trên cùng → nhấn **Chạy (Run)** → khi hộp thoại xin quyền hiện ra, làm đủ hết các bước (kể cả "Advanced → Go to project (unsafe) → Allow") thay vì bấm tắt — chạy xong 1 lần là đủ, quyền sẽ được giữ cho các lần chạy Web App sau.
