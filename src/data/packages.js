export const earlyBirdDeadline = '2026-07-31T23:59:59+07:00'

// Tính % giảm giá thật từ 2 chuỗi giá đã format (vd. "6.000.000" so với "10.000.000") — không hardcode
// số % ở nơi hiển thị, tránh lệch khi đổi giá (Ticket A và B có % giảm khác nhau, không cùng 1 mức).
export function parsePrice(str) {
  return parseInt(String(str).replace(/\./g, ''), 10)
}
export function discountPercent(current, original) {
  return Math.round((1 - parsePrice(current) / parsePrice(original)) * 100)
}

// "Giờ Vàng Cuối Tuần" — giá gian hàng thấp nhất, áp dụng đến hết Chủ Nhật 26/7.
// Mức giảm thực tế so với giá tiêu chuẩn khác nhau theo từng vé (xem discountPercent() bên dưới) —
// không cố định 1 con số % cho cả 2 vé. Sau mốc 26/7, giá tự động trở về mức Early Bird (earlyBird)
// đến hết 31/7, rồi trở về giá tiêu chuẩn (standard).
export const flashSaleDeadline = '2026-07-26T23:59:59+07:00'

export const tickets = [
  {
    code: 'Ticket A',
    tag: 'Vị trí Vàng',
    tagEn: 'Gold Position',
    slots: 14,
    soldOut: true,
    flashSale: '6.000.000',
    earlyBird: '7.500.000',
    standard: '12.000.000',
    area: 'Gian hàng tiêu chuẩn 3x3m² gồm: khung gian hàng, 1 bàn & 2 ghế, 1 đèn chiếu sáng 1m2, đề can bảng tên tiêu chuẩn, 1 sọt rác',
    areaEn: 'Standard 3x3m² booth including: booth frame, 1 table & 2 chairs, 1 spotlight, standard nameplate sticker, 1 waste bin',
    benefits: [
      'Gian hàng vị trí Vàng, đón tối đa lượng khách qua lại',
      'Logo ưu tiên trên mọi ấn phẩm truyền thông & kênh số sự kiện',
      'PR riêng biệt — bài viết giới thiệu độc lập trên kênh HAWEE',
      'Tiếp cận Buyer đích danh — BTC gửi hồ sơ năng lực đến nhà mua hàng tiềm năng',
      'Hiện diện tại Khu VIP Business Matching',
      'Ưu tiên Business Matching 1-1 với nhà phân phối phù hợp nhất',
      'Đài thọ 100% khoá đào tạo "Xanh hoá để Xuất khẩu" (3 ngày, trị giá 3.000.000đ)',
    ],
    benefitsEn: [
      'Gold-position booth, capturing maximum foot traffic',
      'Priority logo placement across all event media and digital channels',
      'Dedicated PR — a standalone feature article on HAWEE channels',
      "Direct buyer targeting — the organizer shares your capability profile with prospective buyers",
      'Access to the VIP Business Matching area',
      'Priority 1-on-1 business matching with the most suitable distributors',
      '100% sponsored "Going Green for Export" training program (3 days, valued at 3,000,000đ)',
    ],
    highlight: true,
  },
  {
    code: 'Ticket B',
    tag: 'Gian hàng tiêu chuẩn',
    tagEn: 'Standard Booth',
    slots: 34,
    flashSale: '4.000.000',
    earlyBird: '5.000.000',
    standard: '8.000.000',
    area: 'Gian hàng tiêu chuẩn 3x3m² gồm: khung gian hàng, 1 bàn & 2 ghế, 1 đèn chiếu sáng 1m2, đề can bảng tên tiêu chuẩn, 1 sọt rác',
    areaEn: 'Standard 3x3m² booth including: booth frame, 1 table & 2 chairs, 1 spotlight, standard nameplate sticker, 1 waste bin',
    benefits: [
      'Gian hàng tiêu chuẩn 9m²',
      'Logo doanh nghiệp trên Backdrop chung của HAWEE Pavillon',
      'Đài thọ 100% khoá đào tạo "Xanh hoá để Xuất khẩu" (3 ngày, trị giá 3.000.000đ)',
    ],
    benefitsEn: [
      'Standard 9m² booth',
      "Company logo on HAWEE Pavillon's shared backdrop",
      '100% sponsored "Going Green for Export" training program (3 days, valued at 3,000,000đ)',
    ],
    highlight: false,
  },
]

