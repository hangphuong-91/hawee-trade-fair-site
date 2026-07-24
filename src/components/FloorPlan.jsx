import { Plane, ShoppingBag } from 'lucide-react'
import FadeUp from './FadeUp'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  vi: {
    tag: 'Sơ đồ gian hàng',
    title: 'WTC Expo, Bình Dương',
    address: 'B11, Đường Hùng Vương, phường Bình Dương, TP.HCM',
    airportLabel: 'Sân bay Tân Sơn Nhất',
    airportDist: '~32,8 km · 1 giờ 24 phút',
    marketLabel: 'Chợ Bến Thành',
    marketDist: '~36,8 km · 1 giờ 29 phút',
    wtcAlt: 'Trung tâm Triển lãm WTC Expo',
    floorAlt: 'Sơ đồ gian hàng dự kiến',
  },
  en: {
    tag: 'Floor Plan',
    title: 'WTC Expo, Binh Duong',
    address: 'B11, Hung Vuong Street, Binh Duong Ward, Ho Chi Minh City',
    airportLabel: 'Tan Son Nhat Airport',
    airportDist: '~32.8 km · 1h 24min',
    marketLabel: 'Ben Thanh Market',
    marketDist: '~36.8 km · 1h 29min',
    wtcAlt: 'WTC Expo Exhibition Center',
    floorAlt: 'Preliminary floor plan',
  },
}

export default function FloorPlan() {
  const { lang } = useLanguage()
  const c = copy[lang]
  return (
    <section className="py-12 md:py-16 grid-paper">
      <div className="container-custom">
        <FadeUp className="text-center max-w-2xl mx-auto mb-10">
          <p className="label-tag mb-3">{c.tag}</p>
          <h2 className="section-title text-2xl md:text-4xl whitespace-normal text-balance">{c.title}</h2>
          <p className="text-muted text-sm">{c.address}</p>
        </FadeUp>

        <FadeUp className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10 mt-4">
          <div className="corner-brackets text-primary rounded-2xl overflow-hidden card-hover">
            <img src="/wtc-expo.jpg" alt={c.wtcAlt} className="w-full h-full object-cover" />
          </div>
          <div className="corner-brackets text-primary rounded-2xl overflow-hidden bg-white card-hover">
            <img src="/so-do-gian-hang.png" alt={c.floorAlt} className="w-full h-full object-contain" />
          </div>
        </FadeUp>

        <FadeUp className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 card-hover">
            <div className="w-12 h-12 rounded-xl bg-gradient-hawee flex items-center justify-center shrink-0">
              <Plane className="text-white" size={20} />
            </div>
            <div>
              <p className="font-semibold text-dark text-sm">{c.airportLabel}</p>
              <p className="text-muted text-xs">{c.airportDist}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 card-hover">
            <div className="w-12 h-12 rounded-xl bg-gradient-hawee flex items-center justify-center shrink-0">
              <ShoppingBag className="text-white" size={20} />
            </div>
            <div>
              <p className="font-semibold text-dark text-sm">{c.marketLabel}</p>
              <p className="text-muted text-xs">{c.marketDist}</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
