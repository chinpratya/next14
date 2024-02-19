export const template = {
  formConditions: [],
  formItems: [
    {
      id: '32f71021-72d5-410f-8bf4-70aaa91be39e',
      name: 'แบบฟอร์มของคุณ',
      properties: {
        isDisabledDelete: true,
      },
      sections: [
        {
          id: '97368704-34fb-4911-b065-6101e7ee13af',
          name: 'กรุณากรอกชื่อฟอร์มของท่าน',
          properties: {
            isDisabledDelete: true,
          },
          components: [
            {
              label: 'ฉันเป็น',
              name: 'cc91a421-fa1d-421f-be92-4736ff5ab077',
              widget: 'radio-group',
              type: 'field',
              rules: [
                {
                  required: true,
                  message: 'กรุณาเลือก',
                },
              ],
              widgetProps: {
                options: ['ลูกค้า', 'พนักงาน', 'อื่น ๆ'],
              },
            },
            {
              widget: 'input',
              widgetProps: {},
              label: 'อีเมล',
              name: '6b4fcc1f-3dda-4c96-90ef-4d9cd315a0c2',
              type: 'field',
              rules: [
                {
                  required: true,
                  message: 'กรุณากรอกอีเมล',
                },
                {
                  type: 'email',
                  message: 'กรุณากรอกอีเมลให้ถูกต้อง',
                },
              ],
            },
            {
              widget: 'input',
              widgetProps: {
                placeholder: '',
              },
              label: 'ชื่อ',
              name: '11a5e5f5-cdfe-4913-9c4a-b76e5759e683',
              type: 'field',
              rules: [
                {
                  required: true,
                  message: 'กรุณากรอกชื่อ',
                },
              ],
            },
            {
              widget: 'input',
              widgetProps: {},
              label: 'นามสกุล',
              name: 'a0c3843f-98c3-4a43-a8fb-38ac9e8ebfa3',
              type: 'field',
              rules: [
                {
                  required: true,
                  message: 'กรุณากรอกนามสกุล',
                },
              ],
            },
            {
              widget: 'input',
              widgetProps: {},
              label: 'อายุ',
              name: 'f9a9034e-3739-4326-be7f-fd4527df06a0',
              type: 'field',
              rules: [
                {
                  type: 'number',
                  message: 'กรุณากรอกเบอร์โทรให้ถูกต้อง',
                },
              ],
            },
            {
              widget: 'input',
              widgetProps: {},
              label: 'ประเทศ',
              name: 'a49cd07b-8fc8-4a76-ab1d-c020f7a5e2a9',
              type: 'field',
            },
            {
              widget: 'input',
              widgetProps: {},
              label: 'ที่อยู่',
              name: 'a8bb8068-6f85-44b0-9380-f876df2c1dea',
              type: 'field',
            },
            {
              widget: 'input',
              widgetProps: {},
              label: 'จังหวัด',
              name: '2738d4dd-7830-4132-9771-7430681c6d9f',
              type: 'field',
            },
            {
              widget: 'input',
              widgetProps: {},
              label: 'รหัสไปรษณีย์',
              name: '6c030529-94d3-47d7-96b9-bdaf57b7672c',
              type: 'field',
              rules: [
                {
                  type: 'number',
                  message: 'กรุณากรอกเบอร์โทรให้ถูกต้อง',
                },
              ],
            },
            {
              widget: 'input',
              widgetProps: {},
              label: 'เบอร์ติดต่อ',
              name: '21c95b76-5936-4885-9ff9-32fccb191169',
              type: 'field',
              rules: [
                {
                  type: 'number',
                  message: 'กรุณากรอกเบอร์โทรให้ถูกต้อง',
                },
              ],
            },
            {
              widget: 'textarea',
              widgetProps: {},
              label: 'เหตุผลประกอบคำร้องขอ',
              name: '6d620de2-b49a-42fb-9481-8395f2ac85ce',
              type: 'field',
            },
            {
              widget: 'uploads',
              widgetProps: {},
              label: 'แนบไฟล์',
              name: '1f7b94e3-0cf7-4a3f-a888-f1ee0864ffa4',
              type: 'field',
            },
          ],
        },
      ],
    },
  ],
  formSetting: {
    page: {
      favicon:
        'https://file-management-public.s3.amazonaws.com/consent-builder/form-content-page-favicon/sp-favicon-7c534e4664a3.png',
      title: 'Security & Privacy Combined',
    },
    form: {
      headerLogo:
        'https://file-management-public.s3.amazonaws.com/consent-builder/form-content-page-favicon/sp-logo-8131a8168439.png',
      headerContent:
        '<p style="text-align: center">ยินดีต้อนรับ! กรุณากรอกแบบฟอร์มนี้เพื่อส่งคำขอของคุณแล้วเราจะตอบกลับอย่างเร็วที่สุด</p>',
      footerContent:
        '<p style="text-align: center">บริษัท ซีเคียวริตี้ พิทช์ จำกัด (สำนักงานใหญ่)</p><p style="text-align: center"> 88/8 ซ.ลาดพร้าว18 แยก 12 อินดิเพ็นเดนท์ คอมมิวนิเคชั่นเน็ตเวิร์ค ชั้น 6 แขวงจอมพล เขตจตุจักร 10900</p>',
    },
  },
};
