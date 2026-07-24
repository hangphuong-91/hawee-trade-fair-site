import { TrendingUp, ShieldCheck, Leaf, Globe2, Check } from 'lucide-react'
import FadeUp from './FadeUp'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  vi: {
    heroGoal: {
      icon: TrendingUp,
      title: 'Thúc đẩy xuất khẩu & mở rộng thị trường quốc tế',
      desc: 'Kết nối doanh nghiệp Việt với nhà mua hàng, hệ thống phân phối và đối tác toàn cầu, gia tăng cơ hội tham gia chuỗi cung ứng quốc tế.',
      channelsTitle: 'Đa dạng kênh phân phối trong nước',
      channels: [
        'Chuỗi siêu thị: Aeon, Central Retail, Lotte…',
        'Sàn Thương mại điện tử: Amazon, Alibaba, Shopee, Lazada…',
        'Mạng lưới đối tác: Nhà bán sỉ, đại lý thương mại và xuất nhập khẩu.',
        'Livestream KOL/KOC tại diễn đàn chuyên ngành.',
        'Thu hút cộng đồng người tiêu dùng tham quan và mua hàng.',
      ],
    },
    otherGoals: [
      {
        icon: ShieldCheck,
        title: 'Nâng cao năng lực cạnh tranh của doanh nghiệp Việt',
        desc: 'Quảng bá thương hiệu, chuyển đổi số, tiếp cận tiêu chuẩn quốc tế.',
      },
      {
        icon: Leaf,
        title: 'Định vị hàng Việt theo hướng Xanh & Bền vững',
        desc: 'Sản xuất – xuất khẩu xanh, đáp ứng tiêu chuẩn môi trường toàn cầu.',
      },
      {
        icon: Globe2,
        title: 'Mở mạng lưới quốc tế & tạo giao dịch kinh doanh thực',
        desc: 'Kết nối lãnh sự quán, nhà đầu tư — matching B2B tìm buyer thật.',
      },
    ],
    tag: 'Mục tiêu cốt lõi',
    title: 'Vì Sao Đây Là Chương Trình Doanh Nghiệp Không Thể Bỏ Lỡ Trong Quý 3/2026',
    closing: 'Sẵn sàng để doanh nghiệp bạn là một phần của hành trình này?',
    cta: 'Bắt đầu hành trình cùng HAWEE',
  },
  en: {
    heroGoal: {
      icon: TrendingUp,
      title: 'Drive Exports & Expand Into International Markets',
      desc: 'Connecting Vietnamese businesses with buyers, distribution networks and global partners — widening access to international supply chains.',
      channelsTitle: 'Diverse Domestic Distribution Channels',
      channels: [
        'Retail chains: Aeon, Central Retail, Lotte and more',
        'E-commerce platforms: Amazon, Alibaba, Shopee, Lazada and more',
        'Partner network: wholesalers, trading and import-export agents',
        'KOL/KOC livestreams at industry forums',
        'Direct engagement with consumers on-site',
      ],
    },
    otherGoals: [
      {
        icon: ShieldCheck,
        title: 'Strengthen the Competitiveness of Vietnamese Businesses',
        desc: 'Brand exposure, digital transformation, and alignment with international standards.',
      },
      {
        icon: Leaf,
        title: 'Position Vietnamese Goods for Green & Sustainable Growth',
        desc: 'Green manufacturing and exports that meet global environmental standards.',
      },
      {
        icon: Globe2,
        title: 'Build International Networks & Generate Real Business Deals',
        desc: 'Connections with consulates and investors — B2B matching with genuine buyers.',
      },
    ],
    tag: 'Core Objectives',
    title: 'Why This Is The Program Businesses Cannot Miss In Q3 2026',
    closing: 'Ready for your business to be part of this journey?',
    cta: 'Start Your Journey With HAWEE',
  },
}

export default function CoreGoals() {
  const { lang } = useLanguage()
  const c = copy[lang]
  const { heroGoal, otherGoals } = c
  return (
    <section className="py-12 md:py-16 aura-section relative overflow-hidden">
      <img
        src="/curve-intro.png"
        alt=""
        aria-hidden="true"
        className="curve-fade-bottom pointer-events-none select-none absolute -top-[4vw] -right-[6vw] w-[88vw] max-w-[1150px] opacity-[0.12] sm:opacity-15 md:opacity-20 z-0"
      />
      <div className="container-custom relative z-10">
        <FadeUp className="text-center max-w-2xl mx-auto mb-10">
          <p className="label-tag mb-3">{c.tag}</p>
          <h2 className="section-title text-lg sm:text-2xl md:text-4xl leading-snug whitespace-normal text-balance">
            {c.title}
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <FadeUp className="lg:col-span-3">
            <div className="relative overflow-hidden bg-gradient-hawee rounded-2xl p-8 md:p-10 h-full card-hover flex flex-col justify-between min-h-[280px]">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gov via-gov-gold to-gov z-10" />
              <heroGoal.icon
                size={160}
                strokeWidth={1}
                className="absolute -bottom-8 -right-8 text-white/10 pointer-events-none select-none"
              />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-gov-gold/50 flex items-center justify-center mb-6">
                  <heroGoal.icon className="text-white" size={26} />
                </div>
                <h3 className="font-semibold text-white text-2xl md:text-3xl mb-3 leading-snug">{heroGoal.title}</h3>
                <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-md mb-5">{heroGoal.desc}</p>

                <div className="bg-gov/30 backdrop-blur-sm rounded-xl p-4 max-w-md border-l-2 border-gov-gold">
                  <p className="text-white text-[12px] font-bold uppercase tracking-wide mb-2.5">
                    {heroGoal.channelsTitle}
                  </p>
                  <ul className="space-y-1.5">
                    {heroGoal.channels.map((ch) => (
                      <li key={ch} className="flex items-start gap-2 text-white/85 text-xs leading-relaxed">
                        <Check size={13} className="text-gov-gold shrink-0 mt-0.5" />
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeUp>

          <div className="lg:col-span-2 flex flex-col gap-6">
            {otherGoals.map((g, i) => (
              <FadeUp key={g.title} delay={(i + 1) * 0.1} className="flex-1">
                <div className="bg-white rounded-2xl p-6 h-full card-hover flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-hawee ring-2 ring-gov/20 flex items-center justify-center shrink-0">
                    <g.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark text-base mb-1.5 leading-snug">{g.title}</h3>
                    <p className="text-muted text-xs leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
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
