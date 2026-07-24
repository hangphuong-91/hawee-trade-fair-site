# HAWEE International Trade Fair — Landing Page

Landing page cho **HAWEE International Trade Fair**, trong khuôn khổ "Hội chợ hàng Việt Nam tiêu biểu xuất khẩu 2026" do Sở Công Thương TP.HCM chủ trì, tổ chức bởi Sở Công Thương x HAWEE x APEX.

- **Thời gian:** 22–24/10/2026
- **Địa điểm:** Trung tâm Triển lãm Quốc tế WTC Expo, Bình Dương, TP.HCM

## Nội dung trang

Giới thiệu sự kiện, quy mô, mục tiêu, khung hoạt động 4 ngày, gói gian hàng/tài trợ, danh sách doanh nghiệp tham gia (logo + giới thiệu ngắn), và form đăng ký gian hàng.

## Chạy local

```bash
npm install
npm run dev
```

Mở địa chỉ Vite in ra (mặc định `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview   # xem thử bản build production
```

## Deploy

Project Vercel riêng cho `trade-fair`, connect GitHub repo → push `main` là tự động deploy, không cần bước thủ công thêm. Env variable cần set trong Vercel dashboard: `VITE_FORMSPREE_ID`.

## Cấu trúc & quyết định kỹ thuật

Xem `CLAUDE.md` (hướng dẫn cho AI agent làm việc trên repo) và `PLAN.md` (bối cảnh, backend/security checklist, pre-launch checklist đầy đủ) trong cùng thư mục.
