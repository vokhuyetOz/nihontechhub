import { AppText } from '@elements/AppText/AppText';

import { ComonStyle } from '../comonStyle';

export const StringsVietnamese = {
  Now: 'Now',
  AppIntro_next: 'Next',
  App_name: 'NihonTechHub',
  Error_title: {
    No_data: 'No Data',
  },
  Menu: 'Menu',
  Language: 'Language',
  Mode: 'Chế độ',
  Current_version: 'Phiên bản hiện tại',
  English: 'English',
  Japanese: '日本語',
  Vietnamese: 'Tiếng Việt',
  French: 'French',
  Portuguese: 'português',
  Italiano: 'Italiano',
  Light_mode: 'Chế độ màu sáng',
  Dark_mode: 'Chế độ ban đêm',
  Base_device: 'Dựa theo điện thoại',
  Appintro_des_1: 'Appintro_des_1',
  Appintro_des_2: 'Appintro_des_2',
  Appintro_des_3: 'Appintro_des_3',
  Login: 'Đăng nhập',
  Home: 'Home',
  Settings: 'Setting',
  Phone_is_not_empty: 'Phone is required',
  Phone_max_length: 'Phone is invalid',
  Password_is_not_empty: 'Password is not empty',
  Mobile_phone: 'Mobile number',
  Password: 'Password',
  Forgot_password: 'Forgot password?',
  Dont_have_an_account: "Don't have an account?",
  Sign_up: 'Sign up',
  Remember_account: 'Remember account',
  Create_account: 'Create account',
  Have_an_account: 'Already have an account',
  Gallery: 'Gallery',
  Camera: 'Camera',
  Image: 'Image',
  Next: 'Next',
  Full_name: 'Full name',
  Full_name_is_not_empty: 'Full name is not empty',
  Avatar_is_required: 'Avatar is required',
  Verify_mobile_number: 'Verify\nmobile number',
  Enter_verification_code: 'Enter the verification code sent to you via SMS.',
  Code: 'Code',
  Code_is_empty: 'Code is empty',
  Set_password: 'Set password',
  Register_vehicle_s: 'Register vehicle(s)',
  Card_number: 'Card number',
  Date: 'Date',
  Duration: 'Duration',
  Start_time: 'Start time',
  Required: 'Required',
  Account_created: 'Account created',
  Account_created_success: 'You have successfully created an account.',
  Go_to_home: 'Go to Home',
  Per_hour: '/hour',
  Navigate: 'Navigate',
  Comunity: 'Comunity',
  Navigation_mode: 'Navigation mode',
  Permission_denided: 'Permisson denied',
  Permission_denided_description: 'You need open setting and giant permission',
  Ok: 'Ok',
  Cancel: 'Cancel',
  Gps: 'Gps',
  Gps_description: 'You must enable Gps',
  Map: 'Map',
  Profile: 'Profile',
  Empty_data: 'Chưa có dữ liệu để hiển thị',
  Save: 'Lưu',
  Bookmark: 'Bookmark',
  History: 'History',
  Phone_placeholder: 'Phone_placeholder',
  Permission: 'Permission',
  Camera_permission_denied: 'Camera_permission_denied',
  Setting: 'Setting',
  Error_server: 'Hệ thống đang được bảo trì, vui lòng quay lại sau ít phút.',
  Network_request_fail: 'Network_request_fail',
  Account_deactive: 'Account_deactive',
  Get_started: 'Get started',
  Likes_count: (count: number | string) => `${count} lượt thích`,
  View_count: (count: number | string) => `${count} lượt xem`,
  Chapter_count: (count: number | string) => `${count} Chương`,
  Story_status: (status?: string) => {
    if (status === 'full') {
      return 'Hoàn thành';
    }
    return 'Đang cập nhật';
  },
  View_all_comments: 'Xem tất cả bình luận',
  Add_a_comment: 'Thêm bình luận',
  Related_chapters_of: (name: string, onPressBook: any) => {
    return (
      <>
        Chương liên quan của truyện:{' '}
        <AppText
          onPress={onPressBook}
          style={[
            ComonStyle.bold,
            {
              textDecorationLine: 'underline',
            },
          ]}
        >
          {name}
        </AppText>
      </>
    );
  },
  Book_info: (name: string, chapter?: number) => {
    return `Truyện ${name} - Chương ${chapter}`;
  },
  Chapter_index: (index: number) => {
    return `Chương ${index}`;
  },
  Copy_success: 'Sao chép thành công',
  Input_chapter_index: 'Số chương hoặc tên chương',
  Vip_translation: 'Dịch VIP',
  Font_size: 'Phông chữ',
  Line_height: 'Khoảng cách dòng',
  Letter_spacing: 'Khoảng cách chữ',
  Paragraph_spacing: 'Khoảng cách đoạn',
  Text_color: 'Màu chữ',
  Background_color: 'Màu nền',
  Reading_setting: 'Chỉnh chữ & nền',
  Bold_text: 'Chữ in đậm',
  Book_detail: 'Chi tiết truyện',
  Author: 'Tác giả',
  Read_more: 'Xem thêm',
  Read_less: 'Thu gọn',
  First_chapter: 'Chương đầu',
  Last_chapter: 'Chương cuối',
  All: 'Tất cả',
  Back: 'Quay lại',
  Search_category_placeholder: 'Số thứ tự hoặc tên thể loại',
  Search_book: 'Tìm bằng tên truyện',
  Search_book_title1: 'Tìm Kiếm Tác Phẩm',
  Search_book_title2: 'Yêu Thích Tiếp Theo Của Bạn',
  Search_book_des:
    'Khám phá hàng ngàn câu chuyện lôi cuốn thuộc mọi thể loại. Từ những cuộc phiêu lưu kỳ ảo đến những chuyện tình lãng mạn hãy tìm ra câu chuyện hoàn hảo dành riêng cho bạn ngay hôm nay.',
  Login_with_google: 'Đăng nhập với Google',
  Login_success: 'Đăng nhập thành công',
  Login_failed: 'Đăng nhập không thành công',
  Bookmarked: 'Đã đánh dấu',
  Liked: 'Đã thích',
  Logout: 'Đăng xuất',
  About_us: 'Về NovelHub',
  About_us_description:
    'Novelhub.vn – Nền tảng mạng xã hội chia sẻ truyện, nơi bạn có thể đọc, đăng và tương tác với hàng ngàn câu chuyện thuộc nhiều thể loại. Khám phá truyện trending, theo dõi tác giả yêu thích và kết nối với cộng đồng đam mê sáng tác.',

  Contact_at: (email: string) =>
    `Mọi thông tin xin vui lòng liên hệ:\n${email}`,
  Reset: 'Đặt lại cấu hình',
  Report_success: 'Báo cáo thành công',
  Report: 'Báo cáo',
  Report_des: 'Báo cáo về chương truyện',
  Report_failed: 'Có lỗi xảy ra, vui lòng thử lại sau',
  First_comment: 'Hãy là người bình luận đầu tiên',
  Please_login_to_comment: 'Đăng nhập để bình luận',
  Login_with_apple: 'Đăng nhập bằng Apple',

  Publisher_translator: 'Tác giả/Phiên dịch',
  X_min_read: (x: string | number) => `${x} phút đọc`,
};
