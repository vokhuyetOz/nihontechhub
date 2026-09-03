import { AppText } from '@elements/AppText';
import { ComonStyle } from '../comonStyle';

export const StringsEnglish = {
  Now: 'Now',
  AppIntro_next: 'Next',
  App_name: 'NihonTechHub',
  Error_title: {
    No_data: 'No Data',
  },
  Menu: 'Menu',
  Language: 'Language',
  Mode: 'Appearance',
  Current_version: 'Current version',
  English: 'English',
  Japanese: 'Japanese',
  Vietnamese: 'Vietnamese',
  French: 'French',
  Portuguese: 'Portuguese',
  Italiano: 'Italian',
  Light_mode: 'Light mode',
  Dark_mode: 'Dark mode',
  Base_device: 'System mode',
  Appintro_des_1: 'Appintro_des_1',
  Appintro_des_2: 'Appintro_des_2',
  Appintro_des_3: 'Appintro_des_3',
  Login: 'Login',
  Home: 'Home',
  Settings: 'Settings',
  Phone_is_not_empty: 'Phone is required',
  Phone_max_length: 'Invalid phone number',
  Password_is_not_empty: 'Password is required',
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
  Full_name_is_not_empty: 'Full name is required',
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
  Permission_denided: 'Permission denied',
  Permission_denided_description:
    'Please enable the required permissions in Settings.',
  Ok: 'Ok',
  Cancel: 'Cancel',
  Profile: 'Profile',
  Empty_data: 'Empty data',
  Save: 'Save',
  Bookmark: 'Bookmark',
  History: 'History',
  Phone_placeholder: 'Phone_placeholder',
  Permission: 'Permission',
  File_permission_denied:
    'File permission was denied.\nPlease enable file permission in Settings.',
  Setting: 'Setting',
  Error_server:
    '🚧 We are upgrading the system to improve your experience.\nThe service is temporarily unavailable.\nPlease try again shortly. 💙',
  Network_request_fail: 'Network request failed',
  Account_deactive: 'Account deactivated',
  Get_started: 'Get started',
  Publisher_translator: 'Publisher/Translator',
  X_min_read: (x: string | number) => `Readable in ${x} min`,
  Back: 'Back',
  Related_news: 'Related news',
  About_us: 'About us',
  News: 'News',
  AICurated: 'AI Curated',
  AI_Trend: 'AI Trend',
  Read_more: 'Read more',
  Show_less: 'Show less',

  highlightType: {
    affairs: 'Affairs',
    products: 'Products',
    innovation: 'Innovation',
  },
  X_articles: (x: string | number) => `AI summarized ${x} articles`,
  AIPoweredIntelligence: 'AI-powered Intelligence',
  AIPoweredIntelligenceDesc:
    'Our AI not only gathers news but also intelligently integrates related articles to create comprehensive event summaries.\nEach timeline item is verified across multiple trusted sources to deliver only the most important events.',
  smartNewsSynthesis: 'Smart AI News Synthesis',
  smartNewsSynthesisDesc:
    'Our AI collects and integrates related information to create easy-to-understand event summaries.\nEach timeline is cross-checked against trusted sources to deliver only key events.',
  xImpact: (x: string) => {
    const impact = x.toLowerCase();
    if (impact === 'low') return 'Low impact';
    if (impact === 'medium') return 'Medium impact';
    if (impact === 'high') return 'High impact';
    if (impact === 'critical') return 'Critical impact';
    return `Impact: ${x}`;
  },

  AISynthesized: 'AI Summary',
  AIAggregatedFrom: 'AI Aggregated',
  About_us_description:
    'We collect and integrate multiple related sources to provide clear event summaries.\nOur timeline verifies information across trusted sources and focuses only on essential events.',
  Contact_at: (email: string) => `Email: ${email}`,
  Search: 'Search',
  Search_empty_title: 'No results found',
  Search_empty_description: 'Try another keyword and search again.',
  Logout: 'Logout',
  Latest_news: 'Latest',
  Most_viewed_news: 'Most viewed',
  Keyword: 'Keyword',
  Search_placeholder: 'Search news',
  X_view: (x: string | number) => `${x} views`,
  AboutUsTitle: 'A product by FresCo',
  For_you: 'For you',
  Extension: 'Software',
  Retry: 'Retry',

  GDDownloader_title: 'Google Drive Restricted File Downloader',
  GDDownloader_desc:
    'A tool that lets you download restricted PDF, DOC files.\nEven when the “Download” button is disabled, you can still save the file safely as a PDF.',
  GDDowloader_placeholder: 'https://drive.google.com/file/d/xxxxxx/preview',
  GDDowloader_explain: (
    <AppText>
      1. Enter the link in this format:{' '}
      <AppText style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>
        https://drive.google.com/file/d/xxxxxx/preview
      </AppText>
      {'\n'}
      2. Press “Create PDF”.
    </AppText>
  ),
  Create_PDF: 'Create PDF',
  Extension_status: {
    init: 'Initial state',
    scrolling: 'The system is loading data from the URL.\nPlease wait.',
    loading_url: 'The system is loading data from the URL.\nPlease wait.',
    creating_pdf:
      'The system is generating a PDF from the data.\nThis may take a few seconds.',
    done: 'Completed. The PDF file has been saved to memory.\nIf pages are missing, press “Create PDF” again to re-download.',
    error: 'Failed to load.\nCheck your connection and press “Create PDF”.',
  },
  Extension_explain: (
    <AppText>
      <AppText style={ComonStyle.bold}>
        Introduction to PDF Google Drive Downloader{'\n'}
      </AppText>
      This tool allows you to download restricted PDF and DOC files from Google
      Drive easily.{'\n'}
      When Google Drive prevents direct download due to settings or
      restrictions, this tool lets you save files to your computer or smartphone
      conveniently.
      {'\n\n'}
      <AppText style={ComonStyle.bold}>Main Features{'\n'}</AppText>* Download
      restricted PDF/DOC files even without a Download button{'\n'}* Supports
      .doc, .docx, and Excel files (output format is PDF){'\n'}* Download
      quality: retains original file quality and size
      {'\n\n'}
      <AppText style={ComonStyle.bold}>How to Use{'\n'}</AppText>
      1. Enter the Google Drive URL of the PDF/DOC/Excel file you want to
      download {'\n'}
      2. Press “Create PDF” {'\n'}
      3. A PDF will be generated and saved in original quality
    </AppText>
  ),

  View: 'View',
  Share: 'Share',
  File_info: (name: string, page: number) =>
    `The PDF file "${name}" has been saved to memory (Pages: ${page})`,
  IOS_share_explain:
    'To save the file on your device, tap "Share" and select "Save to Files".',
  Url_is_required: 'URL is required.',

  Notification_setting: 'Notification',
  Notification_On: 'On',
  Notification_Off: 'Off',
  Notification_status: 'Notification status',
  Subscribe_tags: 'Choose the story tags you want to follow',
};