export const trainingProgram = {
  value: '3.000.000',
  modules: [
    { title: 'Xây dựng doanh nghiệp xanh sẵn sàng cho xuất khẩu', titleEn: 'Building an Export-Ready Green Business', duration: '2 ngày', durationEn: '2 days' },
    { title: 'Xu hướng thiết kế bao bì cho cạnh tranh quốc tế', titleEn: 'Packaging Design Trends for Global Competitiveness', duration: '0.5 ngày', durationEn: '0.5 day' },
    { title: 'Xây dựng thương hiệu & kỹ năng tham gia hội chợ quốc tế', titleEn: 'Branding & International Trade Fair Skills', duration: '0.5 ngày', durationEn: '0.5 day' },
  ],
}

export const cashSponsorships = [
  {
    tier: 'Gói Kim Cương',
    tierEn: 'Diamond Package',
    icon: '💎',
    price: '100 triệu',
    priceEn: '100,000,000đ',
    label: 'Nổi Bật Vị Thế',
    labelEn: 'Maximum Visibility',
    desc: 'Gói duy nhất xuất hiện tại Cổng chính & Trailer sự kiện — điểm chạm đầu tiên và mạnh mẽ nhất với toàn bộ khách tham quan và Buyer quốc tế. Định vị "Nổi bật nhất" trong Video Recap.',
    descEn:
      'The only package featured at the Main Gate and event trailer — the first and strongest touchpoint with every visitor and international buyer. Positioned as the standout brand in the recap video.',
  },
  {
    tier: 'Gói Vàng',
    tierEn: 'Gold Package',
    icon: '🟡',
    price: '50 triệu',
    priceEn: '50,000,000đ',
    label: 'Tối Ưu Chi Phí, Sở Hữu Đặc Quyền',
    labelEn: 'Best Value, Exclusive Privileges',
    desc: 'Nhân đôi diện tích gian hàng (x2 Booths), không gian trưng bày bề thế. Tham gia Panelist trên sân khấu lớn, được truyền thông hình ảnh đại diện & trích lời.',
    descEn:
      'Double booth space (x2 booths) for a commanding presence. Includes a main-stage panelist seat, plus media coverage and quoted commentary.',
  },
  {
    tier: 'Gói Bạc',
    tierEn: 'Silver Package',
    icon: '⚪',
    price: '20 triệu',
    priceEn: '20,000,000đ',
    label: 'Đồng Hành Tiêu Chuẩn',
    labelEn: 'Standard Partnership',
    desc: 'Sở hữu 1 gian hàng tiêu chuẩn, hiện diện logo tại khu vực check-in chung, ưu tiên tham gia các phiên B2B Matching.',
    descEn:
      'One standard booth, logo placement at the shared check-in area, and priority access to B2B matching sessions.',
  },
]

