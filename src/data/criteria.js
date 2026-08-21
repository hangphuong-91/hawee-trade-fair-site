import { Ship, BadgeCheck, Leaf, GraduationCap } from 'lucide-react'

// Nguồn: tài-liệu/tieu-chi-tham-gia.png — "Tiêu chí lựa chọn doanh nghiệp", áp dụng cho Hội viên HAWEE và Mở rộng.
export const criteria = [
  {
    icon: Ship,
    title: 'Đã Có Hoạt Động Xuất Khẩu',
    titleEn: 'Established Export Activity',
    desc: 'Doanh nghiệp sở hữu tệp khách hàng nước ngoài và đã triển khai các hoạt động xuất khẩu sản phẩm trên thực tế.',
    descEn: 'The business has an existing base of overseas customers and has actively carried out product exports.',
  },
  {
    icon: BadgeCheck,
    title: 'Sẵn Sàng Về Nguồn Lực',
    titleEn: 'Resource Readiness',
    desc: 'Hệ thống vận hành, quy trình sản xuất và nhân sự sẵn sàng đáp ứng nhanh chóng các đơn hàng quốc tế.',
    descEn: 'Operating systems, production processes and staffing are ready to fulfill international orders quickly.',
  },
  {
    icon: Leaf,
    title: 'Tiêu Chuẩn "Xanh - Sạch - Số"',
    titleEn: '"Green – Clean – Digital" Standards',
    desc: 'Sản phẩm đạt chuẩn xuất khẩu, có chứng chỉ chất lượng quốc tế, minh bạch nguồn gốc, đáp ứng định hướng tiêu chuẩn toàn cầu bền vững.',
    descEn: 'Products meet export standards with international quality certification and transparent traceability, in line with global sustainability standards.',
  },
  {
    icon: GraduationCap,
    title: 'Cam Kết & Tuân Thủ Yêu Cầu Chuẩn Bị',
    titleEn: 'Commitment & Compliance With Preparation Requirements',
    desc: 'Tham gia đầy đủ chương trình đào tạo nâng cao năng lực trước khi bước vào hội chợ chính thức; chuẩn bị hồ sơ quảng bá doanh nghiệp và kết nối B2B chuyên nghiệp.',
    descEn: 'Full participation in capacity-building training ahead of the official fair; prepared company promotional materials and professional B2B connections.',
  },
]
