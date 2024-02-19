export const section06 = [
  {
    key: '59cc5b5a-fb96-4b9b-b5e1-a89953c13945',
    widget: 'question-group',
    title: '6. การจัดระบบบริการเทคโนโลยีสารสนเทศ',
    alias: '6p',
    children: [
      {
        key: '906914b0-f15e-41ef-a1d2-ab8a783b0f08',
        widget: 'radio-box',
        alias: '1f',
        verticalAlignment: true,
        title:
          '6.1 โรงพยาบาลของท่านมีจำนวนบุคลากร/เจ้าหน้าที่ทั้งหมดเป็นจำนวนเท่าใด (ไม่นับรวมลูกจ้างเหมาและลูกจ้างชั่วคราว)',
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'ทราบ (ตอบข้อ 6.1.1)',
              target:
                'd7f1c8ec-d1ee-47a1-9d4d-3a9f651008ad',
            },
          ],
          else: {
            target:
              '7cbd6e18-2654-4cd1-9106-12512f0d50c5',
          },
        },
        options: [
          {
            title: 'ทราบ (ตอบข้อ 6.1.1)',
          },
          {
            title: 'ไม่ทราบ (ตอบข้อ 6.2)',
          },
        ],
      },
      {
        key: 'd7f1c8ec-d1ee-47a1-9d4d-3a9f651008ad',
        widget: 'short-text',
        alias: '1f',
        verticalAlignment: true,
        title:
          '6.1.1 โรงพยาบาลของท่านมีจำนวนบุคลากร/เจ้าหน้าที่ทั้งหมดเป็นจำนวนเท่าใด (ไม่นับรวมลูกจ้างเหมาและลูกจ้างชั่วคราว)',
        options: [
          {
            placeholder: 'โปรดระบุ',
            rules: [
              {
                regex: '^[0-9]+$',
                errorMessage:
                  'โปรดระบุจำนวนตัวเลขเท่านั้น',
              },
            ],
          },
        ],
      },
      {
        key: '7cbd6e18-2654-4cd1-9106-12512f0d50c5',
        widget: 'short-text',
        alias: '2f',
        verticalAlignment: true,
        title:
          '6.2 โรงพยาบาลของท่านมีบุคลากร/เจ้าหน้าที่ด้านเทคโนโลยีสารสนเทศกี่คน',
        description:
          'ตัวอย่าง นักวิชาการคอมพิวเตอร์ จำนวน 100 คน คิดเป็นสัดส่วนร้อยละ 25 ของบุคลากรทั้งหมด',
        options: [
          {
            placeholder: 'โปรดระบุ',
            rules: [
              {
                regex: '^[0-9]+$',
                errorMessage:
                  'โปรดระบุจำนวนตัวเลขเท่านั้น',
              },
            ],
          },
        ],
      },
      {
        key: '01c798b4-b1d3-41a1-b2f8-80c715ad4f8b',
        widget: 'short-text',
        alias: '4f',
        verticalAlignment: true,
        title:
          '6.3 โรงพยาบาลของท่านมี บุคลากร/เจ้าหน้าที่สายงานอื่นที่ได้รับมอบหมายในการปฏิบัติงานด้านเทคโนโลยีสารสนเทศ ยกเว้นเจ้าหน้าที่ที่ปฏิบัติงานด้านการบันทึกข้อมูล จำนวนกี่คน',
        options: [
          {
            placeholder: 'โปรดระบุ',
            rules: [
              {
                regex: '^[0-9]+$',
                errorMessage:
                  'โปรดระบุจำนวนตัวเลขเท่านั้น',
              },
            ],
          },
        ],
      },
      {
        key: 'e3ec231a-4ace-4ecc-9142-1a3d4860031b',
        widget: 'short-text',
        alias: '6f',
        verticalAlignment: true,
        title:
          '6.4 โรงพยาบาลของท่านมี บุคลากร/เจ้าหน้าที่ด้านใดที่ได้รับมอบหมายในการปฏิบัติงานด้านการวิเคราะห์ข้อมูลเทคโนโลยีสารสนเทศ จำนวนกี่คน',
        options: [
          {
            placeholder: 'โปรดระบุ',
            rules: [
              {
                regex: '^[0-9]+$',
                errorMessage:
                  'โปรดระบุจำนวนตัวเลขเท่านั้น',
              },
            ],
          },
        ],
      },
      {
        key: 'f926f43a-c33f-4322-81a2-c0d12493e5ae',
        widget: 'statement',
        alias: '7f',
        verticalAlignment: true,
        title:
          '6.5 โรงพยาบาลของท่านมีการส่งเสริม ตามข้อดังต่อไปนี้',
      },
      {
        key: 'db6a3a4d-e2cb-4492-ad25-e46025b16f95',
        widget: 'radio-box',
        verticalAlignment: true,
        title:
          '6.5.1 มีการส่งเสริม ให้ความรู้และพัฒนาทักษะให้กับบุคลากรทั่วไปในช่วง 1 ปี ที่ผ่านมาหรือไม่',
        alias: '8f',
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี (ตอบข้อ 6.5.1.1)',
              target:
                'a7674c26-3c61-41f3-acc4-322b7da0915f',
            },
          ],
          else: {
            target:
              'a3b110e4-e6d1-4a80-978d-ffb960fce8cb',
          },
        },
        scores: [
          {
            value: 0,
          },
          {
            dependOn:
              'a7674c26-3c61-41f3-acc4-322b7da0915f',
          },
        ],
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี (ตอบข้อ 6.5.1.1)',
          },
        ],
      },
      {
        key: 'a7674c26-3c61-41f3-acc4-322b7da0915f',
        widget: 'matrix',
        alias: '9f',
        verticalAlignment: true,
        title:
          '6.5.1.1 โรงพยาบาลของท่านมีการส่งเสริม ให้ความรู้และพัฒนาทักษะให้กับบุคลากรทั่วไปในช่วง 1 ปี ที่ผ่านมา',
        headerTitle: 'ทักษะดิจิทัล',
        scores: [
          {
            key: 'cfa3923c-b7e9-45a2-95ed-fc8ec5860174',
            children: [
              {
                value: 0.5,
              },
              {
                value: 0,
              },
            ],
          },
          {
            key: 'cdceaab4-bf6c-4ea3-9664-7f11801a4027',
            children: [
              {
                value: 0.5,
              },
              {
                value: 0,
              },
            ],
          },
        ],
        rows: [
          {
            key: '1a6abffa-7bde-45db-bf95-351fe9838676',
            title:
              '1. ด้านความเข้าใจและใช้เทคโนโลยีดิจิทัล (Digital Literacy)',
          },
          {
            key: 'cfea7227-fadb-4e2b-8653-aa6ad0df759f',
            title:
              '2. ด้านเทคโนโลยีดิจิทัลเพื่อยกระดับศักยภาพองค์กร (Digital Technology)',
          },
          {
            key: '06304d71-43e7-4ef2-808d-a331f8752aa7',
            title:
              '3. ด้านความมั่นคงปลอดภัยไซเบอร์ (Cyber Security)',
          },
          {
            key: '22539521-3982-4fd8-930e-3c960fffe4f0',
            title:
              '4. ทักษะดิจิทัลด้านอื่นๆ ที่โรงพยาบาลของท่านส่งเสริม โปรดระบุ (Value based health care ที่โรงพยาบาลของท่านส่งเสริมบุคลากรของท่าน)',
            options: [
              {
                placeholder: 'โปรดระบุ',
                type: 'input',
              },
            ],
          },
        ],
        columns: [
          {
            key: 'cfa3923c-b7e9-45a2-95ed-fc8ec5860174',
            title:
              'การส่งเสริมและให้ความรู้ใน 1 ปี ที่ผ่านมา',
            children: [
              {
                key: '3a882def-a0e9-4fdd-9aa4-e7461188dda8',
                title: 'มี (โปรดแนบหลักฐาน)',
                options: [
                  {
                    type: 'attachment',
                    uploadButtonText: 'แนบหลักฐาน',
                  },
                ],
              },
              {
                key: '76fc9c5f-f58f-4d45-9fd7-7be09a2611ac',
                title: 'ไม่มี',
              },
            ],
          },
          {
            key: 'cdceaab4-bf6c-4ea3-9664-7f11801a4027',
            title: 'การวัดผลหลังอบรม/จบหลักสูตร',
            children: [
              {
                key: '8159e4f5-3b09-49ff-8d55-ae0ab836d1be',
                title: 'มี (โปรดแนบหลักฐาน)',
                options: [
                  {
                    type: 'attachment',
                    uploadButtonText: 'แนบหลักฐาน',
                  },
                ],
              },
              {
                key: '24085091-6baa-4d86-8da2-e92181f705af',
                title: 'ไม่มี',
              },
            ],
          },
        ],
      },
      {
        key: 'a3b110e4-e6d1-4a80-978d-ffb960fce8cb',
        widget: 'radio-box',
        alias: '10f',
        title:
          '6.5.2 มีการส่งเสริม ให้ความรู้และพัฒนาทักษะให้กับเจ้าหน้าที่ ไอที ในช่วง 1 ปี ที่ผ่านมาหรือไม่',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี (ตอบข้อ 6.5.2.1)',
              target:
                '514f44a9-544c-4531-a69a-8d14eef01ae7',
            },
          ],
          else: {
            target:
              'c838d75d-3090-4899-a390-1c5b8004e3d7',
          },
        },
        scores: [
          {
            value: 0,
          },
          {
            dependOn:
              '514f44a9-544c-4531-a69a-8d14eef01ae7',
          },
        ],
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี (ตอบข้อ 6.5.2.1)',
          },
        ],
      },
      {
        key: '514f44a9-544c-4531-a69a-8d14eef01ae7',
        widget: 'matrix',
        alias: '11f',
        verticalAlignment: true,
        addOption: true,
        maxOption: 5,
        title:
          '6.5.2.1 มีการส่งเสริม ให้ความรู้และพัฒนาทักษะให้กับเจ้าหน้าที่ ไอที ในช่วง 1 ปี ที่ผ่านมา',
        headerTitle: 'ทักษะดิจิทัล',
        scores: [
          {
            key: '82e70e0c-715f-4043-b831-4720ddb624a7',
            children: [
              {
                value: 0.5,
              },
              {
                value: 0,
              },
            ],
          },
          {
            key: 'f599a125-f2e2-4ce2-840d-f69208b586d7',
            children: [
              {
                value: 0.5,
              },
              {
                value: 0,
              },
            ],
          },
        ],
        rows: [
          {
            key: '89c885af-9f2e-4299-801a-66ac382ac767',
            title:
              '1. ด้านความเข้าใจและใช้เทคโนโลยีดิจิทัล (Digital Literacy)',
          },
          {
            key: '694d3fe8-5967-41bf-ac36-53841ca03bf6',
            title:
              '2. ด้านเทคโนโลยีดิจิทัลเพื่อยกระดับศักยภาพองค์กร (Digital Technology)',
          },
          {
            key: 'a0b59043-b00b-4351-b537-f5b1758b7882',
            title:
              '3. ด้านความมั่นคงปลอดภัยไซเบอร์ (Cyber Security)',
          },
          {
            key: 'de451702-67fa-4ceb-a011-8791e8b5ba95',
            title:
              'ทักษะดิจิทัลด้านอื่นๆ ที่โรงพยาบาลของท่านส่งเสริม โปรดระบุ (ตัวอย่าง: Data Analytics / Data Visualization / Data Scientist / Enterprise Architecture / Digital Infrastructure / Application and Platform Development / Computing Language for AI / AI)',
            isTitle: true,
          },
          {
            key: '04dc62e6-c144-482c-96ae-f8ddeeec998e',
            title: 'อื่นๆ',
            options: [
              {
                placeholder: 'โปรดระบุ',
                type: 'input',
              },
            ],
          },
        ],
        columns: [
          {
            key: '82e70e0c-715f-4043-b831-4720ddb624a7',
            title:
              'การส่งเสริมและให้ความรู้ใน 1 ปี ที่ผ่านมา',
            children: [
              {
                key: 'd2707ceb-82ea-4a83-9dd7-54ae1ba6ac3b',
                title: 'มี (โปรดแนบหลักฐาน)',
                options: [
                  {
                    type: 'attachment',
                    uploadButtonText: 'แนบหลักฐาน',
                  },
                ],
              },
              {
                key: '9cd025c6-71e5-46b2-9876-9a848275d6a0',
                title: 'ไม่มี',
              },
            ],
          },
          {
            key: 'f599a125-f2e2-4ce2-840d-f69208b586d7',
            title: 'การวัดผลหลังอบรม/จบหลักสูตร',
            children: [
              {
                key: 'c10fd886-fa77-4bf9-a7c7-c184c7adeb2f',
                title: 'มี (โปรดแนบหลักฐาน)',
                options: [
                  {
                    type: 'attachment',
                    uploadButtonText: 'แนบหลักฐาน',
                  },
                ],
              },
              {
                key: 'c54811f9-5de4-454c-a9c9-b5d894cf933e',
                title: 'ไม่มี',
              },
            ],
          },
        ],
      },
      {
        key: 'c838d75d-3090-4899-a390-1c5b8004e3d7',
        widget: 'radio-box',
        alias: '12f',
        verticalAlignment: true,
        title:
          '6.6 โรงพยาบาลมีการประเมินสมรรถนะ Competency Assessment) หรือไม่',
        options: [
          {
            title: 'มี',
          },
          {
            title: 'ไม่มี',
          },
        ],
      },
      {
        key: '423c5f87-3776-4acd-bd84-799540fcf9e6',
        widget: 'radio-box',
        alias: '13f',
        verticalAlignment: true,
        title:
          '6.7 โรงพยาบาลของท่านมีการจัดทำแผนพัฒนาบุคลากร/แผนพัฒนาบุคลากรด้านดิจิทัลหรือไม่',
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title:
              'มี (แผนพัฒนาบุคลากร/แผนพัฒนาบุคลากรด้านดิจิทัล)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
      {
        key: 'a9c496a9-147b-4b23-bad6-02e23735651f',
        widget: 'radio-box',
        alias: '14f',
        verticalAlignment: true,
        title:
          '6.8 โรงพยาบาลของท่านมีเทคโนโลยีโครงสร้างพื้นฐานทางด้านฮาร์ดแวร์ อาทิ คอมพิวเตอร์ โน้ตบุ๊ค อุปกรณ์ Conference ฯลฯ เพียงพอหรือไม่',
        description:
          '(ข้อแนะนำ : ให้พิจารณาจากแผนยุทธศาสตร์ และแผนพัฒนาของโรงพยาบาลท่าน)',
        logic: {
          if: [
            {
              condition: 'equal',
              target:
                '01220b9d-57e4-4f36-8937-0fe48ca4bda4',
              value:
                'ไม่เพียงพอ และ/หรือ ไม่เหมาะสมกับการใช้งานจริง (ตอบข้อ 6.8.1)',
            },
            {
              condition: 'equal',
              target:
                'fd9d1398-230e-4172-b7c0-fd538e5f9a03',
              value:
                'ไม่เพียงพอ และ/หรือ ไม่เหมาะสมกับการใช้งานจริง (ตอบข้อ 6.8.1)',
            },
            {
              condition: 'equal',
              target:
                'fd9d1398-230e-4172-b7c0-fd538e5f9a03',
              value: 'เพียงพอ และเหมาะสมกับการใช้งานจริง',
            },
          ],
          else: {
            target:
              'b9396fae-bf0b-4584-950c-168651351aaf',
          },
        },
        options: [
          {
            title:
              'ไม่เพียงพอ และ/หรือ ไม่เหมาะสมกับการใช้งานจริง (ตอบข้อ 6.8.1)',
          },
          {
            title: 'เพียงพอ และเหมาะสมกับการใช้งานจริง',
          },
        ],
      },
      {
        key: '01220b9d-57e4-4f36-8937-0fe48ca4bda4',
        widget: 'check-box',
        alias: '15f',
        verticalAlignment: true,
        title:
          '6.8.1 ปัญหาและเหตุผลที่โรงพยาบาลของท่านมีเทคโนโลยีโครงสร้างพื้นฐานทางด้านฮาร์ดแวร์ อาทิ คอมพิวเตอร์ โน้ตบุ๊ค อุปกรณ์ Conference ฯลฯ ไม่เพียงพอ และ/หรือ ไม่เหมาะสมกับการใช้งานจริง โรงพยาบาลของท่าน (ตอบได้มากกว่า 1 ข้อ)',
        description:
          '(ข้อแนะนำ : ให้พิจารณาจากแผนยุทธศาสตร์ และแผนพัฒนาของโรงพยาบาลท่าน)',
        options: [
          {
            title: 'คอมพิวเตอร์ตั้งโต๊ะ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'โน้ตบุ๊ค',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'สแกนเนอร์',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'ปริ้นเตอร์',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'อุปกรณ์อิเล็กทรอนิกส์อื่นๆ อาทิ อุปกรณ์สำหรับ Conference, Tablet/อื่นๆ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'อื่น ๆ โปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: 'fd9d1398-230e-4172-b7c0-fd538e5f9a03',
        widget: 'radio-box',
        alias: '16f',
        verticalAlignment: true,
        title:
          '6.8.2 ปัญหาอื่นๆ นอกเหนือจากข้อ 6.8 ที่โรงพยาบาลท่านประสบในด้านฮาร์ดแวร์',
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: 'b9396fae-bf0b-4584-950c-168651351aaf',
        widget: 'radio-box',
        alias: '17f',
        verticalAlignment: true,
        title:
          '6.9 โรงพยาบาลของท่านมีเทคโนโลยีโครงสร้างพื้นฐานทางด้านซอฟต์แวร์ อาทิ Microsoft office (Word, Excel, PowerPoint) Antivirus ฯลฯ เพียงพอหรือไม่',
        logic: {
          if: [
            {
              condition: 'equal',
              value:
                'ไม่เพียงพอ และ/หรือ ไม่เหมาะสมกับการใช้งานจริง (เช่น ผิดลิขสิทธิ์ ถือว่าไม่เหมาะสมกับการใช้งาน) (ตอบข้อ 6.9.1)',
              target:
                '9e1643a8-813c-4795-a446-52cc40aab521',
            },
            {
              condition: 'equal',
              value:
                'ไม่เพียงพอ และ/หรือ ไม่เหมาะสมกับการใช้งานจริง (เช่น ผิดลิขสิทธิ์ ถือว่าไม่เหมาะสมกับการใช้งาน) (ตอบข้อ 6.9.1)',
              target:
                '8d217f9f-bc56-4609-ace8-3ab291663667',
            },
            {
              condition: 'equal',
              value: 'เพียงพอ และเหมาะสมกับการใช้งานจริง',
              target:
                '8d217f9f-bc56-4609-ace8-3ab291663667',
            },
          ],
          else: {
            target:
              '2b5fb3b0-8089-487d-bcf8-015b974542e8',
          },
        },
        options: [
          {
            title:
              'ไม่เพียงพอ และ/หรือ ไม่เหมาะสมกับการใช้งานจริง (เช่น ผิดลิขสิทธิ์ ถือว่าไม่เหมาะสมกับการใช้งาน) (ตอบข้อ 6.9.1)',
          },
          {
            title: 'เพียงพอ และเหมาะสมกับการใช้งานจริง',
          },
        ],
      },
      {
        key: '9e1643a8-813c-4795-a446-52cc40aab521',
        widget: 'check-box',
        alias: '18f',
        verticalAlignment: true,
        title:
          '6.9.1 ปัญหาและเหตุผลที่โรงพยาบาลของท่านมีเทคโนโลยีโครงสร้างพื้นฐานทางด้านซอฟต์แวร์ อาทิ Microsoft office (Word, Excel, PowerPoint) Antivirus ฯลฯ ไม่เพียงพอ และ/หรือ ไม่เหมาะสมกับการใช้งานจริง โรงพยาบาลของท่าน',
        options: [
          {
            title: 'ระบบปฏิบัติการ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'Microsoft office (Word, Excel, PowerPoint)',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'Antivirus',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'TeamViewer',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'ซอฟต์แวร์อื่นๆ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: '8d217f9f-bc56-4609-ace8-3ab291663667',
        widget: 'radio-box',
        alias: '19f',
        verticalAlignment: true,
        title:
          '6.9.2 ปัญหาอื่นๆ นอกเหนือจากข้อ 6.9 ที่โรงพยาบาลท่านประสบในด้านฮาร์ดแวร์',
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: '2b5fb3b0-8089-487d-bcf8-015b974542e8',
        widget: 'radio-box',
        alias: '20f',
        verticalAlignment: true,
        title:
          '6.10 โรงพยาบาลของท่านมี Software ที่มีการละเมิดลิขสิทธิ์ หรือไม่',
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: 'c0e5ba73-8ed7-4d68-87d4-03cad8d78862',
        widget: 'radio-box',
        alias: '21f',
        verticalAlignment: true,
        title:
          '6.11 โรงพยาบาลของท่านมีเทคโนโลยีโครงสร้างพื้นฐานทางด้านเซิร์ฟเวอร์ และเน็ตเวิร์ค อาทิ Server Wi-Fi Router Switch Access point ฯลฯ เพียงพอหรือไม่',
        logic: {
          if: [
            {
              condition: 'equal',
              value:
                'ไม่เพียงพอ และ/หรือ ไม่เหมาะสมกับการใช้งานจริง (ตอบข้อ 6.11.1)',
              target:
                'ac4dd9c6-a082-4375-983d-3723e5da53b5',
            },
            {
              condition: 'equal',
              value:
                'ไม่เพียงพอ และ/หรือ ไม่เหมาะสมกับการใช้งานจริง (ตอบข้อ 6.11.1)',
              target:
                '40edbd1a-53db-4be2-a50c-cade0303c076',
            },
            {
              condition: 'equal',
              value: 'เพียงพอ และเหมาะสมกับการใช้งานจริง',
              target:
                '40edbd1a-53db-4be2-a50c-cade0303c076',
            },
          ],
          else: {
            target:
              'e49a4bea-c463-4cd1-a779-10c447a463bc',
          },
        },
        scores: [
          {
            value: 0,
          },
          {
            value: 1,
          },
        ],
        options: [
          {
            title:
              'ไม่เพียงพอ และ/หรือ ไม่เหมาะสมกับการใช้งานจริง (ตอบข้อ 6.11.1)',
          },
          {
            title: 'เพียงพอ และเหมาะสมกับการใช้งานจริง',
          },
        ],
        score: {
          result: 1,
        },
      },
      {
        key: 'ac4dd9c6-a082-4375-983d-3723e5da53b5',
        widget: 'check-box',
        alias: '22f',
        verticalAlignment: true,
        title:
          '6.11.1 ปัญหาและเหตุผลที่โรงพยาบาลของท่านมีเทคโนโลยีโครงสร้างพื้นฐานทางด้านซอฟต์แวร์ อาทิ Microsoft office (Word, Excel, PowerPoint) Antivirus ฯลฯ ไม่เพียงพอ และ/หรือ ไม่เหมาะสมกับการใช้งานจริง โรงพยาบาลของท่าน',
        options: [
          {
            title: 'Server',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'Firewall',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'Wi-Fi',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'Router',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'Switch',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'Access point',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'อื่นๆ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: '40edbd1a-53db-4be2-a50c-cade0303c076',
        widget: 'radio-box',
        alias: '23f',
        verticalAlignment: true,
        title:
          '6.11.2 ปัญหาอื่นๆ นอกเหนือจากข้อ 6.11 ที่โรงพยาบาลท่านประสบในด้านเซิร์ฟเวอร์และเน็ตเวิร์ค',
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: 'e49a4bea-c463-4cd1-a779-10c447a463bc',
        widget: 'radio-box',
        alias: '24f',
        verticalAlignment: true,
        title:
          '6.12 โรงพยาบาลของท่าน มีการใช้ระบบคลาวด์ (Cloud) หรือไม่',
        scores: [
          {
            value: 0,
          },
          {
            value: 1,
          },
        ],
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี',
          },
        ],
        score: {
          result: 0,
        },
      },
      {
        key: '5a4a7e62-1a5e-42a0-a408-aeeed51bec65',
        widget: 'radio-box',
        alias: '25f',
        verticalAlignment: true,
        title:
          '6.13 โรงพยาบาลของท่านมีแผนกู้คืนข้อมูล หรือไม่',
        scores: [
          {
            value: 0,
          },
          {
            value: 1,
          },
        ],
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี',
          },
        ],
        score: {
          result: 1,
        },
      },
      {
        key: '850f573c-3ecb-4a32-9d38-492c70b49e26',
        widget: 'radio-box',
        alias: '26f',
        verticalAlignment: true,
        title:
          '6.14 โรงพยาบาลของท่านมีการซ้อมแผนการกู้คืนข้อมูล หรือไม่',
        scores: [
          {
            value: 0,
          },
          {
            value: 1,
          },
        ],
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี',
          },
        ],
        score: {
          result: 1,
        },
      },
      {
        key: '94c9d714-cb9b-4dcb-9dd7-18018174c052',
        widget: 'radio-box',
        alias: '27f',
        verticalAlignment: true,
        title:
          '6.15 โรงพยาบาลของท่านมีระบบสำรองข้อมูลหรือไม่',
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี (ตอบข้อ 6.15.1)',
              target:
                'f7baf2f2-7f25-4e41-8c8a-29bf0d2b04d3',
            },
          ],
          else: {
            target:
              '7e73537b-94b1-4092-bd0d-cbc1e3c22a18',
          },
        },
        scores: [
          {
            value: 0,
          },
          {
            value: 1,
          },
        ],
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี (ตอบข้อ 6.15.1)',
          },
        ],
        score: {
          result: 1,
        },
      },
      {
        key: 'f7baf2f2-7f25-4e41-8c8a-29bf0d2b04d3',
        widget: 'radio-box',
        alias: '28f',
        verticalAlignment: true,
        title:
          '6.15.1 โรงพยาบาลของท่านมีระบบสำรองข้อมูลแบบใด',
        scores: [
          {
            value: 1,
          },
          {
            value: 1,
          },
          {
            value: 2,
          },
        ],
        options: [
          {
            title: 'ระบบสำรองข้อมูล แบบออฟไลน์ (Offline)',
          },
          {
            title:
              'ระบบสำรองข้อมูล แบบออนไลน์ Online ออนไลน์',
          },
          {
            title:
              'ระบบสำรองข้อมูลทั้ง 2 แบบ (Offline / Online)',
          },
        ],
        score: {
          result: 1,
        },
      },
      {
        key: '7e73537b-94b1-4092-bd0d-cbc1e3c22a18',
        widget: 'statement',
        alias: '29f',
        verticalAlignment: true,
        title:
          '6.16 โรงพยาบาลของท่านมีมาตรการในการรักษาความมั่นคงปลอดภัยทางไซเบอร์ ในด้านการรักษาความลับของข้อมูล\n(Confidentiality) ความแท้จริงของข้อมูล (Integrity) และ การใช้งานได้ของระบบ (Availability) หรือไม่',
      },
      {
        key: 'ea0dca04-95e1-461f-ad6d-d0ce5c4d2a08',
        widget: 'radio-box',
        alias: '30f',
        title:
          '6.16.1 ด้านการรักษาความลับของข้อมูล (Confidentiality)',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี (ตอบข้อ 6.16.1.1)',
              target:
                '4e29e4ab-ec78-42f5-86dd-db5e81ca78f2',
            },
          ],
          else: {
            target:
              '188979f0-fe10-458e-86ab-10d33a1a0626',
          },
        },
        scores: [
          {
            value: 0,
          },
          {
            dependOn:
              '4e29e4ab-ec78-42f5-86dd-db5e81ca78f2',
          },
        ],
        options: [
          {
            title: 'ไม่มี',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุเหตุผล',
          },
          {
            title: 'มี (ตอบข้อ 6.16.1.1)',
          },
        ],
        score: {
          result: 0,
        },
      },
      {
        key: '4e29e4ab-ec78-42f5-86dd-db5e81ca78f2',
        widget: 'check-box',
        alias: '31f',
        title:
          '6.16.1.1 การดำเนินการ ด้านการรักษาความลับของข้อมูล (Confidentiality) \n' +
          '(ตอบได้มากกว่า 1 คำตอบ และโปรดแนบหลักฐานการดำเนินการที่ระบุ)',
        verticalAlignment: true,
        scores: [
          {
            value: 1,
          },
          {
            value: 1,
          },
          {
            value: 1,
          },
        ],
        options: [
          {
            title:
              'มีการเข้ารหัสข้อมูลก่อนส่ง (Encryption)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title:
              'มีการกำหนดสิทธิในการเข้าถึงข้อมูล (Access control)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title:
              'มีการยืนยันตัวตนโดยใช้รหัสผ่าน (Authentication)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
      {
        key: '188979f0-fe10-458e-86ab-10d33a1a0626',
        widget: 'radio-box',
        alias: '32f',
        title: '6.16.2 ความแท้จริงของข้อมูล (Integrity)',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี (ตอบข้อ 6.16.2.1)',
              target:
                '1c4d6fe2-90d6-4a85-809a-fa8ce9795ee0',
            },
          ],
          else: {
            target:
              '229be632-d9b3-4ab6-8f40-f057c1de12a1',
          },
        },
        scores: [
          {
            value: 0,
          },
          {
            dependOn:
              '1c4d6fe2-90d6-4a85-809a-fa8ce9795ee0',
          },
        ],
        options: [
          {
            title: 'ไม่มี',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุเหตุผล',
          },
          {
            title: 'มี (ตอบข้อ 6.16.2.1)',
          },
        ],
      },
      {
        key: '1c4d6fe2-90d6-4a85-809a-fa8ce9795ee0',
        widget: 'check-box',
        alias: '33f',
        title:
          '6.16.2.1 การดำเนินการ  ความแท้จริงของข้อมูล (Integrity)\n' +
          '(ตอบได้มากกว่า 1 คำตอบ และโปรดแนบหลักฐานการดำเนินการที่ระบุ) ',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'contain',
              value: '3. อื่นๆ (ตอบข้อ 6.16.2.1.1 )',
              target:
                '287a2f68-eda4-4f7d-9c74-d771224bea17',
            },
          ],
          else: {
            target:
              '229be632-d9b3-4ab6-8f40-f057c1de12a1',
          },
        },
        scores: [
          {
            value: 1,
          },
          {
            value: 1,
          },
          {
            value: 1,
          },
        ],
        options: [
          {
            title:
              '1. มีการยืนยันความถูกต้องของข้อมูลโดยวิธีการ Hash',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title:
              '2. มีการใช้ลายเซ็นดิจิทัล (Digital signature)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title: '3. อื่นๆ (ตอบข้อ 6.16.2.1.1 )',
          },
        ],
      },
      {
        key: '287a2f68-eda4-4f7d-9c74-d771224bea17',
        widget: 'short-text',
        alias: '34f',
        title:
          '6.16.2.1.1 การดำเนินการ  ความแท้จริงของข้อมูล (Integrity) อื่นๆ',
        verticalAlignment: true,
        options: [
          {
            title: 'โปรดระบุ',
            placeholder: 'โปรดระบุ',
            attachment: true,
          },
        ],
      },
      {
        key: '229be632-d9b3-4ab6-8f40-f057c1de12a1',
        title:
          '6.16.3 การใช้งานได้ของระบบ (Availability)',
        widget: 'radio-box',
        alias: '35f',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี (ตอบข้อ 6.16.3.1)',
              target:
                '5423b391-cb76-43c7-aae5-8830177eee91',
            },
          ],
          else: {
            target:
              '67e6678c-5061-4510-b389-0c2856453348',
          },
        },
        scores: [
          {
            value: 0,
          },
          {
            dependOn:
              '5423b391-cb76-43c7-aae5-8830177eee91',
          },
        ],
        options: [
          {
            title: 'ไม่มี',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุเหตุผล',
          },
          {
            title: 'มี (ตอบข้อ 6.16.3.1)',
          },
        ],
      },
      {
        key: '5423b391-cb76-43c7-aae5-8830177eee91',
        widget: 'check-box',
        alias: '36f',
        title:
          '6.16.3.1 การใช้งานได้ของระบบ (Availability) มีการดำเนินการใดบ้าง (ตอบได้มากกว่า 1 คำตอบ)',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'contain',
              value:
                '1. มีการสำรองข้อมูล (Backup) (ตอบข้อ 6.16.3.1.1)',
              target:
                'bb2bbbdb-370c-4d0e-b431-461df0f0c6c6',
            },
            {
              condition: 'contain',
              value: '5. อื่นๆ',
              target:
                'd594d779-8f7b-4a1c-8bcb-3fa5a83b91c2',
            },
          ],
          else: {
            target:
              '67e6678c-5061-4510-b389-0c2856453348',
          },
        },
        scores: [
          {
            value: 1,
          },
          {
            value: 1,
          },
          {
            value: 1,
          },
          {
            value: 1,
          },
          {
            value: 1,
          },
        ],
        options: [
          {
            title:
              '1. มีการสำรองข้อมูล (Backup) (ตอบข้อ 6.16.3.1.1)',
          },
          {
            title:
              '2. มีการเตรียมแผนฟื้นฟูภัยพิบัติ (Disaster recovery plan: DR plan)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title:
              '3. มีการเตรียมแผนความต่อเนื่องทางธุรกิจ (Business continuity plan: BCP)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title:
              '4. มีระบบการจัดการเหตุการณ์ผิดปกติ (Incident Management System)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title: '5. อื่นๆ',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
      {
        key: 'bb2bbbdb-370c-4d0e-b431-461df0f0c6c6',
        widget: 'check-box',
        alias: '37f',
        title:
          '6.16.3.1.1 มีการสำรองข้อมูล (Backup) แบบใด',
        verticalAlignment: true,
        options: [
          {
            title: '1. สำรองข้อมูลภายในโรงพยาบาล',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title: '2. สำรองข้อมูลในพื้นที่ห่างไกล',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
      {
        key: 'd594d779-8f7b-4a1c-8bcb-3fa5a83b91c2',
        widget: 'short-text',
        alias: '38f',
        title:
          '6.16.3.1.2 การดำเนินการ อื่น ๆ นอกจากข้อ 6.16.3.1',
        verticalAlignment: true,
        options: [
          {
            title: 'โปรดระบุ',
            placeholder: 'โปรดระบุ',
            attachment: true,
          },
        ],
      },
      {
        key: '67e6678c-5061-4510-b389-0c2856453348',
        widget: 'radio-box',
        alias: '39f',
        verticalAlignment: true,
        title:
          '6.17 โรงพยาบาลของท่านได้ดำเนินการตามมาตรฐานในการรักษาความมั่นคงปลอดภัยทางไซเบอร์หรือไม่',
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี (ตอบข้อ 6.17.1)',
              target:
                '51294b51-521e-41a9-a594-a7f0bd7508ff',
            },
          ],
          else: {
            target:
              '3285b9ff-4f41-4b73-a586-ff33552e124d',
          },
        },
        scores: [
          {
            value: 0,
          },
          {
            dependOn:
              '51294b51-521e-41a9-a594-a7f0bd7508ff',
          },
        ],
        options: [
          {
            title: 'ไม่มี',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุเหตุผล',
          },
          {
            title: 'มี (ตอบข้อ 6.17.1)',
          },
        ],
      },
      {
        key: '51294b51-521e-41a9-a594-a7f0bd7508ff',
        widget: 'check-box',
        alias: '40f',
        title:
          '6.17.1 โรงพยาบาลได้ดำเนินการตามมาตรฐานในการรักษาความมั่นคงปลอดภัยทางไซเบอรด้านใดบ้าง',
        verticalAlignment: true,
        scores: [
          {
            value: 1,
          },
          {
            value: 1,
          },
          {
            value: 1,
          },
          {
            value: 1,
          },
        ],
        options: [
          {
            title: '1. มาตรฐานสากล ISO/IEC27001',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title:
              '2. มาตรฐานการรักษาความมั่นคงปลอดภัยสำหรับโปรแกรมประยุกต์บนเว็บไซต์ (Web Application security Standard: WAS)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title:
              '3. มาตรฐานการรักษาความมั่นคงปลอดภัยสำหรับเว็บไซต์ (Website Security Standard: WSS)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title:
              '4. มาตรฐานการรักษาความมั่นคงปลอดภัยตามวิธีการแบบปลอดภัยตามพ.ร.บ. ธุรกรรมทางอิเล็กทรอนิกส์',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
    ],
  },
];
