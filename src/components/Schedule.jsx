import { useState } from 'react'
import { Clock, MapPin, Table2, Clock3, Handshake } from 'lucide-react'
import FadeUp from './FadeUp'
import SourceBadge from './SourceBadge'
import { schedule } from '../data/schedule'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  vi: {
    tag: 'Chuỗi hoạt động',
    title: '3 Ngày Bứt Phá Cơ Hội Xuất Khẩu',
    sub: 'Từng khung giờ đều là một cánh cửa kết nối — hội nghị chuyên đề, B2B matching, tham quan thực tế. Càng có mặt sớm, doanh nghiệp bạn càng nắm nhiều cơ hội.',
    closing: 'Sẵn sàng góp mặt trong hành trình 3 ngày này?',
    ctaPricing: 'Xem bảng giá & quyền lợi',
    haweeOnly: 'Riêng của HAWEE Pavillon',
    galleryLabel: 'HAWEE Business Gallery Corner',
    b2bTitle: 'B2B Matching',
    b2bDesc: 'Không gian matching giữa các doanh nghiệp đã được đặt lịch trước — kết nối trực tiếp, đúng đối tượng, đúng nhu cầu.',
    tables: '05 bàn matching 1x1',
    duration: 'Mỗi lượt dài 30 phút',
    opLabel: 'Vận hành:',
    opDesc: 'Doanh nghiệp cùng đối tác đăng ký trực tiếp tại địa điểm.',
    note: '* Lịch trình dự kiến và sẽ tiếp tục được cập nhật.',
  },
  en: {
    tag: 'Event Program',
    title: '3 Days To Accelerate Export Opportunities',
    sub: 'Every time slot is a door to new connections — expert forums, B2B matching, on-site visits. The earlier your business is there, the more opportunities you capture.',
    closing: 'Ready to be part of these 3 days?',
    ctaPricing: 'View Pricing & Benefits',
    haweeOnly: 'Exclusive to HAWEE Pavillon',
    galleryLabel: 'HAWEE Business Gallery Corner',
    b2bTitle: 'B2B Matching',
    b2bDesc: 'A pre-scheduled matching space between businesses — direct connections, the right counterpart, the right need.',
    tables: '05 one-on-one matching tables',
    duration: 'Each session lasts 30 minutes',
    opLabel: 'How it works:',
    opDesc: 'Businesses and partners register directly on-site.',
    note: '* Schedule is preliminary and subject to change.',
  },
}

export default function Schedule() {
  const [dayIndex, setDayIndex] = useState(0)
  const { lang } = useLanguage()
  const c = copy[lang]
  const day = schedule[dayIndex]

  return (
    <section id="lich-trinh" className="py-12 md:py-16 aura-section">
      <div className="container-custom">
        <FadeUp className="text-center max-w-2xl mx-auto mb-12">
          <p className="label-tag mb-3">{c.tag}</p>
          <h2 className="section-title text-2xl md:text-4xl whitespace-normal text-balance">{c.title}</h2>
          <p className="text-muted text-sm">{c.sub}</p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <FadeUp>
            <div className="mb-4 flex justify-center lg:justify-start">
              <SourceBadge variant="gov" />
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-center lg:justify-start mb-8">
              {schedule.map((d, i) => (
                <button
                  key={d.day}
                  onClick={() => setDayIndex(i)}
                  className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    i === dayIndex ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-rose-50'
                  }`}
                >
                  {lang === 'en' ? d.dayEn : d.day} · {lang === 'en' ? d.dateEn : d.date}
                </button>
              ))}
            </div>

            <div key={day.day} className="space-y-3">
              {day.items.map((item, i) => (
                <FadeUp key={i} delay={i * 0.04}>
                  <div className="bg-white rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-3 card-hover">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm sm:w-36 shrink-0">
                      <Clock size={16} />
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <ul className="space-y-1">
                        {(lang === 'en' ? item.activityEn : item.activity).map((line, li) => (
                          <li key={li} className="font-medium text-dark text-sm flex items-start gap-2">
                            {item.activity.length > 1 && (
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            )}
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-muted text-xs flex items-center gap-1 mt-2">
                        <MapPin size={12} />
                        {(lang === 'en' && item.locationEn) || item.location}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <div className="mt-8 text-center lg:text-left">
              <p className="text-muted text-sm mb-4">{c.closing}</p>
              <a href="#goi-tham-gia" className="btn-primary">
                {c.ctaPricing}
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="rounded-3xl bg-white overflow-hidden card-hover border border-rose-50">
              <img
                src="/concept/b2b-matching-1.jpg"
                alt="HAWEE Business Gallery Corner — B2B Matching"
                className="w-full h-48 md:h-56 object-cover"
              />
              <div className="p-7">
                <div className="mb-3">
                  <SourceBadge variant="hawee" label={c.haweeOnly} />
                </div>
                <p className="label-tag mb-2">{c.galleryLabel}</p>
                <h3 className="text-xl font-semibold text-dark mb-2">{c.b2bTitle}</h3>
                <p className="text-muted text-sm leading-relaxed mb-5">{c.b2bDesc}</p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-rose-50 rounded-xl p-3.5 flex items-center gap-2.5">
                    <Table2 size={18} className="text-primary shrink-0" />
                    <span className="text-dark text-xs font-semibold leading-snug">{c.tables}</span>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-3.5 flex items-center gap-2.5">
                    <Clock3 size={18} className="text-primary shrink-0" />
                    <span className="text-dark text-xs font-semibold leading-snug">{c.duration}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 mb-6">
                  <Handshake size={16} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-muted text-xs leading-relaxed">
                    <span className="font-semibold text-dark">{c.opLabel}</span> {c.opDesc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <img
                    src="/concept/b2b-matching-3.jpg"
                    alt="Khu vực Business Matching"
                    className="w-full h-24 object-cover rounded-xl"
                  />
                  <img
                    src="/concept/b2b-matching-2.jpg"
                    alt="Doanh nghiệp kết nối tại HAWEE Business Gallery Corner"
                    className="w-full h-24 object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        <p className="text-muted text-xs mt-8 text-center lg:text-left">{c.note}</p>
      </div>
    </section>
  )
}
