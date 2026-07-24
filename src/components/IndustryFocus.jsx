import { Shirt, Wheat, Wrench, Truck, UserRound, Factory } from 'lucide-react'
import FadeUp from './FadeUp'
import { useLanguage } from '../context/LanguageContext'

// Ảnh thật từ hội chợ (HCM City Export — cùng hệ sự kiện với Sở Công Thương TP.HCM
// và từ media/tham-khao), mỗi ngành hàng 1 ảnh riêng biệt, không trùng lặp.
const industries = [
  {
    icon: Shirt,
    image: '/industries/det-may-da-giay.jpg',
    title: 'Dệt may – Da giày, Thủ công mỹ nghệ, Quà tặng',
    titleEn: 'Textiles & Footwear, Handicrafts, Gifts',
    highlight: 'Đặc biệt: Outdoor Garment & Textile Pavilion',
    highlightEn: 'Featuring: Outdoor Garment & Textile Pavilion',
  },
  {
    icon: Wheat,
    image: '/industries/halal-nong-san.jpg',
    title: 'Thực phẩm Halal & Nông sản',
    titleEn: 'Halal Food & Agricultural Products',
    highlight: 'Đạt chuẩn Halal, truy xuất nguồn gốc rõ ràng',
    highlightEn: 'Halal-certified with clear traceability',
  },
  {
    icon: Wrench,
    image: '/industries/thiet-bi-gia-dung.jpg',
    title: 'Thiết bị gia dụng, kim khí, dụng cụ cầm tay',
    titleEn: 'Household Appliances, Hardware & Hand Tools',
    highlight: 'Sản xuất công nghiệp phụ trợ chất lượng cao',
    highlightEn: 'High-quality supporting-industry manufacturing',
  },
  {
    icon: Truck,
    image: '/industries/dich-vu-xuat-khau.jpg',
    title: 'Dịch vụ hỗ trợ xuất khẩu',
    titleEn: 'Export Support Services',
    highlight: 'Logistics · Ngân hàng · Bảo hiểm',
    highlightEn: 'Logistics · Banking · Insurance',
  },
  {
    icon: UserRound,
    image: '/industries/phu-nu-lam-chu.jpg',
    title: 'Doanh nghiệp do Phụ nữ làm chủ',
    titleEn: 'Women-Owned Businesses',
    highlight: 'Trao quyền kinh tế cho nữ doanh nhân Việt',
    highlightEn: 'Economic empowerment for Vietnamese women entrepreneurs',
  },
  {
    icon: Factory,
    image: '/industries/fdi-san-xuat.jpg',
    title: 'Sản phẩm doanh nghiệp FDI sản xuất tại Việt Nam',
    titleEn: 'Products Made in Vietnam by FDI Enterprises',
    highlight: 'Kết nối chuỗi cung ứng nội địa hoá',
    highlightEn: 'Connecting localized supply chains',
  },
]

const copy = {
  vi: { tag: 'Ngành hàng chủ lực', title: '6 Nhóm Ngành Trọng Điểm', sub: 'Mỗi ngành hàng là một vì sao trên bầu trời xuất khẩu — đâu là ánh sáng của doanh nghiệp bạn?' },
  en: { tag: 'Key Industries', title: '6 Priority Industry Groups', sub: 'Every industry is a star in the export sky — which one lights up your business?' },
}

export default function IndustryFocus() {
  const { lang } = useLanguage()
  const c = copy[lang]
  return (
    <section className="py-12 md:py-16">
      <div className="container-custom">
        <FadeUp className="text-center max-w-2xl mx-auto mb-10">
          <p className="label-tag mb-3">{c.tag}</p>
          <h2 className="section-title text-2xl md:text-4xl whitespace-normal text-balance">{c.title}</h2>
          <p className="text-muted text-sm">{c.sub}</p>
        </FadeUp>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 sm:gap-x-6 gap-y-7 sm:gap-y-10">
          {industries.map((ind, i) => (
            <FadeUp key={ind.title} delay={i * 0.06} className="h-full">
              <div className="industry-photo-card rounded-2xl bg-white h-full flex flex-col card-hover">
                <div className="relative aspect-[4/3]">
                  <img src={ind.image} alt={lang === 'en' ? ind.titleEn : ind.title} className="w-full h-full object-cover rounded-2xl" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
                  <span className="industry-icon-badge absolute -bottom-5 left-4 sm:-bottom-6 sm:left-6 w-9 h-9 sm:w-12 sm:h-12">
                    <ind.icon className="text-primary" size={20} strokeWidth={2} />
                  </span>
                </div>
                <div className="pt-7 pb-4 px-4 sm:pt-9 sm:pb-6 sm:px-6 flex-1">
                  <h3 className="font-semibold text-dark text-xs sm:text-sm leading-snug mb-1.5 sm:mb-2 line-clamp-3">
                    {lang === 'en' ? ind.titleEn : ind.title}
                  </h3>
                  <p className="text-muted text-[12px] sm:text-xs leading-relaxed line-clamp-2">
                    {lang === 'en' ? ind.highlightEn : ind.highlight}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
