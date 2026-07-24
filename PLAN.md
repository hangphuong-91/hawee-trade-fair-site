# Landing Page — HAWEE International Trade Fair

## Context

HAWEE cần 1 landing page cho **HAWEE International Trade Fair** — hoạt động nằm trong khuôn khổ "Hội chợ hàng Việt Nam tiêu biểu xuất khẩu 2026" do Sở Công Thương TP.HCM chủ trì, tổ chức bởi Sở Công Thương x HAWEE x APEX, diễn ra 22–24/10/2026 tại WTC Expo Bình Dương. Mục tiêu trang: giới thiệu sự kiện, thúc đẩy đăng ký gian hàng/tài trợ, và (theo yêu cầu bổ sung giữa lượt) trưng bày logo + giới thiệu ngắn từng doanh nghiệp tham gia hội chợ.

Tài liệu nguồn đã đọc: `hawee/trade-fair/tài-liệu/` (PDF "Bài tổng") + `hawee/hawee-giao-thuong/trade-fair/19052026 - HAWEE Trade Fair - KEY POINTS.pdf` (đã trích xuất đầy đủ nội dung: quy mô, mục tiêu, khung hoạt động 4 ngày, gói gian hàng, gói tài trợ). Ảnh hero có sẵn tại `trade-fair/media/trade-hero.png`.

Dự án là **site đứng riêng** (không phải thêm route vào `hawee-website`), theo đúng pattern `hawee-giao-thuong-site`: 1 project Vite/React nhỏ, tự deploy Vercel riêng, không đụng vào codebase `hawee-website` đang chạy production.

---

## 1. Frontend — Cấu trúc trang & Stack

**Stack** (theo skill `thiet-ke-website`, tái dùng đúng config đã verify ở `hawee-website` để đồng bộ brand — không dùng Tailwind v4 của `daily-intel`):
- React 18 + Vite, Tailwind CSS **v3** (`tailwind.config.js`, copy brand colors từ `hawee-website/tailwind.config.js`: primary `#C9187F`, rose scale, gradient-hawee)
- Framer Motion cho animation, Lucide React cho icon
- Font MonaSans self-hosted (copy từ `hawee-giao-thuong/fonts/`)
- Không React Router — landing page 1 trang dài (scroll + anchor nav), trừ khi cần thêm trang riêng cho sơ đồ gian hàng chi tiết
- Deploy: Vercel, project riêng, connect GitHub repo riêng cho `trade-fair`

**Các block trên trang (thứ tự từ trên xuống):**

1. **Header** — sticky nav, logo HAWEE, anchor links (Tổng quan / Doanh nghiệp tham gia / Lịch trình / Gói tham gia / Đăng ký), CTA nổi bật "Đăng ký gian hàng"
2. **Hero** — full-bleed `trade-hero.png` + overlay gradient, tiêu đề "HAWEE INTERNATIONAL TRADE FAIR", dòng phụ "Nền tảng giao thương – kết nối – tạo ra hợp tác thực tế", badge ngày 22–24/10/2026 + địa điểm WTC Expo Bình Dương, hàng logo "organized by" (Sở Công Thương x HAWEE x APEX). Tái dùng pattern hero inline của `Home.jsx` (absolute bg image + `bg-gradient-to-r from-black/65...` overlay), không cần tách component riêng.
3. **Số liệu quy mô** — dải số animated-counter: 13.381 m² | 750 gian hàng | 1.500+ đại biểu | 180+ doanh nghiệp | 10+ thị trường trọng điểm. Tái dùng `AnimatedCounter` pattern từ skill (Phase 4.2).
4. **Mục tiêu cốt lõi** — 3–4 card: Thúc đẩy xuất khẩu & mở rộng thị trường / Nâng cao năng lực cạnh tranh / Định vị hàng Việt Xanh & Bền vững / Mở mạng lưới quốc tế + B2B matching.
5. **[MỚI — theo yêu cầu] Doanh nghiệp tham gia** — KHÔNG dùng marquee (marquee của `hawee-website` chỉ đủ chỗ cho logo, không có mô tả). Dùng **card grid** responsive (2 cột mobile → 4 cột desktop): mỗi card = logo doanh nghiệp + tên + 1–2 dòng giới thiệu ngắn, có thể click mở modal xem mô tả đầy đủ hơn (tái dùng pattern `EventDetailModal` của skill Phase 4.3 cho modal). Data-driven từ file tĩnh `src/data/exhibitors.js` (mảng object `{name, logo, description, industry}` — cùng pattern `sponsors` array trong `Home.jsx`), để sau này thêm doanh nghiệp chỉ cần sửa file data, không đụng component.
   - **Cần input từ chị:** danh sách logo + tên + mô tả từng doanh nghiệp — hiện `trade-fair/media/` chỉ có `trade-hero.png`, chưa có logo doanh nghiệp nào. Sẽ dựng block với 3–4 placeholder trước, chị bổ sung data thật sau (không chặn tiến độ code).
