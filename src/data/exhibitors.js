// THAM KHẢO SCHEMA — không còn được import/hiển thị (Exhibitors.jsx hiện show trạng thái
// "đang cập nhật" khi Notion chưa có doanh nghiệp Published). Giữ file này lại làm ví dụ
// cấu trúc field {name, logo, industry, description} cho khi cần đối chiếu.
// Đặt file logo vào /public/exhibitors/<ten-file>.png rồi trỏ field `logo` tới đó.
// Để `logo: null` nếu chưa có file — component sẽ tự hiển thị badge chữ cái đầu thay thế.
export const exhibitors = [
  {
    name: 'Dệt May Phương Nam',
    logo: null,
    industry: 'Dệt may – Da giày',
    description: 'Sản xuất & xuất khẩu hàng dệt may chất lượng cao, đã có hoạt động xuất khẩu chính ngạch sang thị trường EU và Nhật Bản.',
  },
  {
    name: 'Thủ Công Mỹ Nghệ Việt',
    logo: null,
    industry: 'Quà tặng thủ công mỹ nghệ',
    description: 'Sản phẩm thủ công mỹ nghệ mang bản sắc Việt, đạt tiêu chí "Xanh" và Bền vững, hướng tới thị trường quốc tế.',
  },
  {
    name: 'Kim Khí An Phát',
    logo: null,
    industry: 'Thiết bị gia dụng – Kim khí',
    description: 'Sản xuất thiết bị gia dụng và dụng cụ cầm tay, đạt giải thưởng Thương hiệu Vàng TP.HCM.',
  },
  {
    name: 'Halal Food Group',
    logo: null,
    industry: 'Thực phẩm Halal',
    description: 'Chuyên sản xuất thực phẩm đạt chuẩn Halal, đã đăng ký nhãn hiệu hàng hoá và bảo hộ sở hữu trí tuệ.',
  },
]
