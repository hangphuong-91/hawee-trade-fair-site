// Danh sách doanh nghiệp tham gia HAWEE International Trade Fair 2026
// Nguồn: tài-liệu/gian-hang-list.xlsx (đồng bộ 19/8/2026)
// Sắp xếp: Khu A trước, Khu B sau, theo số gian hàng tăng dần, doanh nghiệp chưa có mã gian hàng
// xếp cuối (booth: null → Exhibitors.jsx tự hiển thị "Đang cập nhật"). Không phân biệt doanh nghiệp
// có/không có logo, mọi gian hàng hiển thị đồng nhất (tên + lĩnh vực + sản phẩm trưng bày).
//
// Doanh nghiệp không có sẵn "Lĩnh vực hoạt động" trong file nguồn đã được phân loại dựa trên
// sản phẩm trưng bày (hoặc tên doanh nghiệp khi không có mô tả sản phẩm), theo đúng 5 nhóm ngành
// dùng trong RegisterForm.jsx. 2 trường hợp không có đủ thông tin để phân loại chắc chắn (Duy Đức
// Hưng, Thanh Hà) tạm để "Khác" — cần xác minh thêm khi có dữ liệu.
//
// Đã xác nhận (19/8/2026): Vilaco = B-135, Không Gian Gốm Bát Tràng = A-137 — file nguồn trước đó
// ghi trùng cả hai vào B-135, đã sửa theo xác nhận thực tế.
export const exhibitors = [
  {
    name: 'Công ty Cổ Phần Hà Mỵ',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Hạt điều cà phê trà',
    booth: 'A-81',
  },
  {
    name: 'Công ty Cổ Phần Bánh Mứt Kẹo Bảo Minh - HN',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Sản phẩm, kinh doanh bánh mứt kẹo truyền thống, hiện đại (bánh cốm, bánh phu thê, xu xê, bánh chả, bánh pía...)',
    booth: 'A-82',
  },
  {
    name: 'Công ty Cổ Phần XNK Kỷ Nguyên Xanh',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Vật liệu mới từ phế phẩm nông nghiệp dùng trong ngành may mặc: quần áo, túi xách, khăn, tất, quà tặng handmade',
    booth: 'A-99',
  },
  {
    name: 'Hiệp Hội Dệt May Thời Trang TP.HCM (AGTEK)',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Quần áo',
    booth: 'A-104',
  },
  {
    name: 'Công ty Cổ Phần Thương Mại Nhà Bè',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Sản phẩm quần áo sơ mi, veston, jacket, bảo hộ lao động',
    booth: 'A-105',
  },
  {
    name: 'Công ty Cổ Phần Mỹ Thuật Gia Long',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Quà tặng (foodgift)',
    booth: 'A-108',
  },
  {
    name: 'Công ty Cổ Phần BluSaigon',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Bút ngọc trai, trang sức, tặng phẩm khảm',
    booth: 'A-109',
  },
  {
    name: 'Công ty TNHH Liosa Glow Hub',
    industry: 'Khác',
    products: 'Sản phẩm chăm sóc da',
    booth: 'A-110',
  },
  {
    name: 'Công ty Cổ Phần Nhà Máy Thiết Bị Y Học và Vật Liệu Sinh Học (MEDEP)',
    industry: 'Khác',
    products: 'Thuỷ tinh thể nhân tạo, dịch nhầy phẫu thuật nhãn khoa, bộ dụng cụ đặt thuỷ tinh thể nhân tạo',
    booth: 'A-111',
  },
  {
    name: 'Công ty Cổ Phần Cơ Khí Eurorack',
    industry: 'Dịch vụ hỗ trợ xuất khẩu (Logistics, bảo hiểm, tài chính)',
    products: 'Kệ chứa hàng',
    booth: 'A-114',
  },
  {
    name: 'Công ty TNHH XNK May Mặc Quế Lâm',
    industry: 'Khác',
    products: 'Thời trang mặc nhà Quế Lâm',
    booth: 'A-117',
  },
  {
    name: 'Công ty Fujiwa Vietnam',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Nước ion kiềm Fujiwa, Hydrogen, các sản phẩm chăm sóc sức khoẻ',
    booth: 'A-120',
  },
  {
    name: 'Công ty Công Nghệ và Đào Tạo Tuệ Anh',
    industry: 'Dịch vụ hỗ trợ xuất khẩu (Logistics, bảo hiểm, tài chính)',
    products: 'Phần mềm kết nối doanh nghiệp, giải pháp ERP',
    booth: 'A-121',
  },
  {
    name: 'Công ty TNHH Karl Gross Logistics Việt Nam',
    industry: 'Dịch vụ hỗ trợ xuất khẩu (Logistics, bảo hiểm, tài chính)',
    products: 'Dịch vụ logistics',
    booth: 'A-122',
  },
  {
    name: 'Công ty Cổ Phần L&A',
    industry: 'Khác',
    products: 'Dịch vụ HR Tech',
    booth: 'A-123',
  },
  {
    name: 'Công ty TNHH Thương Mại Trung Minh Thành',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Trái cây sấy dẻo, bánh thuyền và hạt dinh dưỡng, rong biển kẹp hạt và snacks dinh dưỡng',
    booth: 'A-124',
  },
  {
    name: 'Công ty TNHH Thương Mại và Sản Xuất Trà Cát Nghi',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Trà',
    booth: 'A-127',
  },
  {
    name: 'Công ty Cổ Phần Quốc Tế Hoa Doanh',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Thực phẩm đông lạnh chế biến',
    booth: 'A-130',
  },
  {
    name: 'Công ty TNHH Quốc Tế Annasea',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Thuỷ hải sản: cá hồi, cá ngừ đại dương, tôm...',
    booth: 'A-133',
  },
  {
    name: 'Công ty Cổ Phần Không Gian Gốm Bát Tràng',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Gốm sứ thủ công mỹ nghệ',
    booth: 'A-137',
  },
  {
    name: 'Công ty Cổ Phần Thương Mại Khải Hoàn',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Nước mắm truyền thống',
    booth: 'A-139',
  },
  {
    name: 'Công ty TNHH OCoop',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Các sản phẩm OCOP An Giang',
    booth: 'A-140',
  },
  {
    name: 'Hộ Kinh Doanh Tân Phú Hưng',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Sản phẩm thủ công mỹ nghệ từ cỏ bàng',
    booth: 'A-141',
  },
  {
    name: 'Công ty TNHH Sản Xuất Thương Mại Tiến Anh',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Bánh hạnh nhân',
    booth: 'A-142',
  },
  {
    name: 'Công ty Cổ Phần Ngọc Trai Quốc An',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Ngọc trai và trang sức ngọc trai',
    booth: 'A-143',
  },
  {
    name: 'Công ty TNHH Trà & Cà Phê Lâm Chấn Âu',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Cà phê bột, cà phê hạt, cà phê phin giấy, trà xanh, trà sen, trà hoa lài',
    booth: 'A-144',
  },
  {
    name: 'Công ty TNHH LYND Việt Nam',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Bột tàu hũ kim sa, dầu oliu, đùi heo muối Iberico, saffron, nấm hương sấy giòn',
    booth: 'B-83',
  },
  {
    name: 'Công ty Cổ Phần Bánh Mứt Kẹo Bảo Minh - SG',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Sản phẩm, kinh doanh bánh mứt kẹo truyền thống, hiện đại (bánh cốm, bánh phu thê, xu xê, bánh chả, bánh pía...)',
    booth: 'B-84',
  },
  {
    name: 'Công ty Quảng Cáo Mỹ Trinh Vân (MTV)',
    industry: 'Thiết bị Công nghệ, Đóng gói, Bao bì, Nhãn mác, In ấn',
    products: '',
    booth: 'B-86',
  },
  {
    name: 'Công ty Cổ Phần Công Nghệ và Truyền Thông TMC',
    industry: 'Khác',
    products: 'Phần mềm hỗ trợ quản lý sản xuất',
    booth: 'B-87',
  },
  {
    name: 'Công ty TNHH SXTM In Minh Mẫn',
    industry: 'Thiết bị Công nghệ, Đóng gói, Bao bì, Nhãn mác, In ấn',
    products: 'Tem nhãn in các loại',
    booth: 'B-88',
  },
  {
    name: 'Công ty Cổ Phần Hạt Rừng',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Cà phê đặc sản',
    booth: 'B-90',
  },
  {
    name: 'Công ty Cổ Phần Công Nghệ Thực Phẩm Sáng Tạo',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Sản phẩm thuần thực vật (plant-based) chế biến từ trái mít non',
    booth: 'B-92',
  },
  {
    name: 'Công ty TNHH Sensorial',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Trang phục công sở, dạo phố, cocktail, dạ tiệc',
    booth: 'B-103',
  },
  {
    name: 'Công ty Cổ Phần Thương Mại Xuất Nhập Khẩu Gia Anh',
    industry: 'Thiết bị Công nghệ, Đóng gói, Bao bì, Nhãn mác, In ấn',
    products: 'Đồ chơi trẻ em',
    booth: 'B-107',
  },
  {
    name: 'Công ty TNHH Sản Xuất & Xây Dựng AP',
    industry: 'Khác',
    products: 'Kết cấu thép',
    booth: 'B-112',
  },
  {
    name: 'Công ty TNHH SX TM Hai Tư Giờ',
    industry: 'Dịch vụ hỗ trợ xuất khẩu (Logistics, bảo hiểm, tài chính)',
    products: 'Kệ chứa hàng',
    booth: 'B-113',
  },
  {
    name: 'Công ty CP Kiến Tạo Sức Khỏe Vina',
    industry: 'Khác',
    products: 'Dưỡng lão cao cấp, trú đông quốc tế, du lịch trị liệu, nghỉ dưỡng y tế đẳng cấp',
    booth: 'B-116',
  },
  {
    name: 'Công ty TNHH TM Galaxy Water Solutions',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Máy lọc nước',
    booth: 'B-118',
  },
  {
    name: 'Công ty Cổ Phần Ecoal Việt Nam',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Sản phẩm lõi than carbon hoạt tính',
    booth: 'B-119',
  },
  {
    name: 'Công ty Bảo Việt An Phú',
    industry: 'Dịch vụ hỗ trợ xuất khẩu (Logistics, bảo hiểm, tài chính)',
    products: 'Bảo hiểm phi nhân thọ: hàng hoá xuất nhập khẩu & bảo hiểm tín dụng thương mại',
    booth: 'B-125',
  },
  {
    name: 'Công ty TNHH Giải Pháp IWE',
    industry: 'Dịch vụ hỗ trợ xuất khẩu (Logistics, bảo hiểm, tài chính)',
    products: 'Phần mềm hành vi ESG, tư vấn ESG',
    booth: 'B-126',
  },
  {
    name: 'Trà Cát Nghi',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Trà',
    booth: 'B-128',
  },
  {
    name: 'Công ty Cổ Phần Thực Phẩm Thuận Tường',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Thực phẩm đông lạnh: thuỷ hải sản, heo, bò, gà',
    booth: 'B-129',
  },
  {
    name: 'Công ty Cổ Phần Đầu Tư Quốc Tế HD Food',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Bánh nậm, bánh lọc, các loại bánh quê',
    booth: 'B-131',
  },
  {
    name: 'Công ty Gốm Sứ Sáng Tạo Việt Nam',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Sản phẩm gốm sứ thủ công Việt Nam',
    booth: 'B-134',
  },
  {
    name: 'Công Ty Cổ Phần Vilaco',
    industry: 'Khác',
    products: 'Bột giặt, nước giặt, nước rửa chén, nước lau sàn, nước xả vải và các sản phẩm tẩy rửa gia dụng (thương hiệu LORD GOLD)',
    booth: 'B-135',
  },
  {
    name: 'Công Ty TNHH Duy Đức Hưng',
    industry: 'Khác',
    products: '',
    booth: null,
  },
  {
    name: 'Công Ty TNHH Thức Ăn Gia Súc Lái Thiêu',
    industry: 'Khác',
    products: 'Thức ăn chức năng cho cá Koi, giải pháp dinh dưỡng cho heo con và năng lực OEM xuất khẩu',
    booth: null,
  },
  {
    name: 'Công ty TNHH Demisa',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Tàu hũ tươi fresh, bột tàu hũ',
    booth: null,
  },
  {
    name: 'Công ty TNHH MTV Sản Xuất Thương Mại Dịch Vụ Thanh Hà',
    industry: 'Khác',
    products: '',
    booth: null,
  },
  {
    name: 'Công ty Mây Tre Lá Thành Lộc',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: '',
    booth: null,
  },
  {
    name: 'Homemade Mommy',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Các sản phẩm do các mẹ tự tay làm, từ khâu chọn nguyên liệu đến chế biến',
    booth: null,
  },
  {
    name: 'Ngân hàng UOB Việt Nam',
    industry: 'Dịch vụ hỗ trợ xuất khẩu (Logistics, bảo hiểm, tài chính)',
    products: 'Sản phẩm tài chính cá nhân & doanh nghiệp',
    booth: null,
  },
]