6. **Khung hoạt động** — lịch 4 ngày (21–24/10/2026), dùng tab theo ngày hoặc accordion, nội dung lấy từ PDF trang 11–13 (Welcome Night, Khai mạc, các hội nghị/hội thảo, kết nối B2B, trình diễn).
7. **Gói gian hàng** — 3 card so sánh Standard (20tr) / Prime (35tr) / Sponsor-Partner (theo gói tài trợ), bảng quyền lợi chi tiết (diện tích, cơ sở vật chất, B2B matching, xuất hiện trong recap) từ PDF trang 15–16.
8. **Gói tài trợ** — 2 nhóm: hiện kim (Title 200tr / Strategic 100tr / Companion 80tr) và hiện vật (gift bag, media/PR, production) từ PDF trang 17–18.
9. **Sơ đồ gian hàng** — nhúng ảnh sơ đồ (PDF trang 10) + thông tin di chuyển (sân bay, chợ Bến Thành).
10. **Đăng ký tham gia** — form Formspree, field: Tên doanh nghiệp, Người liên hệ, SĐT, Email, Ngành hàng, Gói quan tâm (Standard/Prime/Sponsor), Ghi chú + checkbox đồng ý được liên hệ. Tái dùng nguyên pattern `LienHe.jsx` của `hawee-website` (`fetch` POST tới `https://formspree.io/f/${VITE_FORMSPREE_ID}`, `FormData`, state `sent`/`loading`).
11. **Footer** — logo 3 bên tổ chức, thông tin liên hệ, mạng xã hội.

---

## 2. Backend Checklist — Đề xuất

| Câu hỏi | Trả lời cho MVP landing page này | Lý do |
|---|---|---|
| **API style** | Không tự viết backend. Dùng **Formspree** (JSON API có sẵn) cho form đăng ký — đúng "JSON APIs", zero server để maintain. | Landing page không cần logic phức tạp; REST/GraphQL/gRPC tự viết là over-engineering ở quy mô này. |
| **Database** | **Không cần DB.** Nội dung doanh nghiệp/gói/lịch trình là static data trong `src/data/*.js`, sửa qua code + Git. Lead đăng ký nằm trong Formspree dashboard + email. | Số lượng doanh nghiệp/lead ở quy mô landing page 1 sự kiện không cần DB động. Nếu sau này cần dashboard quản lý lead/doanh nghiệp tự cập nhật không qua code → nâng cấp lên **Supabase (Postgres)**, đúng stack đã dùng ở `hawee-website`, không đưa Mongo/MySQL/SQLite mới vào hệ sinh thái. |
| **Object storage** | **Không cần cloud storage.** Logo doanh nghiệp là ảnh tĩnh, commit vào `public/exhibitors/`, Vercel CDN serve trực tiếp — đúng pattern `public/sponsors/` của `hawee-website`. | Chỉ vài chục logo, không có upload động từ người dùng. Nếu sau này doanh nghiệp tự upload logo qua form → khi đó mới cần **Cloudflare R2** (free egress, ưu tiên theo nguyên tắc "100% free tools" của skill) thay vì S3/GCS. |

---

## 3. Security Checklist — Đề xuất

| Hạng mục | MVP landing page này |
|---|---|
| **Authentication** | Không cần — trang public, không có vùng đăng nhập. |
| **Authorization** | N/A ở MVP vì không có user account. Nếu sau này thêm trang quản trị nội bộ xem lead → tái dùng `AuthContext` + Supabase email/password (đã có sẵn pattern ở `hawee-website`), **không** tự chế JWT tay, không cần OAuth/magic link cho 1 admin nội bộ duy nhất. |
| **Environment variables** | Chỉ 1 biến: `VITE_FORMSPREE_ID` (an toàn để lộ — bản chất là endpoint form public, giống `hawee-website`). Commit `.env.example` (giá trị rỗng), giá trị thật set trong Vercel dashboard, `.env.local` vào `.gitignore`. Nếu sau này thêm secret thật (vd. Supabase service key) → **không** thêm tiền tố `VITE_`, chỉ đọc server-side trong `api/*.js`, đúng pattern `NOTION_API_KEY` không có `VITE_` ở `hawee-website/api/notion.js`. |
| **CORS** | Không áp dụng ở MVP vì không có serverless function nào. Nếu sau này thêm `api/*.js` (vd. proxy Supabase) → khoá `Access-Control-Allow-Origin` theo biến `ALLOWED_ORIGIN`, không dùng `*`, đúng pattern `api/notion.js`. |

