import { Bell, Stamp, Gift, QrCode, MapPin, PartyPopper } from 'lucide-react'
import FadeUp from './FadeUp'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  vi: {
    tag: 'Hoạt động tăng tương tác tại gian hàng',
    title: 'Hai Khoảnh Khắc Không Thể Bỏ Lỡ',
    sub: '2 hoạt động dành cho khách tham quan, được thiết kế để dẫn khách ghé thăm và tương tác trực tiếp tại gian hàng — không chỉ đứng xem, mà thực sự bước vào từng gian hàng doanh nghiệp.',
    dealBellLabel: 'Deal Bell',
    dealBellTitle: 'Chuông Chốt Deal',
    dealBellDesc:
      'Mỗi khi một thỏa thuận hợp tác được ký ngay tại gian hàng, doanh nghiệp được mời rung chuông ăn mừng giữa sàn triển lãm — khoảnh khắc "Celebrate Every Connection, Mark Every Opportunity" thu hút sự chú ý của khách tham quan xung quanh, kéo thêm lượt khách ghé đến đúng gian hàng vừa chốt deal.',
    dealBellQuote: '"New Deal. New Opportunities. New Future!"',
    passportTitle: 'HAWEE Global Passport',
    passportDesc:
      '"Collect Connections, Unlock Opportunities" — mỗi khách tham quan nhận 1 cuốn passport và phải trực tiếp ghé từng gian hàng để quét mã, nhận dấu — tạo lưu lượng khách tự nhiên đổ về gian hàng doanh nghiệp bạn suốt 3 ngày hội chợ.',
    passportSteps: [
      { icon: MapPin, text: 'Ghé thăm gian hàng doanh nghiệp' },
      { icon: QrCode, text: 'Quét mã QR để xem thông tin' },
      { icon: Stamp, text: 'Nhận dấu vào HAWEE Global Passport' },
    ],
    passportMilestones: [
      { stamps: '5', reward: 'Quà lưu niệm' },
      { stamps: '10', reward: 'Tham gia Lucky Draw' },
      { stamps: '20', reward: 'Chứng nhận Global Explorer' },
    ],
    stampsUnit: 'dấu',
    closing: 'Cả 2 hoạt động đều dẫn khách trực tiếp đến gian hàng — chỉ áp dụng cho doanh nghiệp đã giữ chỗ tại HAWEE Pavillon.',
    cta: 'Trải nghiệm tại HAWEE Pavillon',
  },
  en: {
    tag: 'Booth Engagement Activities',
    title: 'Two Moments You Cannot Miss',
    sub: 'Two visitor activities designed to draw guests to your booth for direct, in-person engagement — not just browsing, but actually stepping inside each exhibitor booth.',
    dealBellLabel: 'Deal Bell',
    dealBellTitle: 'The Deal-Closing Bell',
    dealBellDesc:
      'Whenever a partnership is sealed right at the booth, the business is invited to ring a bell in celebration on the exhibition floor — a "Celebrate Every Connection, Mark Every Opportunity" moment that draws the attention of nearby visitors and pulls even more foot traffic to the booth that just closed a deal.',
    dealBellQuote: '"New Deal. New Opportunities. New Future!"',
    passportTitle: 'HAWEE Global Passport',
    passportDesc:
      '"Collect Connections, Unlock Opportunities" — every visitor receives a passport and must visit each booth in person to scan a code and collect a stamp, creating natural foot traffic to your booth throughout all 3 days of the fair.',
    passportSteps: [
      { icon: MapPin, text: 'Visit an exhibitor booth' },
      { icon: QrCode, text: 'Scan the QR code for details' },
      { icon: Stamp, text: 'Get a stamp in your HAWEE Global Passport' },
    ],
    passportMilestones: [
      { stamps: '5', reward: 'Souvenir gift' },
      { stamps: '10', reward: 'Lucky Draw entry' },
      { stamps: '20', reward: 'Global Explorer certificate' },
    ],
    stampsUnit: 'stamps',
    closing:
      'Both activities drive visitors directly to your booth — available exclusively to businesses that have reserved a booth at HAWEE Pavillon.',
    cta: 'Experience HAWEE Pavillon',
  },
}

export default function DealBellPassport() {
  const { lang } = useLanguage()
  const c = copy[lang]
  return (
    <section className="py-12 md:py-16 aura-section">
      <div className="container-custom">
        <FadeUp className="text-center max-w-2xl mx-auto mb-12">
          <p className="label-tag mb-3">{c.tag}</p>
          <h2 className="section-title text-2xl md:text-4xl whitespace-normal text-balance">{c.title}</h2>
          <p className="text-muted text-sm">{c.sub}</p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FadeUp>
            <div className="rounded-3xl overflow-hidden bg-white h-full card-hover border border-rose-50">
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src="/concept/b2b_p6_1.jpg"
                  alt="Deal Bell — HAWEE Global Connect"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <span className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center stat-icon-glow">
                    <Bell size={18} />
                  </span>
                  <span className="font-semibold">{c.dealBellLabel}</span>
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-semibold text-dark mb-2">{c.dealBellTitle}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{c.dealBellDesc}</p>
                <p className="text-primary text-sm font-semibold">{c.dealBellQuote}</p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-3xl overflow-hidden bg-white h-full card-hover border border-rose-50">
              <div className="relative h-56 md:h-64 overflow-hidden bg-primary-dark flex items-center justify-center gap-4 px-6">
                <img
                  src="/concept/passport-cover.jpg"
                  alt="HAWEE Global Passport"
                  className="h-full py-4 object-contain drop-shadow-2xl"
                />
                <img
                  src="/concept/passport-stamps.jpg"
                  alt="Mẫu dấu doanh nghiệp HAWEE Global Passport"
                  className="hidden sm:block h-[80%] rounded-xl object-cover shadow-lg"
                />
              </div>
              <div className="p-7">
                <h3 className="text-xl font-semibold text-dark mb-2">{c.passportTitle}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{c.passportDesc}</p>
                <div className="flex flex-wrap gap-3 mb-4">
                  {c.passportSteps.map((s) => (
                    <div key={s.text} className="flex items-center gap-1.5 text-xs text-dark bg-rose-50 rounded-full px-3 py-1.5">
                      <s.icon size={13} className="text-primary" />
                      {s.text}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {c.passportMilestones.map((m) => (
                    <div
                      key={m.stamps}
                      className="rounded-xl border-2 border-white/40 bg-gradient-hawee text-white text-center py-3 px-1.5 flex flex-col items-center justify-center gap-1"
                    >
                      <div className="flex items-center gap-1 text-sm font-bold whitespace-nowrap">
                        {m.stamps === '20' ? <PartyPopper size={13} /> : <Gift size={13} />}
                        {m.stamps} {c.stampsUnit}
                      </div>
                      <div className="text-[11px] uppercase tracking-wide opacity-90 leading-snug">{m.reward}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.15} className="text-center mt-10">
          <p className="text-muted text-sm mb-4">{c.closing}</p>
          <a href="#dang-ky" className="btn-primary">
            {c.cta}
          </a>
        </FadeUp>
      </div>
    </section>
  )
}