export const sponsorBenefitTable = [
  {
    group: '1. Branding Exposure',
    groupEn: '1. Branding Exposure',
    rows: [
      { label: 'Logo trên Cổng chính vào HAWEE Pavillon', labelEn: 'Logo at the HAWEE Pavillon main gate', diamond: true, gold: false, silver: false },
      { label: 'Logo xuất hiện trên Trailer của HAWEE Pavillon', labelEn: 'Logo featured in the HAWEE Pavillon trailer', diamond: true, gold: false, silver: false },
      { label: 'Logo trên backdrop khu chụp ảnh', labelEn: 'Logo on the photo-booth backdrop', diamond: true, gold: true, silver: true },
      { label: 'Logo trên landing page HAWEE Pavillon', labelEn: 'Logo on the HAWEE Pavillon landing page', diamond: true, gold: true, silver: true },
      { label: 'Logo trên bộ hình ảnh social (FB, LinkedIn)', labelEn: 'Logo on social media assets (FB, LinkedIn)', diamond: true, gold: true, silver: true },
    ],
  },
  {
    group: '2. Booth & Onsite Presence',
    groupEn: '2. Booth & Onsite Presence',
    rows: [
      { label: 'Booth tại sự kiện', labelEn: 'Booth at the event', diamond: 'x2 booths', gold: 'x2 booths', silver: 'Standard Booth' },
      { label: 'Được đoàn VIP tham quan gian hàng', labelEn: 'Booth visit by VIP delegations', diamond: true, gold: true, silver: true },
      { label: 'Quà / voucher trong túi doorgift HAWEE', labelEn: 'Gift/voucher in the HAWEE doorgift bag', diamond: true, gold: true, silver: true },
      { label: 'Tham gia Panelist tại sân khấu', labelEn: 'Main-stage panelist seat', diamond: true, gold: true, silver: false },
      { label: 'Ưu tiên B2B matching theo nhu cầu', labelEn: 'Priority B2B matching by request', diamond: true, gold: true, silver: true },
    ],
  },
  {
    group: '3. Media & Content',
    groupEn: '3. Media & Content',
    rows: [
      { label: 'Bài truyền thông riêng (fanpage & landing page)', labelEn: 'Dedicated media feature (fan page & landing page)', diamond: '2 bài', gold: '2 bài', silver: '1 bài', diamondEn: '2 posts', goldEn: '2 posts', silverEn: '1 post' },
      { label: 'Được đề cập trong bài truyền thông chung', labelEn: 'Mentioned in general media coverage', diamond: true, gold: true, silver: true },
      { label: 'PR mention / quote đại diện sponsor', labelEn: 'PR mention / sponsor quote', diamond: true, gold: true, silver: false },
      { label: 'Xuất hiện trong video recap', labelEn: 'Featured in the recap video', diamond: 'Nổi bật', gold: true, silver: true, diamondEn: 'Featured' },
      { label: 'Quyền sử dụng hình ảnh sau sự kiện (3 tháng)', labelEn: 'Post-event image usage rights (3 months)', diamond: true, gold: true, silver: true },
    ],
  },
]

export const inKindSponsorships = [
  {
    group: 'Gift Bag Partner',
    groupEn: 'Gift Bag Partner',
    role: 'Sản phẩm, voucher, gift set cho khách tham dự / buyer / VIP',
    roleEn: 'Products, vouchers, or gift sets for attendees / buyers / VIPs',
    reward: 'Logo trên thank-you card trong túi quà; brochure/voucher trong gift bag; tag trong post cảm ơn; xuất hiện trong recap hình ảnh',
    rewardEn: 'Logo on the gift-bag thank-you card; brochure/voucher included in the gift bag; tagged in the thank-you post; featured in the photo recap',
  },
  {
    group: 'Media / PR Partner',
    groupEn: 'Media / PR Partner',
    role: 'Bài PR, media booking, chụp ảnh, quay phim, thiết kế, sản xuất nội dung',
    roleEn: 'PR articles, media booking, photography, videography, design, and content production',
    reward: 'Logo với danh vị "Đối tác truyền thông"; credit trong recap; MC cảm ơn; tag trong bài truyền thông; quyền sử dụng hình ảnh sau sự kiện',
    rewardEn: 'Logo with "Media Partner" credit; recap credit; MC acknowledgment; tagged in media coverage; post-event image usage rights',
  },
  {
    group: 'Production / Operation Partner',
    groupEn: 'Production / Operation Partner',
    role: 'In ấn, POSM, thiết bị, âm thanh ánh sáng, logistics, nhân sự hỗ trợ',
    roleEn: 'Printing, POSM, equipment, sound & lighting, logistics, and support staff',
    reward: 'Logo tại hạng mục hỗ trợ liên quan; MC cảm ơn; post cảm ơn; xuất hiện trong supplier credit / recap hậu trường',
    rewardEn: 'Logo under the relevant support category; MC acknowledgment; thank-you post; featured in supplier credits / behind-the-scenes recap',
  },
]
