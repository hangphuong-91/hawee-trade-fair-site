# CLAUDE.md

Hướng dẫn cho Claude Code khi làm việc với repo này.

## Repo này là gì

`trade-fair/site` là **landing page** cho **HAWEE International Trade Fair** — hoạt động trong khuôn khổ "Hội chợ hàng Việt Nam tiêu biểu xuất khẩu 2026" do Sở Công Thương TP.HCM chủ trì, tổ chức bởi Sở Công Thương x HAWEE x APEX. Diễn ra 22–24/10/2026 tại WTC Expo, Bình Dương/TP.HCM.

Mục tiêu trang: giới thiệu sự kiện, thúc đẩy doanh nghiệp đăng ký gian hàng/tài trợ, và trưng bày logo + giới thiệu ngắn từng doanh nghiệp đã tham gia hội chợ.

Đây là **site đứng riêng**, không phải route trong `hawee-website`. Deploy Vercel project riêng, không đụng vào codebase `hawee-website` đang chạy production.

## Nguồn nội dung

- `../tài-liệu/HAWEE Trade Fair - Bài tổng.pptx.pptx` — bài tổng đầy đủ
- `../../hawee-giao-thuong/trade-fair/19052026 - HAWEE Trade Fair - KEY POINTS.pdf` — đã trích xuất: quy mô, mục tiêu cốt lõi, khung hoạt động 4 ngày, gói gian hàng (Standard/Prime/Sponsor), gói tài trợ (hiện kim/hiện vật), sơ đồ gian hàng
- `../tài-liệu/2026_6_Hawee Global Connect 2026 - B2B Matching.pdf` — chi tiết chương trình B2B matching, nguồn ảnh thật cho Deal Bell + HAWEE Global Passport
- `../tài-liệu/HAWEE Trade Fair - Bài tổng.pptx.pptx` — đã trích xuất toàn bộ `ppt/media/*` (246 file) để tìm asset, không có graphic "ngôi sao mai" rời — concept sao lấy từ `HTF_Poster.png` (xem dưới)
- `c:\Users\HP\Downloads\HTF_Poster.png` — poster tham khảo bên ngoài repo, nguồn của: câu quote "ngôi sao mai", graphic ngôi sao pha lê
- `c:\Users\HP\Downloads\HAWEE Trade Fair 2026 Presentation.pptx.pdf` — bản deck **mới nhất** (24 trang), nguồn cập nhật quy mô (30.000+ khách, 700+ DN), điểm mới chiến lược, hoạt động điểm nhấn 3 giai đoạn, giá vé Ticket A/B, tài trợ Kim Cương/Vàng/Bạc. **Bỏ qua có chủ đích**: trang 14-16 (ban điều hành/phối hợp nội bộ), trang 23 (lộ trình triển khai) và trang 24 (P&L) — không đưa lên landing page public theo yêu cầu.
- `c:\Users\HP\Downloads\HAWEE_WEB BANNER (4).png` — sơ đồ khu gian hàng HAWEE (48 gian: Gian A 14 gian + Gian B 34 gian) dùng cho section Sơ đồ gian hàng, cập nhật theo bản mới nhất khi file này thay đổi
- `../media/trade-hero.png` — ảnh hero chính
- `../media/tham-khao/*.jpg` — ảnh thật từ HCM City Export 2024/2025 (cùng hệ sự kiện, do Sở Công Thương TP.HCM tổ chức), dùng làm ảnh minh hoạ ngành hàng
- `https://hochiminhexport.com/` — tham khảo thiết kế section "DOANH NGHIỆP VÀ NGÀNH HÀNG" (photo-card + icon badge nổi); 3/6 ảnh ngành hàng tải trực tiếp từ site này (da-giay.jpg, bg-nong-san1-1.jpg, bg-do-go1.jpg — đã re-host vào `public/industries/`, không hotlink)

## Tech Stack

