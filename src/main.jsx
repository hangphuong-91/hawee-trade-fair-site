import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Trang quay số tách riêng (lazy) để không làm nặng bundle landing; site không dùng React Router.
// Trang voucher cũng vậy: /voucher (khách nhận) và /voucher/use (gian hàng quét QR xác nhận).
const LuckyDraw = lazy(() => import('./luckydraw/LuckyDraw.jsx'))
// Chương trình voucher đã kết thúc (24/10) → cả 2 trang hiện thông báo kết thúc; Voucher.jsx / Redeem.jsx giữ lại để mở lại khi cần.
const VoucherClosed = lazy(() => import('./voucher/VoucherClosed.jsx'))
const PAGES = { '/luckydraw': LuckyDraw, '/voucher': VoucherClosed, '/voucher/use': VoucherClosed }
const Page = PAGES[window.location.pathname.replace(/\/+$/, '').toLowerCase()]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {Page ? (
      <Suspense fallback={null}>
        <Page />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
