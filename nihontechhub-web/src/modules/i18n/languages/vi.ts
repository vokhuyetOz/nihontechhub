const VI = {
  language: 'Ngôn ngữ',
  login: 'Đăng nhập',
  signup: 'Đăng ký',
  dontHaveAccount: 'Không có tài khoản?',
  somethingWentWrong: 'Có lỗi xảy ra, vui lòng thử lại sau.',
  darkMode: 'Dark Mode',
  lightMode: 'Light Mode',
  xMinRead: (x: string | number) => `${x} phút đọc`,
  featuredStory: 'Tin nổi bật',
  trendingNow: 'Trending',
  recentPost: 'Tin gần đây',
  viewAll: 'Xem tất cả',
  newsletter: 'Newsletter',
  footerDes: 'Your trusted source for the latest technology news, insights, and trends. Stay informed with our comprehensive coverage of the tech world.',
  footerSub: 'Subscribe to get the latest tech news delivered to your inbox.',
  GoToSite: 'Go to site',
  searchArticles: 'Search articles...',
  smartNewsSynthesis: 'Smart News Synthesis',
  smartNewsSynthesisDesc:
    'Dịch vụ này không chỉ thu thập tin tức mà còn tích hợp nhiều tin tức liên quan từ nhiều nguồn khác nhau, tạo ra tóm tắt sự kiện chi tiết và chính xác. Mỗi mục trong timeline đều đại diện cho một sự kiện quan trọng, được xác nhận từ nhiều nguồn tin đáng tin cậy.',
  readMore: 'Xem thêm',
  showLess: 'Thu gọn',
  xImpact: (x: string) => {
    const impact = x.toLowerCase();
    if (impact === 'low') {
      return 'Ảnh hưởng thấp';
    }
    if (impact === 'medium') {
      return 'Ảnh hưởng trung bình';
    }
    if (impact === 'high') {
      return 'Ảnh hưởng cao';
    }
    if (impact === 'critical') {
      return 'Ảnh hưởng nghiêm trọng';
    }

    return `Ảnh hưởng ${x}`;
  },
  AIAggregatedTechTimeline: 'Sự kiện công nghệ được AI tổng hợp',
  viewAllEvents: 'Xem tất cả sự kiện',
  AISynthesized: 'AI tổng hợp',
  AIAggregatedFrom: 'Tổng hợp từ',
  AIPoweredIntelligence: 'Trí tuệ nhân tạo',
  AIPoweredIntelligenceDesc:
    'AI này không chỉ thu thập tin tức mà còn tích hợp nhiều tin tức liên quan từ nhiều nguồn khác nhau, tạo ra tóm tắt sự kiện chi tiết và chính xác. Mỗi mục trong timeline đều đại diện cho một sự kiện quan trọng, được xác nhận từ nhiều nguồn tin đáng tin cậy.',
  AICurated: 'AI Chọn Lọc',
  xArticles: (x: string | number) => `AI trích xuất từ ${x} bài viết`,
  highlightType: {
    affairs: 'Affairs',
    products: 'Products',
    innovation: 'Innovation',
  },
  loadMore: 'Tải thêm',
  loading: 'Đang tải',
  viewAllAIHighlights: 'Xem tất cả tin tổng hợp nổi bật',
  privacyPolicy: 'Chính sách bảo mật',
  terms: 'Điều khoản sử dụng',
  contactUs: 'Liên hệ',
  popularTags: 'Tags phổ biến',
  categories: 'Thể loại',
  appInstallBanner: 'Kiểm tra tin tức công nghệ mới nhất từ mọi nơi! Nhận thông báo tức thời, tin tức cá nhân hóa với ứng dụng của chúng tôi.',
  downloadApp: 'Tải ứng dụng',
  realTimeUpdates: 'Cập nhật tức thời',
  personalizedNewsFeeds: 'Tin tức cá nhân hóa',
  pushNotifications: 'Thông báo đẩy',
  downloadAppOnGooglePlay: 'Tải ứng dụng trên Google Play',
  free: 'Miễn phí',
  downloadAppOnAppStore: 'Tải ứng dụng trên App Store',
};

export default VI;