| Layer | Tool | Ghi chú |
|-------|------|---------|
| Frontend | React 18 + Vite | |
| Styling | Tailwind CSS v3 | copy brand colors từ `hawee-website/tailwind.config.js` (primary `#C9187F`) |
| Animation | Framer Motion | pattern `FadeUp`, `AnimatedCounter` theo skill `thiet-ke-website` |
| Icons | Lucide React | |
| Font | MonaSans (self-hosted) | copy từ `hawee-giao-thuong/fonts/` |
| Form đăng ký | Formspree | zero backend, JSON API có sẵn |
| Hosting | Vercel | project riêng, auto-deploy khi push `main` |

**Không dùng:** React Router (1 trang scroll dài + anchor nav), database, object storage cloud, authentication — xem lý do đầy đủ trong `PLAN.md` (mục Backend/Security Checklist).

## Cấu trúc file

```
site/
├── api/
│   └── notion.js         # Vercel serverless function — proxy Notion API (đọc Exhibitors DB), key server-side only
├── public/
│   ├── fonts/            # MonaSans TTF
│   ├── industries/       # 6 ảnh ngành hàng thật (photo-card IndustryFocus), không trùng ảnh nhau
│   ├── exhibitors/       # (legacy, không còn dùng — logo doanh nghiệp giờ upload trực tiếp trong Notion)
│   └── concept/          # ảnh thật cắt từ HTF_Poster.png + B2B Matching PDF (đã nén .jpg, xem CLAUDE.md mục "Nguồn nội dung")
├── src/
│   ├── components/       # Hero, StarConcept, EventIntro, Countdown, DealBellPassport, IndustryFocus, Exhibitors, RegisterForm, Packages...
│   ├── services/
│   │   └── notion.js     # client wrapper gọi /api/notion, cache 5 phút, map page → {name, logo, industry, description, featured}
│   ├── data/
│   │   ├── exhibitors.js # {name, logo, description, industry} — CHỈ dùng làm fallback placeholder khi Notion chưa cấu hình/lỗi
│   │   ├── schedule.js   # lịch trình 4 ngày
│   │   └── packages.js   # gói gian hàng + gói tài trợ (có field slotsLeft cho badge FOMO)
│   ├── App.jsx
│   └── index.css
├── .env.example
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

## Các block trên trang (thứ tự)

1. Header (sticky, anchor nav, CTA "Đăng ký gian hàng")
2. Hero (`trade-hero.png` full-bleed, không chữ overlay)
3. **StarConcept** — concept "ngôi sao mai", nền dark starfield, ảnh ngôi sao pha lê thật (`/concept/morning-star.jpg`) + quote dẫn dắt từ HAWEE
4. EventIntro (tiêu đề, ngày/địa điểm, `Countdown` đếm ngược FOMO tới 22/10/2026, CTA)
5. EventTicker (marquee sự kiện)
6. Số liệu quy mô (animated counter: 13.381 m² | 30.000+ khách | 700+ doanh nghiệp | 750 gian hàng | 10+ thị trường | 8 chương trình chuyên môn | 500 cuộc gặp B2B)
7. Mục tiêu cốt lõi (3–4 card)
8. **IndustryFocus** — 6 nhóm ngành xuất khẩu chủ lực, thiết kế photo-card (ảnh 4:3 + icon badge nổi ở mép dưới) theo mẫu section "DOANH NGHIỆP VÀ NGÀNH HÀNG" tại hochiminhexport.com — 6 ảnh thật riêng biệt tại `public/industries/`
9. **StrategicHighlights** — "Điểm mới chiến lược 2026": Women-Led Export Pavilion, Chuỗi diễn đàn chuyên đề, Outdoor Fashion Pavilion, International Buyer Program + dải chip "hoạt động điểm nhấn" (Green Badge, MOU Celebration, VIP Tour & Livestream, Green Premium Tour, Góc Trực Diện). Data từ `src/data/highlights.js`.
10. **DealBellPassport** — 2 card trải nghiệm thật: Deal Bell (`/concept/b2b_p6_1.jpg`) + HAWEE Global Passport (`/concept/passport-cover.jpg` + `passport-stamps.jpg`, mốc thưởng 5/10/20 dấu)
11. **Exhibitors — "DOANH NGHIỆP TRIỂN LÃM TIÊU BIỂU"** — card grid logo + tên + mô tả ngắn, click mở modal chi tiết. Đọc dữ liệu **live từ Notion** (`HAWEE Trade Fair Exhibitors DB`, xem mục "Notion CMS" bên dưới) qua `src/services/notion.js` → `/api/notion`; `src/data/exhibitors.js` chỉ còn là fallback placeholder khi Notion chưa cấu hình hoặc lỗi mạng.
12. Chuỗi hoạt động 4 ngày (Welcome Night 21/10 → Ngày 1/2/3, tab theo ngày, mỗi ngày là danh sách highlight — không có mốc giờ chi tiết vì nguồn không cung cấp)
13. **MemberJourney** — "Trước – Trong – Sau hội chợ", hành trình 3 giai đoạn dành riêng cho hội viên đăng ký gian hàng tại HAWEE Pavillon (Huấn luyện Xanh hoá, Green Badge, B2B Matching/MOU Celebration, VIP Tour, Green Premium Tour, Follow-up Pipeline sau sự kiện...). Nguồn: `Final-Proposal.pdf` / `HAWEE Trade Fair 2026 Presentation.pptx.pdf` (2 file trùng nội dung), trang 7-9 "HOẠT ĐỘNG ĐIỂM NHẤN — GIAI ĐOẠN 1/2/3". Data từ `src/data/journey.js`.
14. **Vé tham gia** — Ticket A (Vị trí Vàng, early bird 10tr/chuẩn 12tr, chỉ 24 suất) / Ticket B (tiêu chuẩn, early bird 6tr/chuẩn 8tr, chỉ 40 suất), giao diện dạng **vé xé thật** (`.ticket-card` + `.ticket-seam-h/v` — đường răng cưa + lỗ đục CSS), kèm `EarlyBirdCountdown` đếm ngược tới hạn 31/7 và ảnh backdrop demo thật (`/concept/b2b_p6_0.jpg`). Tặng kèm: chương trình đào tạo 3tr (3 module) trong `.gift-card` — ribbon góc, icon quà glow/bounce, 3 module card riêng biệt.
15. Tài trợ hiện kim: Kim Cương 100tr / Vàng 50tr / Bạc 20tr + bảng so sánh quyền lợi chi tiết (Branding/Booth/Media). Tài trợ hiện vật: Gift Bag / Media-PR / Production Partner. Data từ `src/data/packages.js`.
16. Sơ đồ gian hàng (`/so-do-gian-hang.png` — cập nhật theo bản 64 gian mới nhất)
17. Đăng ký tham gia (form Formspree + Google Sheet, xem mục riêng bên dưới)
18. Footer

**Chủ động không đưa lên site** (theo yêu cầu): lộ trình triển khai nội bộ (giai đoạn I/II BTC), P&L dự kiến, danh sách ban điều hành/phối hợp giữa các ban — đây là nội dung vận hành nội bộ, không phù hợp landing page public.

## Notion CMS — Doanh nghiệp triển lãm tiêu biểu

Theo đúng pattern `hawee-website` (`api/notion.js` + `src/services/notion.js`): **key Notion không bao giờ lộ ra client**, chỉ đọc server-side trong Vercel serverless function.

- **Database:** `HAWEE Trade Fair Exhibitors DB` — nằm trong workspace Notion, cùng hub page `HAWEE ARTICLES` với `HAWEE Articles DB` / `HAWEE Events DB` của `hawee-website`.
- **Schema:** `Title` (tên DN) · `Logo` (Files — upload trực tiếp trong Notion) · `Industry` (Select, 6 lựa chọn khớp `IndustryFocus`) · `Description` (Text, 1-2 câu) · `Featured` (Checkbox — bật để ưu tiên lên đầu, vd. sponsor) · `Order` (Number) · `Status` (Select: `Published` / `Draft` — chỉ record `Published` mới hiện lên site).
- **Cách chị tự cập nhật:** mở database trong Notion → thêm 1 row mới → upload logo vào cột `Logo`, gõ tên/ngành hàng/mô tả → chọn `Status = Published` → lưu. Trang sẽ tự hiện logo/thông tin trong tối đa 5 phút (cache client-side).
- **Fallback an toàn:** nếu chưa set env var hoặc Notion lỗi mạng, `Exhibitors.jsx` tự động dùng data tĩnh trong `src/data/exhibitors.js` thay vì hiển thị section trống.
- **Lưu ý logo Notion-hosted:** file upload trực tiếp trong Notion có URL tạm thời (~1 giờ) — cùng giới hạn đã chấp nhận ở `hawee-website/ImageURL`, không phải lỗi mới.

## Google Sheet — Kết quả đăng ký

`RegisterForm.jsx` gửi song song tới **cả 2 nơi** khi submit (không thay Formspree, chỉ bổ sung):
1. Formspree (như cũ — email thông báo)
2. Google Apps Script Web App (`VITE_APPS_SCRIPT_URL`) — ghi trực tiếp vào Google Sheet: https://docs.google.com/spreadsheets/d/1njlgjdF50IYZQEaapLYxyCk6zqyHjPJqOhxdHZoZSDc

Script tự tạo và phân luồng vào 2 sheet dựa theo field `interest`:
- **"Đăng ký gian hàng"** — khi chọn "Tôi quan tâm đăng ký vé" / "Tôi đang cân nhắc"
- **"Đăng ký tài trợ"** — khi chọn "Tôi muốn trở thành Nhà Tài trợ"

Code + hướng dẫn cài đặt đầy đủ nằm ở `google-apps-script/Code.gs` + `google-apps-script/README.md`. **Cần chị tự làm bước cài đặt trong Google Sheet** (Claude không đăng nhập được Google account của chị) — copy `Code.gs` vào Apps Script editor, Deploy as Web App, rồi đưa URL vào `VITE_APPS_SCRIPT_URL` trên Vercel. Nếu chưa set biến này, form vẫn hoạt động bình thường (chỉ gửi Formspree) — không lỗi.

## Environment Variables

```
VITE_FORMSPREE_ID=            # an toàn để lộ, chỉ là endpoint form public

