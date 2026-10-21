import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Trang quay số tách riêng (lazy) để không làm nặng bundle landing; site không dùng React Router.
const LuckyDraw = lazy(() => import('./luckydraw/LuckyDraw.jsx'))
const isLuckyDraw = window.location.pathname.replace(/\/+$/, '').toLowerCase() === '/luckydraw'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isLuckyDraw ? (
      <Suspense fallback={null}>
        <LuckyDraw />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
