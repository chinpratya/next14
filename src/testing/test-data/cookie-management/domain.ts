const setting = {
  perf_primary_color: '#2ac3ed',
  color_mode: 'light',
  perf_popup_position: 'center',
  primary_color: '#2ac3ed',
  version: '1',
  perf_color_mode: 'light',
  perf_text_color: '#030303',
  text_link_color: '#3968f0',
  popup_position: 'bottom',
  background_color: '#fff',
  perf_text_link_color: '#3968f0',
  perf_style: 'style1',
  style: 'style1',
  brand_logo_url:
    'https://file-management-public.s3.amazonaws.com/cookie-management/banner/logo_example_1-0b7addcfd571.jpeg',
  perf_show_brand_logo: false,
  show_brand_logo: false,
  according_festival: true,
  text_color: '#030303',
  opacity: 0.3,
  button_color: '#eaeaea',
  lang: 'th',
  perf_background_color: '#fff',
  icon_logo:
    'https://file-management-public.s3.amazonaws.com/cookie-management/banner/logo_example_1-0b7addcfd571.jpeg',
  icon_position: 'bottom-left',
  perf_brand_logo_url: '',
  on_display: true,
  enable_deny: true,
  perf_button_color: '#aff75e',

  text: {
    th: {
      cookie_policy_link: '',
      perf_cookie_policy_link: '',
      settings: 'ตั้งค่า',
      deny: 'ไม่ยอมรับทั้งหมด',
      save: 'ยอมรับเฉพาะที่เลือก',
      description:
        'เราใช้คุกกี้เพื่อให้ท่านสามารถใช้เว็บไซต์ได้อย่างสะดวกสบายยิ่งขึ้น รวมถึงการเลือกคอนเทนต์ที่เหมาะสม การสนับสนุนความปลอดภัย และการวิเคราะห์การทำงานของเว็บไซต์เพื่อพัฒนาบริการของเรา ท่านสามารถเลือก "ตั้งค่า" เพื่อปรับแต่งการยินยอมการใช้คุกกี้ได้ หรือกดปุ่ม "ยอมรับทั้งหมด" เพื่ออนุญาตให้ใช้คุกกี้ทุกประเภท',
      title: 'พวกเราใช้คุกกี้',
      privacy_policy_link: '',
      perf_privacy_policy_link: '',
      accept: 'ยอมรับทั้งหมด',
      privacy_statement: 'นโยบายความเป็นส่วนตัว',
      modal_title: 'จัดการความเป็นส่วนตัว',
      policy_description2:
        'หรือ คลิก "{privacy_statement}" หรือ "{cookie_statement}" เพื่อดูเพิ่มเติม',
      banner_accept: 'ยอมรับทั้งหมด',
      always_on: 'ใช้งานเสมอ',
      policy_description:
        'หรือ คลิก "{privacy_statement}" เพื่อดูเพิ่มเติม',
      cookie_detail: 'รายละเอียดเพิ่มเติม',
      cookie_statement: 'นโยบายการใช้คุกกี้',
      perf_cookie_statement: '',
      perf_cookie_policy: '',
      cookie_policy: '',
      perf_description:
        'ท่านสามารถตั้งค่าการใช้ของคุกกี้ โดยคลิกที่ปุ่มและตัวเลือกด่านล่าง ทั้งนี้ การปิดการทำงานของคุกกี้บางตัวอาจส่งผลกระทบการทำงานของเว็บไซต์ ทำให้ไม่สามารถให้บริการท่านได้อย่างเต็มที่',
    },
    en: {
      cookie_policy_link: '',
      perf_cookie_policy_link: '',
      settings: 'CUSTOMIZE SELECTION',
      deny: 'REJECT ALL',
      save: 'ALLOW SELECTED COOKIES',
      description:
        'We use cookies to ensure you have a good experience browsing on our website. They help us show you more relevant contents, support your security, and analyze our performance. Because we are aware that your privacy is important, you can click “Customize” to manage your settings, or click “Accept All” to allow all cookies to be used on the website.',
      title: 'We use cookies',
      privacy_policy_link: '',
      perf_privacy_policy_link: '',
      accept: 'ALLOW ALL',
      privacy_statement: 'Privacy Policy',
      modal_title: 'Privacy Manager',
      policy_description2:
        'Click {privacy_statement} or {cookie_statement} for more information',
      banner_accept: 'Accept All',
      always_on: 'Always Active',
      policy_description:
        'Click {privacy_statement} for more information',
      cookie_detail: 'Cookie detail',
      cookie_statement: 'Cookie Policy',
      perf_cookie_statement: '',
      perf_cookie_policy: '',
      cookie_policy: '',
      perf_description:
        'You can set the privacy preference by selecting the types of web cookies you want to set to active.  However, disabling a cookie may cause some features of our website not function properly.',
    },
  },
};

const list = [
  {
    domainID: '1dbac780-3ada-4669-9d74-3bed36dad94e',
    name: 'กระทรวงแรงงาน',
    site: 'www.mol.go.th',
    totalPageScan: 1,
    cookies: 7,
    scanDate: new Date(
      '2023-10-03T00:00:00.000Z'
    ).toISOString(),
    status: 'success',
    limit_scan: Math.floor(Math.random() * 1000),
  },
  {
    domainID: '504d0382-a16f-4f9c-b375-a839e8156c0c',
    name: 'MFC Fund',
    site: 'www.mfcfund.com',
    totalPageScan: 1,
    cookies: 16,
    scanDate: new Date(
      '2023-10-03T00:00:00.000Z'
    ).toISOString(),
    status: 'success',
    limit_scan: Math.floor(Math.random() * 1000),
  },
  {
    domainID: 'bbe255bb-0c44-4f56-aa4e-2fa814c5e21b',
    name: 'Security Pitch',
    site: 'www.securitypitch.com',
    totalPageScan: 1,
    cookies: 27,
    scanDate: new Date(
      '2023-10-03T00:00:00.000Z'
    ).toISOString(),
    status: 'success',
    limit_scan: Math.floor(Math.random() * 1000),
  },
  {
    domainID: 'c0ec12e3-ddce-40e9-8ae6-e71e2ae11adc',
    name: 'MOL',
    site: 'mol.go.th',
    totalPageScan: 1,
    cookies: 7,
    scanDate: new Date(
      '2023-10-03T00:00:00.000Z'
    ).toISOString(),
    status: 'success',
    limit_scan: Math.floor(Math.random() * 1000),
  },
];

export const domain = {
  list,
  setting,
};
