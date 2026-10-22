import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Trang quay số tách riêng (lazy) để không làm nặng bundle landing; site không dùng React Router.
// Trang voucher cũng vậy: /voucher (khách nhận) và /voucher/use (gian hàng quét QR xác nhận).
const LuckyDraw = lazy(() => import('./luckydraw/LuckyDraw.jsx'))
const Voucher = lazy(() => import('./voucher/Voucher.jsx'))
const Redeem = lazy(() => import('./voucher/Redeem.jsx'))
const PAGES = { '/luckydraw': LuckyDraw, '/voucher': Voucher, '/voucher/use': Redeem }
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
