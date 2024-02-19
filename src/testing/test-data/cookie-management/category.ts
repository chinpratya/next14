import { faker } from '@faker-js/faker';

const generateCookies = () => {
  const cookies = [];
  const categories = [
    'necessary',
    'functional',
    'analytics',
    'marketing',
    'unclassified',
  ];
  const domains = [
    'www.abc.com',
    'www.example.com',
    'www.test.com',
  ];
  const descriptionsEn = [
    'This cookie is used to remember your cookie preferences.',
    'This cookie is used to remember your language preference.',
    'This cookie is used to remember your region preference.',
    'This cookie is used to remember your log-in information.',
    'This cookie is used to improve your experience on the website.',
    'This cookie is used to collect information about how you use the website.',
    'This cookie is used to track your activity to enable advertising personalization.',
    'This cookie is used to deliver relevant advertising.',
    'This cookie has not been categorized into the above groups.',
  ];

  const descriptionsTh = [
    'คุกกี้นี้ใช้เพื่อจำกัดการตั้งค่าคุกกี้ของคุณ',
    'คุกกี้นี้ใช้เพื่อจำกัดการตั้งค่าภาษาของคุณ',
    'คุกกี้นี้ใช้เพื่อจำกัดการตั้งค่าภูมิภาคของคุณ',
    'คุกกี้นี้ใช้เพื่อจำกัดข้อมูลการเข้าสู่ระบบของคุณ',
    'คุกกี้นี้ใช้เพื่อปรับปรุงประสบการณ์ของคุณบนเว็บไซต์',
    'คุกกี้นี้ใช้เพื่อเก็บข้อมูลเกี่ยวกับวิธีการใช้งานเว็บไซต์ของคุณ',
    'คุกกี้นี้ใช้เพื่อติดตามกิจกรรมของคุณเพื่อเปิดใช้งานการปรับแต่งโฆษณา',
    'คุกกี้นี้ใช้เพื่อให้โฆษณาที่เกี่ยวข้อง',
    'คุกกี้นี้ไม่ได้รับการจัดประเภทเป็นกลุ่มดังกล่าว',
  ];

  for (let i = 0; i < 50; i++) {
    const categoryIndex = Math.floor(
      Math.random() * categories.length
    );
    const domainIndex = Math.floor(
      Math.random() * domains.length
    );
    const descriptionIndex = Math.floor(
      Math.random() * descriptionsEn.length
    );
    const expiryDate = new Date(
      Date.now() + Math.floor(Math.random() * 10000000000)
    ).toISOString();
    cookies.push({
      name: faker.lorem.word(),
      category: categories[categoryIndex],
      domain: domains[domainIndex],
      Expiry: expiryDate,
      description: {
        en: descriptionsEn[descriptionIndex],
        th: descriptionsTh[descriptionIndex],
      },
    });
  }

  return cookies.filter(
    (cookie, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.name === cookie.name &&
          t.domain === cookie.domain
      )
  );
};

const cookieCategory = [
  {
    cetegory_label: 'คุกกี้ที่มีความจำเป็น',
    cetegory_name: 'necessary',
    background: '#2AC3ED',
    description:
      'These cookies are required to ensure the website can work properly. They cannot be disabled.',
    necessary: true,
  },
  {
    cetegory_label: 'คุกกี้เพื่อการทำงานของเว็บไซต์',
    cetegory_name: 'functional',
    background: '#0C1862',
    description:
      'These cookies help the website to remenber your choices, including the language, your region, and log-in information. They are used to improve your experience and provide you with convenience on the website.',
    necessary: false,
  },
  {
    cetegory_label: 'คุกกี้เพื่อประสิทธิภาพ',
    cetegory_name: 'analytics',
    background: '#A461D8',
    description:
      'These cookies collect information about how you use the website, such as which links you clicked on. They are solely used to improve the performance of this website.',
    necessary: false,
  },
  {
    cetegory_label: 'คุกกี้เพื่อการตลาด',
    cetegory_name: 'marketing',
    background: '#FADB14',
    description:
      'These cookies track your activity to enable advertising personalization. They help to deliver relevant advertising.',
    necessary: false,
  },
  {
    cetegory_label: 'คุกกี้ที่ยังไม่ได้จัดประเภท',
    cetegory_name: 'unclassified',
    description:
      'These cookies cookies that have not been categorized into the above groups',
    background: '#fa1414',
    necessary: false,
  },
];

export const category = {
  cookies: generateCookies(),
  category: cookieCategory,
};