# Server-side only (KHÔNG thêm tiền tố VITE_) — đọc trong api/notion.js
NOTION_API_KEY=
NOTION_EXHIBITORS_DB_ID=
```

Nếu sau này thêm secret thật khác → **không** thêm tiền tố `VITE_`, chỉ đọc server-side trong `api/*.js` (giống pattern `NOTION_API_KEY` ở `hawee-website/api/notion.js`).

## Việc cần làm thủ công / còn thiếu dữ liệu

- ~~Set env var trên Vercel~~ — **Đã xong.** `NOTION_API_KEY` + `NOTION_EXHIBITORS_DB_ID` (= `30ea56db6c33498eb5e8163e7af4b38b` — đây là **database ID**, khác với data-source/collection ID hiển thị trong URL `collection://...`, cần lưu ý nếu tạo DB Notion mới sau này) đã add vào Vercel + share database với integration, xác nhận hoạt động qua `/api/notion`.
- **Nhập logo + mô tả doanh nghiệp thật vào Notion** — 4 row hiện tại trong `HAWEE Trade Fair Exhibitors DB` là data mẫu (Order 1-4, chưa có Logo), cần chị vào Notion thay bằng doanh nghiệp thật + upload logo.
- **Xác nhận bản quyền logo** — cần chắc chắn từng doanh nghiệp đồng ý hiển thị logo công khai trước khi để `Status = Published`.

## Chạy thử local

```bash
npm install
npm run dev
```

## Deploy

Push lên `main` → Vercel auto-deploy (project riêng, chưa setup — xem `PLAN.md` mục domain/DNS nếu dùng subdomain riêng).

Xem đầy đủ lý do lựa chọn kiến trúc, backend/security checklist, và pre-launch checklist tại `PLAN.md` trong cùng thư mục.
