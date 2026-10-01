// Danh sách doanh nghiệp tham gia HAWEE International Trade Fair 2026
// Nguồn gốc: tài-liệu/gian-hang-list.xlsx (đồng bộ 19/8/2026)
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
//
// [2026-09-30] Đồng bộ lại MÃ GIAN cho khu A theo DanhSach_GianHang_HAWE_Pavillon_3009.xlsx (bản
// sơ đồ v3, thay toàn bộ mã gian khu A cũ — không liên quan gì tới mã B-xx trước đó, đây là một đợt
// đánh số lại hoàn toàn). Chỉ cập nhật mã gian cho các doanh nghiệp khớp được tên với sheet mới;
// 5 doanh nghiệp khu B không xuất hiện trong sheet mới (Kỷ Nguyên Xanh, L&A, Gia Anh, Kiến Tạo Sức
// Khỏe Vina, Galaxy Water Solutions) và "Mây Tre Lá Thành Lộc" (chưa chắc có phải "Mây tre lá LTL"
// trong sheet mới không) giữ nguyên, cần chị xác nhận thêm. Sheet mới còn ~13 doanh nghiệp hoàn
// toàn mới chưa có trong danh sách này (vd. Promac, Peroma, Thái Hòa Cosmetics, Nesso, Vinex, Kim
// Minh, GOE Alliances...) — nên thêm trực tiếp vào Notion "HAWEE Trade Fair Exhibitors DB" (nguồn
// hiển thị chính của site) thay vì ở đây, vì thiếu dữ liệu "Lĩnh vực hoạt động"/"Sản phẩm trưng bày"
// để điền đúng vào file fallback này.
export const exhibitors = [
  {
    name: 'Công ty Cổ Phần Hà Mỵ',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Hạt điều cà phê trà',
    booth: 'A-159',
  },
  {
    name: 'Công ty Cổ Phần Bánh Mứt Kẹo Bảo Minh - HN',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Sản phẩm, kinh doanh bánh mứt kẹo truyền thống, hiện đại (bánh cốm, bánh phu thê, xu xê, bánh chả, bánh pía...)',
    booth: 'A-142',
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
    booth: 'A-128',
  },
  {
    name: 'Công ty Cổ Phần Thương Mại Nhà Bè',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Sản phẩm quần áo sơ mi, veston, jacket, bảo hộ lao động',
    booth: 'A-129',
  },
  {
    name: 'Công ty Cổ Phần Mỹ Thuật Gia Long',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Quà tặng (foodgift)',
    booth: 'A-140',
  },
  {
    name: 'Công ty Cổ Phần BluSaigon',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Bút ngọc trai, trang sức, tặng phẩm khảm',
    booth: 'A-149',
  },
  {
    name: 'Công ty TNHH Liosa Glow Hub',
    industry: 'Khác',
    products: 'Sản phẩm chăm sóc da',
    booth: 'A-150',
  },
  {
    name: 'Công ty Cổ Phần Nhà Máy Thiết Bị Y Học và Vật Liệu Sinh Học (MEDEP)',
    industry: 'Khác',
    products: 'Thuỷ tinh thể nhân tạo, dịch nhầy phẫu thuật nhãn khoa, bộ dụng cụ đặt thuỷ tinh thể nhân tạo',
    booth: 'A-151',
  },
  {
    name: 'Công ty Cổ Phần Cơ Khí Eurorack',
    industry: 'Dịch vụ hỗ trợ xuất khẩu (Logistics, bảo hiểm, tài chính)',
    products: 'Kệ chứa hàng',
    booth: 'A-162',
  },
  {
    name: 'Công ty TNHH XNK May Mặc Quế Lâm',
    industry: 'Khác',
    products: 'Thời trang mặc nhà Quế Lâm',
    booth: 'A-173',
  },
  {
    name: 'Công ty Fujiwa Vietnam',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Nước ion kiềm Fujiwa, Hydrogen, các sản phẩm chăm sóc sức khoẻ',
    booth: 'A-184',
  },
  {
    name: 'Công ty Công Nghệ và Đào Tạo Tuệ Anh',
    industry: 'Dịch vụ hỗ trợ xuất khẩu (Logistics, bảo hiểm, tài chính)',
    products: 'Phần mềm kết nối doanh nghiệp, giải pháp ERP',
    booth: 'A-109',
  },
  {
    name: 'Công ty TNHH Karl Gross Logistics Việt Nam',
    industry: 'Dịch vụ hỗ trợ xuất khẩu (Logistics, bảo hiểm, tài chính)',
    products: 'Dịch vụ logistics',
    booth: 'A-110',
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
    booth: 'A-119',
  },
  {
    name: 'Công ty TNHH Thương Mại và Sản Xuất Trà Cát Nghi',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Trà',
    booth: 'A-133',
  },
  {
    name: 'Công ty Cổ Phần Quốc Tế Hoa Doanh',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Thực phẩm đông lạnh chế biến',
    booth: 'A-144',
  },
  {
    name: 'Công ty TNHH Quốc Tế Annasea',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Thuỷ hải sản: cá hồi, cá ngừ đại dương, tôm...',
    booth: 'A-155',
  },
  {
    name: 'Công ty Cổ Phần Không Gian Gốm Bát Tràng',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Gốm sứ thủ công mỹ nghệ',
    booth: 'A-164',
  },
  {
    name: 'Công ty Cổ Phần Thương Mại Khải Hoàn',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Nước mắm truyền thống',
    booth: 'A-174',
  },
  {
    name: 'Công ty TNHH OCoop',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Các sản phẩm OCOP An Giang',
    booth: 'A-175',
  },
  {
    name: 'Hộ Kinh Doanh Tân Phú Hưng',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Sản phẩm thủ công mỹ nghệ từ cỏ bàng',
    booth: 'A-186',
  },
  {
    name: 'Công ty TNHH Sản Xuất Thương Mại Tiến Anh',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Bánh hạnh nhân',
    booth: 'A-185',
  },
  {
    name: 'Công ty Cổ Phần Ngọc Trai Quốc An',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Ngọc trai và trang sức ngọc trai',
    booth: 'A-187',
  },
  {
    name: 'Công ty TNHH Trà & Cà Phê Lâm Chấn Âu',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Cà phê bột, cà phê hạt, cà phê phin giấy, trà xanh, trà sen, trà hoa lài',
    booth: 'A-188',
  },
  {
    name: 'Công ty TNHH LYND Việt Nam',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Bột tàu hũ kim sa, dầu oliu, đùi heo muối Iberico, saffron, nấm hương sấy giòn',
    booth: 'A-148',
  },
  {
    name: 'Công ty Cổ Phần Bánh Mứt Kẹo Bảo Minh - SG',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Sản phẩm, kinh doanh bánh mứt kẹo truyền thống, hiện đại (bánh cốm, bánh phu thê, xu xê, bánh chả, bánh pía...)',
    booth: 'A-141',
  },
  {
    name: 'Công ty Quảng Cáo Mỹ Trinh Vân (MTV)',
    industry: 'Thiết bị Công nghệ, Đóng gói, Bao bì, Nhãn mác, In ấn',
    products: '',
    booth: 'A-12',
  },
  {
    name: 'Công ty Cổ Phần Công Nghệ và Truyền Thông TMC',
    industry: 'Khác',
    products: 'Phần mềm hỗ trợ quản lý sản xuất',
    booth: 'A-137',
  },
  {
    name: 'Công ty TNHH SXTM In Minh Mẫn',
    industry: 'Thiết bị Công nghệ, Đóng gói, Bao bì, Nhãn mác, In ấn',
    products: 'Tem nhãn in các loại',
    booth: 'A-138',
  },
  {
    name: 'Công ty Cổ Phần Hạt Rừng',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Cà phê đặc sản',
    booth: 'A-170',
  },
  {
    name: 'Công ty Cổ Phần Công Nghệ Thực Phẩm Sáng Tạo',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Sản phẩm thuần thực vật (plant-based) chế biến từ trái mít non',
    booth: 'A-171',
  },
  {
    name: 'Công ty TNHH Sensorial',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Trang phục công sở, dạo phố, cocktail, dạ tiệc',
    booth: 'A-126',
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
    booth: 'A-160',
  },
  {
    name: 'Công ty TNHH SX TM Hai Tư Giờ',
    industry: 'Dịch vụ hỗ trợ xuất khẩu (Logistics, bảo hiểm, tài chính)',
    products: 'Kệ chứa hàng',
    booth: 'A-161',
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
    booth: 'A-183',
  },
  {
    name: 'Công ty Bảo Việt An Phú',
    industry: 'Dịch vụ hỗ trợ xuất khẩu (Logistics, bảo hiểm, tài chính)',
    products: 'Bảo hiểm phi nhân thọ: hàng hoá xuất nhập khẩu & bảo hiểm tín dụng thương mại',
    booth: 'A-120',
  },
  {
    name: 'Công ty TNHH Giải Pháp IWE',
    industry: 'Dịch vụ hỗ trợ xuất khẩu (Logistics, bảo hiểm, tài chính)',
    products: 'Phần mềm hành vi ESG, tư vấn ESG',
    booth: 'A-172',
  },
  {
    name: 'Trà Cát Nghi',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Trà',
    booth: 'A-132',
  },
  {
    name: 'Công ty Cổ Phần Thực Phẩm Thuận Tường',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Thực phẩm đông lạnh: thuỷ hải sản, heo, bò, gà',
    booth: 'A-131',
  },
  {
    name: 'Công ty Cổ Phần Đầu Tư Quốc Tế HD Food',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Bánh nậm, bánh lọc, các loại bánh quê',
    booth: 'A-143',
  },
  {
    name: 'Công ty Gốm Sứ Sáng Tạo Việt Nam',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Sản phẩm gốm sứ thủ công Việt Nam',
    booth: 'A-166',
  },
  {
    name: 'Công Ty Cổ Phần Vilaco',
    industry: 'Khác',
    products: 'Bột giặt, nước giặt, nước rửa chén, nước lau sàn, nước xả vải và các sản phẩm tẩy rửa gia dụng (thương hiệu LORD GOLD)',
    booth: 'A-153',
  },
  {
    name: 'Công Ty TNHH Duy Đức Hưng',
    industry: 'Khác',
    products: '',
    booth: 'A-152',
  },
  {
    name: 'Công Ty TNHH Thức Ăn Gia Súc Lái Thiêu',
    industry: 'Khác',
    products: 'Thức ăn chức năng cho cá Koi, giải pháp dinh dưỡng cho heo con và năng lực OEM xuất khẩu',
    booth: 'A-118',
  },
  {
    name: 'Công ty TNHH Demisa',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: 'Tàu hũ tươi fresh, bột tàu hũ',
    booth: 'A-107',
  },
  {
    name: 'Công ty TNHH MTV Sản Xuất Thương Mại Dịch Vụ Thanh Hà',
    industry: 'Khác',
    products: '',
    booth: 'A-106',
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
    booth: 'A-13',
  },

  // [2026-10-01] Bổ sung từ DanhSach_GianHang_HAWE_Pavillon_3009.xlsx — các doanh nghiệp xuất hiện
  // trong sơ đồ gian hàng mới (khu A, bản 30/9) nhưng chưa có trong danh sách trên. File nguồn chỉ
  // có Tên + Mã gian, không có "Lĩnh vực hoạt động"/"Sản phẩm trưng bày" → những trường hợp không
  // suy luận chắc chắn được từ tên để trống (industry: 'Khác', products: '') thay vì tự bịa, giống
  // quy ước đã dùng cho các doanh nghiệp thiếu dữ liệu khác trong file này (vd. Thanh Hà, Duy Đức
  // Hưng). Promac/Peroma/Thái Hòa Cosmetics/Mây Tre Lá LTL có mô tả thật lấy từ Canva "Trade
  // Fair_IVN Supplier Directory" (DAHS4gLddZQ) đã xác nhận cùng tên doanh nghiệp + mã gian.
  // "Mây Tre Lá LTL" để riêng, KHÔNG gộp với "Công ty Mây Tre Lá Thành Lộc" phía trên vì chưa xác
  // nhận được có phải cùng một doanh nghiệp hay không.
  {
    name: 'Công ty Cổ Phần Nesso',
    industry: 'Khác',
    products: '',
    booth: 'A-130',
  },
  {
    name: 'Công ty Cổ Phần Xuất Nhập Khẩu và Thương Mại Vinex',
    industry: 'Khác',
    products: '',
    booth: 'A-108',
  },
  {
    name: 'Công ty Kim Minh',
    industry: 'Khác',
    products: '',
    booth: 'A-139',
  },
  {
    name: 'Công ty TNHH Kỹ Thuật In Promac',
    industry: 'Thiết bị Công nghệ, Đóng gói, Bao bì, Nhãn mác, In ấn',
    products: 'Thẻ cào bảo mật, voucher, in dữ liệu biến đổi (variable data), tem nhãn theo yêu cầu cho chiến dịch khuyến mãi',
    booth: 'A-163',
  },
  {
    name: 'Công ty TNHH Peroma Việt Nam',
    industry: 'Khác',
    products: 'Nguyên liệu tự nhiên, hương liệu thực phẩm, hương liệu mỹ phẩm, gia công mỹ phẩm OEM/ODM',
    booth: 'A-14',
  },
  {
    name: 'Công ty TNHH SX TM DV XNK RB Industrial Factory',
    industry: 'Khác',
    products: '',
    booth: 'A-182',
  },
  {
    name: 'Công ty TNHH SX-TM-DV Mỹ Phẩm Thái Hòa',
    industry: 'Khác',
    products: 'Phân phối mỹ phẩm Rootoo, tinh dầu thảo dược Thái Hòa',
    booth: 'A-15',
  },
  {
    name: 'Công ty TNHH Thương Mại - Dịch Vụ Việt Cường Nhân',
    industry: 'Khác',
    products: '',
    booth: 'A-181',
  },
  {
    name: 'Công ty TNHH Thực Phẩm Song Phương',
    industry: 'Nông sản, Lương thực, Thực phẩm',
    products: '',
    booth: 'A-154',
  },
  {
    name: 'Công ty TNHH TM Vinatrade',
    industry: 'Khác',
    products: '',
    booth: 'A-127',
  },
  {
    name: 'GOE Alliances',
    industry: 'Khác',
    products: '',
    booth: 'A-176, A-177',
  },
  {
    name: 'HKD Gốm Sứ Bát Tràng',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: '',
    booth: 'A-165',
  },
  {
    name: 'Mây Tre Lá LTL',
    industry: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    products: 'Sản phẩm thủ công từ mây, tre và lục bình: giỏ, khay, túi xách, đồ trang trí nội thất, thiết kế theo yêu cầu xuất khẩu',
    booth: 'A-117',
  },
]
