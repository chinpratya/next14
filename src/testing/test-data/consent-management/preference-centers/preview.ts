export const preview = {
  formItems: [
    {
      id: '1b5774aa-a6eb-4b5b-9b19-0a097a61a6b8',
      name: '',
      sections: [
        {
          id: '56f831e3-6d66-4ee1-8ec9-c436ab660f65',
          name: 'เจ้าของข้อมูล',
          components: [
            {
              widget: 'radio-group',
              widgetProps: {
                options: ['ลูกค้า', 'พนักงาน'],
              },
              label: 'เจ้าของข้อมูล',
              name: 'b9499cf6-7524-48f2-be44-38ba6b8ad219',
              type: 'field',
              rules: [
                {
                  required: true,
                  message:
                    'กรุณาเลือกประเภทเจ้าของข้อมูล',
                },
              ],
            },
            {
              widget: 'radio-group',
              widgetProps: {
                options: [
                  'ปกติ',
                  'คนไร้ความสามารถ',
                  'คนเสมือนไร้ความสามารถ',
                ],
              },
              label: 'เข้ากรณีพิเศษหรือไม่',
              name: '96e3fbf0-dfce-4c31-8107-1ab45a07dbd7',
              type: 'field',
              rules: [
                {
                  required: true,
                  message:
                    'กรุณาเลือกประเภทเจ้าของข้อมูล',
                },
              ],
            },
          ],
        },
        {
          id: '0351ca60-44b6-4867-b972-04bbe55e94e0',
          name: 'ข้อมูลส่วนบุคคล',
          components: [
            {
              widget: 'input',
              widgetProps: {},
              label: 'ID ของเจ้าของข้อมูลส่วนบุคคล',
              name: '8a250a81-0dbb-48cb-a1ab-ee0cc49645c9',
              type: 'field',
              rules: [
                {
                  required: true,
                  message:
                    'กรุณากรอก ID ของเจ้าของข้อมูลส่วนบุคคล',
                },
              ],
            },
            {
              widget: 'input',
              widgetProps: {},
              label: 'คำนำหน้า',
              name: '8960bb9a-1918-458f-a73b-b3a553aaf7ac',
              type: 'field',
              rules: [
                {
                  required: true,
                  message: 'กรุณากรอกคำนำหน้า',
                },
              ],
            },
            {
              widget: 'input',
              widgetProps: {
                placeholder: '',
              },
              label: 'ชื่อ',
              name: '9d568282-8dfe-4d86-b464-e52cd36d342b',
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
              name: 'aaaacbf1-c58c-42a6-8aad-f17958ab6cac',
              type: 'field',
              rules: [
                {
                  required: true,
                  message: 'กรุณากรอกนามสกุล',
                },
              ],
            },
          ],
        },
        {
          id: 'bee209b3-7d76-4921-aa6e-2afc1e9f66e0',
          name: 'ข้อมูลติดต่อ',
          components: [
            {
              widget: 'input',
              widgetProps: {},
              label: 'อีเมล',
              name: '2e0406cb-5b40-4326-996a-b1ea35044852',
              type: 'field',
              rules: [
                {
                  required: true,
                  message: 'กรุณากรอกอีเมล',
                },
              ],
            },
            {
              widget: 'input',
              widgetProps: {},
              label: 'เบอร์โทร',
              name: '1b63822f-638b-43b1-8867-faf8ca7e84fa',
              type: 'field',
              rules: [
                {
                  required: true,
                  message: 'กรุณากรอกเบอร์โทร',
                },
              ],
            },
          ],
        },
        {
          id: '5b6eca27-f6fe-47f7-8e9a-06ff5fb21673',
          name: 'ข้อมูลผู้อนุบาล',
          components: [
            {
              widget: 'input',
              widgetProps: {},
              label: 'ชื่อ',
              name: 'b6eee0df-fe4b-47fb-a350-b6f9c6ef3b13',
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
              name: '1eb1ea3e-c81f-42e8-81fb-f038eb97c023',
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
              label: 'อีเมล',
              name: '7ad1cdad-7c52-4910-8cb5-d099057aa4f8',
              type: 'field',
              rules: [
                {
                  required: true,
                  message: 'กรุณากรอกอีเมล',
                },
              ],
            },
            {
              widget: 'input',
              widgetProps: {},
              label: 'เบอร์โทร',
              name: 'ea490600-d64a-4e57-9df7-ea65ff17b607',
              type: 'field',
              rules: [
                {
                  required: true,
                  message: 'กรุณากรอกเบอร์โทร',
                },
              ],
            },
          ],
        },
        {
          id: 'a4da20a1-0614-48ef-9781-ba19189b6678',
          name: 'ข้อมูลผู้พิทักษ์',
          components: [
            {
              widget: 'input',
              widgetProps: {},
              label: 'ชื่อ',
              name: '2744b835-9749-4919-8846-3b85a732948c',
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
              name: 'e4900326-3d27-4044-8d41-92cf36f3c5fd',
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
              label: 'อีเมล',
              name: '5e1faaff-7a96-42ee-9cdf-873cd2bbbf68',
              type: 'field',
              rules: [
                {
                  required: true,
                  message: 'กรุณากรอกอีเมล',
                },
              ],
            },
            {
              widget: 'input',
              widgetProps: {},
              label: 'เบอร์โทร',
              name: 'e4186167-ea02-4522-8927-f5f60acfcad3',
              type: 'field',
              rules: [
                {
                  required: true,
                  message: 'กรุณากรอกเบอร์โทร',
                },
              ],
            },
          ],
        },
        {
          id: '6f5d0dc5-b62d-47d8-948b-c42492ba2e2e',
          name: 'ข้อมูลผู้ปกครอง',
          components: [
            {
              widget: 'input',
              widgetProps: {},
              label: 'ชื่อ',
              name: '0f2717fb-06ea-4e2d-b1c1-ff5531f39868',
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
              name: '167e48bc-8d79-4e6d-82da-a77d208629c1',
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
              label: 'อีเมล',
              name: 'df13e36f-986c-4585-a380-0ccddba8d5ab',
              type: 'field',
              rules: [
                {
                  required: true,
                  message: 'กรุณากรอกอีเมล',
                },
              ],
            },
            {
              widget: 'input',
              widgetProps: {},
              label: 'เบอร์โทร',
              name: '16d893ef-0247-484b-8102-c26c11d6186c',
              type: 'field',
              rules: [
                {
                  required: true,
                  message: 'กรุณากรอกเบอร์โทร',
                },
              ],
            },
          ],
        },
        {
          id: 'b000816f-947d-4d8f-9da1-7873aab11233',
          name: 'กรุณากรอกหัวข้อ',
          components: [
            {
              activityID:
                '3aacc747-04f5-43aa-933e-43ece2ce3b38',
              activity: 'เพื่อการปฏิบัติตามสัญญาคู่ค้า',
              purposes: [
                {
                  purposeID:
                    '450daab4-0c7d-49b3-aa23-fa6448e81d86',
                  name: 'สนับสนุนการสมัครรับรายเดือน (Subscription)และการแจ้งเตือนข่าวสาร',
                  description:
                    'สนับสนุนการสมัครรับรายเดือน (Subscription)และการแจ้งเตือนข่าวสาร สนับสนุนการสมัครรับรายเดือน\n(Subscription)และการแจ้งเตือนข่าวสาร',
                  displayType: 'vertical',
                  preferences: [
                    {
                      id: '0abe8715-4d16-444c-9f13-c54043e3c99c',
                      name: 'ท่านสามารถปรับแต่งความยินยอมของท่านได้ตามต้องการ',
                      attributeTypeID: 'radio-group',
                      choices: [
                        'ส่งข่าว 3 ครั้ง/อาทิตย์',
                        'ส่งข่าวไม่เกิน 10 ครั้ง/อาทิตย์',
                      ],
                    },
                    {
                      id: '4d7ad820-b1de-4d78-81ee-f564246a1cc1',
                      name: 'กรุณาเลือกข้อมูลที่ท่านยินยอมให้เปิดเผย',
                      attributeTypeID: 'checkbox-group',
                      choices: [
                        'ชื่อ',
                        'นามสกุล',
                        'เพศ',
                        'อายุ',
                        'ที่อยู่',
                        'เบอร์โทรศัพท์',
                        'อีเมล',
                        'รูปภาพ',
                      ],
                    },
                  ],
                },
              ],
              type: 'activity',
            },
            {
              activityID:
                '98f0ae4c-8c3b-4786-ad7d-ac07f60fdbf6',
              activity: 'การรับสมัครพนักงาน',
              purposes: [
                {
                  purposeID:
                    '252d94dd-851c-4bd1-9a8d-831934840304',
                  name: 'สนับสนุนการสมัครรับรายเดือน (Subscription)และการแจ้งเตือนข่าวสาร',
                  description:
                    'สนับสนุนการสมัครรับรายเดือน (Subscription)และการแจ้งเตือนข่าวสาร สนับสนุนการสมัครรับรายเดือน\n(Subscription)และการแจ้งเตือนข่าวสาร',
                  displayType: 'horizontal',
                  preferences: [
                    {
                      id: 'c92ee0d8-3005-4b69-af59-100f87b0832e',
                      name: 'ท่านสามารถปรับแต่งความยินยอมของท่านได้ตามต้องการ',
                      attributeTypeID: 'radio-group',
                      choices: [
                        'ส่งข่าว 3 ครั้ง/อาทิตย์',
                        'ส่งข่าวไม่เกิน 10 ครั้ง/อาทิตย์',
                      ],
                    },
                    {
                      id: '04e2a4ea-1832-42e2-85a5-f96f4125e677',
                      name: 'กรุณาเลือกข้อมูลที่ท่านยินยอมให้เปิดเผย',
                      attributeTypeID: 'checkbox-group',
                      choices: [
                        'ชื่อ',
                        'นามสกุล',
                        'เพศ',
                        'อายุ',
                        'ที่อยู่',
                        'เบอร์โทรศัพท์',
                        'อีเมล',
                        'รูปภาพ',
                      ],
                    },
                  ],
                },
              ],
              type: 'activity',
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
        '<p>ยินดีต้อนรับ! กรุณากรอกแบบฟอร์มนี้เพื่อส่งคำขอของคุณแล้วเราจะตอบกลับอย่างเร็วที่สุด</p>',
      footerContent:
        '<p>บริษัท ซีเคียวริตี้ พิทช์ จำกัด (สำนักงานใหญ่)</p><p> 88/8 ซ.ลาดพร้าว18 แยก 12 อินดิเพ็นเดนท์ คอมมิวนิเคชั่นเน็ตเวิร์ค ชั้น 6 แขวงจอมพล เขตจตุจักร 10900</p>',
    },
  },
};
