import { v4 as uuid } from 'uuid';

export const defaultConsentBuilderFormItems = (
  formId: string
) => [
  {
    id: formId,
    name: '',
    sections: [],
  },
];

export const defaultConsentBuilderFormSetting = {
  page: {
    favicon:
      'https://file-management-public.s3.amazonaws.com/consent-builder/form-content-page-favicon/sp-favicon-7c534e4664a3.png',
    title: 'Security & Privacy Combined',
  },
  form: {
    headerLogo:
      'https://file-management-public.s3.amazonaws.com/consent-builder/form-content-page-favicon/sp-logo-8131a8168439.png',
    headerContent:
      '<p>ยินดีต้อนรับ! กรุณากรอกแบบฟอร์มนี้เพื่อส่งคำขอของคุณแล้วเราจะตอบกลับอย่างเร็วที่สุด</p>',
    footerContent:
      '<p>บริษัท ซีเคียวริตี้ พิทช์ จำกัด (สำนักงานใหญ่)</p><p> 88/8 ซ.ลาดพร้าว18 แยก 12 อินดิเพ็นเดนท์ คอมมิวนิเคชั่นเน็ตเวิร์ค ชั้น 6 แขวงจอมพล เขตจตุจักร 10900</p>',
  },
};

export const initialConsentBuilder = () => {
  const formId = uuid();

  return {
    currentFormId: formId,
    currentFormIndex: 0,
    currentSectionId: '',
    currentSectionIndex: -1,
    formItems: defaultConsentBuilderFormItems(formId),
    formSetting: defaultConsentBuilderFormSetting,
    selectedLanguage: null,
    selectedTranslateContentId: null,
    openAddLanguage: false,
    defaultFormItems: [],
  };
};