**Trả lời câu hỏi "đã tránh lộ biến môi trường và xác thực quyền hạn người dùng chưa?":** Ở MVP này rủi ro gần như bằng 0 theo thiết kế — không có secret nhạy cảm nào chạy phía client (chỉ 1 ID form public), và không có user account nên "xác thực quyền hạn" chưa cần đặt ra. Việc này chỉ trở thành yêu cầu thật khi thêm trang quản trị — lúc đó áp dụng đúng bảng trên (Supabase Auth + RLS + secret server-side only).

---

## 4. Trước khi deploy — các bước còn thiếu (ngoài checklist "Pre-Launch Verification" sẵn có trong skill)

- **SEO/Social share:** Open Graph tags (title, description, ảnh `trade-hero.png`) — quan trọng vì trang sẽ share qua Zalo/Facebook để mời đăng ký, thiếu OG tag thì preview link sẽ trống/xấu.
- **Favicon** riêng cho trade fair (khác favicon `hawee-website`).
- **robots.txt / sitemap.xml** — cơ bản cho SEO, hawee-giao-thuong-site cũng chưa có, nên bổ sung ngay từ đầu ở site mới.
- **Chống spam form:** bật reCAPTCHA có sẵn trong Formspree (miễn phí), tránh bot spam đăng ký.
- **404 page** — vì đây là 1 trang scroll dài, ít route, nhưng vẫn nên có fallback tối thiểu.
- **Domain/DNS:** nếu dùng subdomain riêng (vd. `tradefair.hawee.vn`) cần add CNAME trỏ Vercel trước lúc launch chính thức — khác với deploy lên `*.vercel.app` mặc định.
- **Xác nhận email nhận lead:** test thật 1 lượt submit form, kiểm tra email/dashboard Formspree nhận đúng, đúng người phụ trách đăng ký gian hàng theo dõi được.
- **Bản quyền logo doanh nghiệp:** xác nhận đã có sự đồng ý của từng doanh nghiệp cho việc hiển thị logo công khai trước khi lên trang (đặc biệt nếu có sponsor cần thứ tự ưu tiên hiển thị theo hạng tài trợ — Title/Strategic/Companion nên hiển thị khác cấp bậc nhau).
- **Vercel Analytics** (đã dùng ở `hawee-website`, `@vercel/analytics`) để theo dõi tỷ lệ chuyển đổi từ xem trang → submit form đăng ký.

**Trả lời câu hỏi "deploy xong còn chỉnh frontend được không?":** Có, hoàn toàn bình thường. Vercel nối GitHub theo kiểu continuous deploy (giống `hawee-website` và `hawee-giao-thuong-site` đang chạy): mỗi lần `git push` lên `main` là tự build & deploy lại, không giới hạn số lần, không downtime, và Vercel giữ lại lịch sử các bản deploy cũ để rollback tức thì nếu bản mới lỗi. Deploy không phải hành động một chiều — sửa nội dung, thêm logo doanh nghiệp, đổi copy... sau khi launch là việc bình thường, làm bao nhiêu lần cũng được.

---

## 5. Cấu trúc thư mục sẽ tạo

```
Hang Claude/.claude/project/hawee/trade-fair/
├── tài-liệu/              # (đã có — giữ nguyên)
├── media/
│   ├── trade-hero.png     # (đã có)
│   └── exhibitors/        # MỚI — logo doanh nghiệp (placeholder trước)
├── site/                  # MỚI — project code Vite/React
│   ├── public/
│   │   ├── fonts/          # copy MonaSans
│   │   └── exhibitors/     # logo public-served
│   ├── src/
│   │   ├── components/     # HeroSection, ExhibitorCard, ExhibitorModal, RegisterForm, ScheduleTabs, PackageCard...
│   │   ├── data/
│   │   │   ├── exhibitors.js
│   │   │   ├── schedule.js
│   │   │   └── packages.js
│   │   ├── App.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json
```

---

## Verification

- `npm run dev` trong `site/`, kiểm tra thủ công tại 375px/768px/1280px như checklist Phase 6.3 của skill.
- Submit thử form đăng ký → xác nhận nhận được trong Formspree dashboard/email.
- Kiểm tra không có API key/secret nào lộ trong bundle build (`npm run build` rồi grep trong `dist/`).
- Test share link trên Zalo/Facebook debugger để xác nhận OG tag hiển thị đúng ảnh/tiêu đề.
