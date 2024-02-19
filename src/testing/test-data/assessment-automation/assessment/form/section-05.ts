export const section05 = [
  {
    key: '97ced9a4-4b5b-40c7-8147-10a956a1d1d2',
    widget: 'question-group',
    title: '5. การจัดระบบบริการเทคโนโลยีสารสนเทศ',
    alias: '5p',
    children: [
      {
        key: 'a2f5c8a0-2547-45aa-aa56-ff10651bc23c',
        title:
          '5.1 โรงพยาบาลของท่าน มีการให้บริการทั้งหมดกี่บริการ (บริการที่เป็นและไม่เป็นดิจิทัล)',
        alias: '1e',
        widget: 'short-text',
        verticalAlignment: true,
        options: [
          {
            placeholder: 'โปรดระบุจำนวนบริการ',
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
        key: '74f4ff37-2ff6-4544-9252-a6a6d942bfc1',
        widget: 'radio-box',
        alias: '2e',
        verticalAlignment: true,
        title:
          '5.2 โรงพยาบาลของท่าน มีการให้บริการ อยู่ในรูปแบบดิจิทัลแล้วหรือไม่ เป็นจำนวนเท่าไร',
        options: [
          {
            title: 'มี เป็นจำนวนทั้งสิ้น',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
            rules: [
              {
                regex: '^[0-9]+$',
                errorMessage:
                  'โปรดระบุจำนวนตัวเลขเท่านั้น',
              },
            ],
          },
          {
            title: 'ไม่ทราบจำนวน',
          },
        ],
      },
      {
        key: '775fd745-cb70-4de6-ac3c-d067e924a2d9',
        widget: 'statement',
        alias: '3e',
        title:
          '5.3 โรงพยาบาลของท่าน มีระบบดิจิทัล ดังนี้หรือไม่ บริการระบบดิจิทัล สำหรับเจ้าหน้าที่',
      },
      {
        key: '25a45a2a-657a-4f7a-8836-4895f3b0f99f',
        widget: 'radio-box',
        alias: '4e',
        title:
          '5.3.1 โรงพยาบาลของท่านมีบริการระบบบริหารจัดการคลังยาหรือไม่',
        description:
          'หมายเหตุ: บริการระบบดิจิทัล สำหรับเจ้าหน้าที่',
        verticalAlignment: true,
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
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
        score: {
          result: 0,
        },
      },
      {
        key: 'cd2d5ebf-bb24-47e5-9252-184850398472',
        widget: 'radio-box',
        alias: '5e',
        title:
          '5.3.2 โรงพยาบาลของท่านมีบริการระบบบริหารจัดการสินค้าหรือไม่',
        description:
          'หมายเหตุ: บริการระบบดิจิทัล สำหรับเจ้าหน้าที่',
        verticalAlignment: true,
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
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
        score: {
          result: 0,
        },
      },
      {
        key: 'e910c323-da98-45a2-be23-a18b670f1714',
        widget: 'radio-box',
        alias: '6e',
        title:
          '5.3.3 โรงพยาบาลของท่านมีบริการระบบบริการดูแลเครื่องมือแพทย์หรือไม่',
        description:
          'หมายเหตุ: บริการระบบดิจิทัล สำหรับเจ้าหน้าที่',
        verticalAlignment: true,
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
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
        score: {
          result: 1,
        },
      },
      {
        key: 'd2ae08bc-921f-4747-b039-dff1dc3b816d',
        widget: 'radio-box',
        alias: '7e',
        title:
          '5.3.4 โรงพยาบาลของท่านมีบริการระบบจัดการตารางเวร แพทย์/พยาบาลหรือไม่',
        description:
          'หมายเหตุ: บริการระบบดิจิทัล สำหรับเจ้าหน้าที่',
        verticalAlignment: true,
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
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
        score: {
          result: 0,
        },
      },
      {
        key: '5fc97028-cbd1-4c99-b61e-1ae57fbf84ea',
        widget: 'radio-box',
        alias: '8e',
        verticalAlignment: true,
        title:
          '5.3.5 โรงพยาบาลของท่านมีบริการระบบดิจิทัลอื่นๆนอกจากข้อ 3.1-3.5 หรือไม่',
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี (ตอบข้อ 5.3.5.1)',
              target:
                '16835262-ac77-401e-92b2-34127c8c7977',
            },
          ],
          else: {
            target:
              '82a714ee-c0fb-4d03-88b5-804cea9e27e1',
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
            title: 'มี (ตอบข้อ 5.3.5.1)',
          },
        ],
      },
      {
        key: '16835262-ac77-401e-92b2-34127c8c7977',
        widget: 'short-text',
        alias: '9e',
        title:
          '5.3.5.1 โรงพยาบาลของท่านมีบริการระบบดิจิทัลอื่นๆนอกจากข้อ 3.1-3.5 โปรดระบุ',
        description:
          'หมายเหตุ: บริการระบบดิจิทัล สำหรับเจ้าหน้าที่',
        verticalAlignment: true,
        scores: [
          {
            value: 1,
          },
        ],
        options: [
          {
            title: 'แนบหลักฐาน',
            type: 'attachment',
            placeholder: 'โปรดระบุ',
            attachment: true,
          },
        ],
      },
      {
        key: 'e95b6dcd-28f2-47e8-a381-2e7e4c3b0a3b',
        widget: 'statement',
        alias: '10e',
        title: 'บริการระบบดิจิทัล สำหรับผู้ป่วย',
      },
      {
        key: '82a714ee-c0fb-4d03-88b5-804cea9e27e1',
        widget: 'radio-box',
        alias: '11e',
        title:
          '5.3.6 โรงพยาบาลของท่านมีบริการรระบบจองคิวนัดหมายหรือไม่',
        description:
          'หมายเหตุ: บริการดิจิทัล สำหรับผู้ป่วย',
        verticalAlignment: true,
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
      {
        key: '2697394d-999e-4206-abe2-345bae77d45d',
        widget: 'radio-box',
        alias: '12e',
        title:
          '5.3.7 โรงพยาบาลของท่านมีบริการรระบบทำบัตรออนไลน์ Digital ID and Signature หรือไม่',
        description:
          'หมายเหตุ: บริการดิจิทัล สำหรับผู้ป่วย',
        verticalAlignment: true,
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
      {
        key: '69e2cc96-c404-484c-b5f0-c65da05a7513',
        widget: 'radio-box',
        alias: '13e',
        title:
          '5.3.8 โรงพยาบาลของท่านมีบริการรระบบ e-Payment /e tac/e-receipt (ช่องทางจ่ายเงิน)หรือไม่',
        description:
          'หมายเหตุ: บริการดิจิทัล สำหรับผู้ป่วย',
        verticalAlignment: true,
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
      {
        key: 'e154adaf-65a2-4dde-9870-ca9eeff45553',
        widget: 'radio-box',
        alias: '14e',
        title:
          '5.3.9 โรงพยาบาลของท่านมีบริการรระบบคอมพิวเตอร์สั่งยา (CPOE)หรือไม่',
        description:
          'หมายเหตุ: บริการดิจิทัล สำหรับผู้ป่วย',
        verticalAlignment: true,
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
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
        score: {
          result: 1,
        },
      },
      {
        key: '15ac3088-72dc-4554-928a-0f8ee24b1bcb',
        widget: 'radio-box',
        alias: '15e',
        title:
          '5.3.10 โรงพยาบาลของท่านมีบริการรระบบเวชระเบียน EMR (Electronic Medical Record)หรือไม่',
        description:
          'หมายเหตุ: บริการดิจิทัล สำหรับผู้ป่วย',
        verticalAlignment: true,
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
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
        score: {
          result: 0,
        },
      },
      {
        key: '3af88ffa-9998-4793-8159-f0ddb9ba9ffe',
        widget: 'radio-box',
        alias: '16e',
        title:
          '5.3.11 โรงพยาบาลของท่านมีบริการรระบบดูแลผู้ป่วยนอก (OPD) หรือไม่',
        description:
          'หมายเหตุ: บริการดิจิทัล สำหรับผู้ป่วย',
        verticalAlignment: true,
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
      {
        key: 'b5e3e267-9644-45b6-9699-46a45b335f2b',
        widget: 'radio-box',
        alias: '17e',
        title:
          '5.3.12 โรงพยาบาลของท่านมีบริการรระบบดูแลผู้ป่วยใน (IPD) หรือไม่',
        description:
          'หมายเหตุ: บริการดิจิทัล สำหรับผู้ป่วย',
        verticalAlignment: true,
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
      {
        key: '1418ec8e-6675-47d7-9198-c812c6e02d74',
        widget: 'radio-box',
        alias: '18e',
        title:
          '5.3.13 โรงพยาบาลของท่านมีบริการรระบบงานศูนย์จัดเก็บรายได้ (Claim Center)หรือไม่ (ไม่ใช่การคีย์ข้อมูลเข้าระบบ E-Claim ของสปสช)',
        description:
          'หมายเหตุ: บริการดิจิทัล สำหรับผู้ป่วย',
        verticalAlignment: true,
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
      {
        key: 'afa7bed0-24d4-4a9c-bd80-30e0a5632fe7',
        widget: 'radio-box',
        alias: '19e',
        title:
          '5.3.14 โรงพยาบาลของท่านมีบริการรระบบปรึกษาแพทย์ทางไกล (Tele Medicine)หรือไม่',
        description:
          'หมายเหตุ: บริการดิจิทัล สำหรับผู้ป่วย',
        verticalAlignment: true,
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
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
        score: {
          result: 1,
        },
      },
      {
        key: '5fd5004a-55cf-4ad2-bf61-91179cfd9e7b',
        widget: 'radio-box',
        alias: '20e',
        title:
          '5.3.15 โรงพยาบาลของท่านมีบริการรระบบส่งต่อผู้ป่วย (Refer)หรือไม่',
        description:
          'หมายเหตุ: บริการดิจิทัล สำหรับผู้ป่วย',
        verticalAlignment: true,
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
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
        score: {
          result: 1,
        },
      },
      {
        key: '8295b798-126c-4ef7-8545-cef759e355c2',
        widget: 'radio-box',
        alias: '21e',
        title:
          '5.3.16 โรงพยาบาลของท่านมีบริการรระบบการลงลายมือชื่ออิเล็กทรอนิกส์ (Electronic Signature)หรือไม่',
        description:
          'หมายเหตุ: บริการดิจิทัล สำหรับผู้ป่วย',
        verticalAlignment: true,
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
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
        score: {
          result: 0,
        },
      },
      {
        key: 'e5f20905-4556-4a35-9eb7-bb03504c407e',
        widget: 'radio-box',
        alias: '22e',
        title:
          '5.3.17 โรงพยาบาลของท่านมีบริการรระบบใบรับรองแพทย์ อิเล็กทรอนิกส์ (Electronic Medical Certificate)หรือไม่',
        description:
          'หมายเหตุ: บริการดิจิทัล สำหรับผู้ป่วย',
        verticalAlignment: true,
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
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
        score: {
          result: 0,
        },
      },
      {
        key: '80ec8b0c-eefa-4b73-b753-8b679a1f4682',
        widget: 'radio-box',
        alias: '23e',
        title:
          '5.3.18 โรงพยาบาลของท่านมีบริการระบบดิจิทัลอื่นๆนอกจากข้อ 5.3.6-5.3.17 หรือไม่',
        description:
          'หมายเหตุ: บริการดิจิทัล สำหรับผู้ป่วย',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี (ตอบข้อ 5.3.18.1)',
              target:
                '2594ea06-6e50-4024-b700-909103427559',
            },
          ],
          else: {
            target:
              '899eeefa-a4e8-4bcd-8802-4da5bb905d8a',
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
            title: 'มี (ตอบข้อ 5.3.18.1)',
          },
        ],
        score: {
          result: 1,
        },
      },
      {
        key: '2594ea06-6e50-4024-b700-909103427559',
        widget: 'short-text',
        alias: '24e',
        title:
          '5.3.18.1 โรงพยาบาลของท่านมีบริการระบบดิจิทัลอื่นๆนอกจากข้อ 5.3.6-5.3.17 โปรดระบุ',
        description:
          'หมายเหตุ: บริการดิจิทัล สำหรับผู้ป่วย',
        verticalAlignment: true,
        scores: [
          {
            value: 1,
          },
        ],
        options: [
          {
            title: 'แนบหลักฐาน',
            type: 'attachment',
            placeholder: 'โปรดระบุ',
            attachment: true,
          },
        ],
      },
      {
        key: '899eeefa-a4e8-4bcd-8802-4da5bb905d8a',
        widget: 'radio-box',
        alias: '25e',
        title:
          '5.4 โรงพยาบาลของท่าน มีบริการระบบดิจิทัลในรูปแบบ Mobile Application หรือไม่ *ท่านจำเป็นต้องระบุ',
        description: 'เช่น แอฟที่เขียนให้ จองนัด',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี ได้แก่ (ตอบข้อ 5.4.1)',
              target:
                'c05b44c9-c043-4591-8e5b-22e8e5fae8fd',
            },
          ],
          else: {
            target:
              '24a83b6d-b2cc-4b5d-b100-8301d7bce64d',
          },
        },
        options: [
          {
            title: 'มี ได้แก่ (ตอบข้อ 5.4.1)',
          },
          {
            title: 'ไม่มี',
          },
        ],
      },
      {
        key: 'c05b44c9-c043-4591-8e5b-22e8e5fae8fd',
        title:
          '5.4.1 บริการระบบดิจิทัลในรูปแบบ Mobile Application',
        alias: '26e',
        widget: 'short-text',
        verticalAlignment: true,
        options: [
          {
            placeholder: 'โปรดระบุ',
            attachment: true,
          },
        ],
      },
      {
        key: '24a83b6d-b2cc-4b5d-b100-8301d7bce64d',
        widget: 'radio-box',
        alias: '27e',
        title:
          '5.5 โรงพยาบาลของท่าน มีระบบช่วยเหลือผู้ใช้ (Service desk) หรือไม่ *ท่านจำเป็นต้องแนบหลักฐานประกอบ',
        description:
          'เช่น ช่วยเหลือเจ้าหน้าที่ (ส่งซ่อม / ขอข้อมูล / เอาข้อมูลขึ้นเวปไซด์ เพื่อเผยแพร่',
        verticalAlignment: true,
        options: [
          {
            title: 'มี โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title: 'ไม่มี',
          },
        ],
      },
      {
        key: 'cfa6a596-200e-49db-9a7f-c9cf2769adb7',
        widget: 'radio-box',
        alias: '28e',
        title:
          '5.6 โรงพยาบาลของท่านยังมีความจำเป็นต้องเรียกเก็บ สำเนาบัตรประชาชน, สำเนาทะเบียนบ้าน และสำเนาเอกสารอื่นๆ ที่ออกโดยราชการหรือไม่',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี (ตอบข้อ 5.6.1)',
              target:
                '417d5b1c-6945-4814-baff-fa88e0429e5a',
            },
          ],
          else: {
            target:
              '4efc685b-5005-4d51-aa9d-91a679783093',
          },
        },
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี (ตอบข้อ 5.6.1)',
          },
        ],
      },
      {
        key: '417d5b1c-6945-4814-baff-fa88e0429e5a',
        widget: 'short-text',
        alias: '29e',
        addOption: true,
        title:
          '5.6.1 โรงพยาบาลของท่านเรียกเก็บ สำเนาบัตรประชาชน, สำเนาทะเบียนบ้าน และสำเนาเอกสารอื่นๆ กรณีใดบ้าง โปรดระบุ',
        verticalAlignment: true,
        options: [
          {
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: '4efc685b-5005-4d51-aa9d-91a679783093',
        widget: 'matrix',
        alias: '30e',
        title:
          '5.7 ระบบบริหารจัดการภายในของโรงพยาบาลท่านอยู่ในรูปแบบดิจิทัลหรือไม่ อย่างไร',
        headerTitle: 'ระบบบริหารจัดการ',
        verticalAlignment: true,
        rows: [
          {
            key: '709fa2e7-3ba5-4175-b580-27bbec6123d7',
            title: '1. งานบริหารทรัพยากรบุคคล',
          },
          {
            key: 'c1ff9a80-5d37-4270-950b-5aaa3a68f3a7',
            title: '2. งานบริหารงบประมาณ',
          },
          {
            key: '87735138-c491-4c16-a48b-841663fb32b4',
            title: '3. การเงินการบัญชี',
          },
          {
            key: '9142caaa-148a-4362-8d44-92f0727ef9b2',
            title: '4. งานสารบรรณกลาง',
          },
          {
            key: 'aa7b9488-10d9-4f99-81f8-73a579921723',
            title: '5. งานเลขานุการ',
          },
          {
            key: 'dc42f395-0aa9-4d14-b57a-4a829831ac74',
            title:
              '6. งานอาคารสถานที่ และยานพาหนะ เช่นจองห้องประชุม รถตู้',
          },
          {
            key: 'f23973a8-36ff-4d3e-bb4b-080d9994709f',
            title: '7. งานบริหารจัดการพัสดุ',
          },
          {
            key: 'e29c037b-6a8b-47fc-9263-a280380b054d',
            title: '8. งานจัดซื้อจัดจ้าง',
          },
          {
            key: '5f7ea136-4851-4e79-9dbb-6b88ae50eacb',
            title: '9. งานติดตามและประเมินผล',
          },
          {
            key: 'e07fb225-2372-4032-8d21-c4d106284382',
            title: '10. งานติดต่อสื่อสาร',
          },
          {
            key: '29e0a83c-a2d1-42a7-8de3-3d3f162c3e33',
            title: '11. งานตรวจสอบ',
          },
          {
            key: '4cd4cf7d-daed-4885-96cc-152a74df791a',
            title: '12. งานบริหารงานด้านการจัดประชุม',
          },
          {
            key: '6da4590b-2cf1-43bd-91ac-be7dc9c09c40',
            title: '13. งานด้านอื่นๆ …... (โปรดระบุ) ',
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
            key: '828f96e3-7793-4443-ac77-6568e4770779',
            title:
              'ไม่มี 5.7A มีระบบบริหารจัดการภายในที่เป็นรูปแบบดิจิทัล',
          },
          {
            key: '0aa53c47-b4a0-428d-9f8d-450dca542e41',
            title:
              'มี 5.7A มีระบบบริหารจัดการภายในที่เป็นรูปแบบดิจิทัล',
          },
        ],
      },
      {
        key: 'c523818f-5a3b-4255-9b3b-0c174152ea6d',
        widget: 'radio-box',
        alias: '31e',
        title:
          '5.8 โรงพยาบาลของท่านมีการปรับปรุงกระบวนการทำงาน เพื่อให้สอดรับกับการนำเทคโนโลยีเข้ามาปรับใช้ หรือไม่ เช่น มีการแก้ไขหรือลดขั้นตอนการทำงานและกระบวนการบางส่วนให้เหมาะสม รวมถึงมีการติดตามและประเมินผลการทำงานอย่างต่อเนื่อง',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value:
                'ไม่มีการปรับปรุงวิธีการ/กระบวนการทำงาน โปรดระบุเหตุผล (ตอบข้อ 5.8.1)',
              target:
                'd4b26c71-53e9-4c5e-805d-3222ebf85c96',
            },
          ],
          else: {
            target:
              '2765f365-8f6a-45d2-8c5b-e488ae35cf14',
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
              'ไม่มีการปรับปรุงวิธีการ/กระบวนการทำงาน โปรดระบุเหตุผล (ตอบข้อ 5.8.1)',
          },
          {
            title:
              'มีการปรับปรุงวิธีการ/กระบวนการทำงาน โปรดแนบหลักฐาน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
        score: {
          result: 0,
        },
      },
      {
        key: 'd4b26c71-53e9-4c5e-805d-3222ebf85c96',
        widget: 'check-box',
        alias: '32e',
        title: '5.8.1 โปรดระบุเหตุผล',
        verticalAlignment: true,
        options: [
          {
            title: 'ไม่มีนโยบายรองรับ',
          },
          {
            title: 'ขาดงบประมาณ',
          },
          {
            title: 'อื่นๆ โปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุเหตุผล',
          },
        ],
      },
      {
        key: '2765f365-8f6a-45d2-8c5b-e488ae35cf14',
        widget: 'radio-box',
        alias: '33e',
        title:
          '5.9 โรงพยาบาลของท่านมีการนำเทคโนโลยีดิจิทัล มาช่วยลดขั้นตอนการทำงาน หรือทำให้การทำงานมีประสิทธิภาพอย่างไร',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value:
                'ไม่มีการนำเทคโนโลยีดิจิทัลมาใช้ โปรดระบุเหตุผล (ตอบได้มากกว่า 1 คำตอบ) (ตอบข้อ 5.9.1)',
              target:
                'ee0f6b3b-3f5e-4e4d-878d-0026b91b26a4',
            },
          ],
          else: {
            target:
              'ee9ed47a-9dfd-4e5d-a62b-4e059820ee5d',
          },
        },
        options: [
          {
            title:
              'ไม่มีการนำเทคโนโลยีดิจิทัลมาใช้ โปรดระบุเหตุผล (ตอบได้มากกว่า 1 คำตอบ) (ตอบข้อ 5.9.1)',
          },
          {
            title:
              'มีการนำเทคโนโลยีดิจิทัลมาใช้ด้านกระบวนการอัตโนมัติ ตัวอย่าง วัดความดัน ลิ้งก์เข้าโปรแกรม EMR นำผลแลปเข้าระบบอัตโนมัติ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: 'ee0f6b3b-3f5e-4e4d-878d-0026b91b26a4',
        widget: 'check-box',
        alias: '34e',
        title: '5.9.1 โปรดระบุเหตุผล',
        verticalAlignment: true,
        options: [
          {
            title: 'ไม่มีนโยบายรองรับ',
          },
          {
            title: 'ขาดงบประมาณ',
          },
          {
            title:
              'โรงพยาบาลไม่มีความจำเป็นที่ต้องนำทคโนโลยีดิจิทัลมาปรับใช้ในการทำงาน',
          },
          {
            title: 'อื่นๆ โปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุเหตุผล',
          },
        ],
      },
      {
        key: 'ee9ed47a-9dfd-4e5d-a62b-4e059820ee5d',
        widget: 'check-box',
        alias: '35e',
        title:
          '5.10 ปัจจุบันโรงพยาบาลของท่านได้มีการส่งเอกสารติดต่อราชการกับโรงพยาบาลอื่นๆ อย่างเป็นทางการในรูปแบบใด (ตอบได้มากกว่า 1 คำตอบ)',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'contain',
              value:
                '2. รูปแบบดิจิทัล โปรดระบุ (ตอบได้มากกว่า 1 คำตอบ) (ตอบข้อ 5.10.1)',
              target:
                '201baa83-9381-4fa5-9579-0bd5da4df1f1',
            },
          ],
          else: {
            target:
              '5ca741e3-eb48-4564-bb80-a5d4340f663c',
          },
        },
        options: [
          {
            title:
              '1. รูปแบบเอกสารส่งทางไปรษณีย์ / โทรสาร / พนักงานส่งเอกสาร',
          },
          {
            title:
              '2. รูปแบบดิจิทัล โปรดระบุ (ตอบได้มากกว่า 1 คำตอบ) (ตอบข้อ 5.10.1)',
          },
        ],
      },
      {
        key: '201baa83-9381-4fa5-9579-0bd5da4df1f1',
        widget: 'check-box',
        alias: '36e',
        title:
          '5.10.1 รูปแบบดิจิทัล โปรดระบุ (ตอบได้มากกว่า 1 คำตอบ)',
        verticalAlignment: true,
        options: [
          {
            title:
              'ไปรษณีย์อิเล็กทรอนิกส์ (e-mail) โปรดระบุ อีเมลกลางของโรงพยาบาลของท่าน ที่สามารถลิ้งก์เข้าระบบสารบรรณ',
            isMore: true,
            type: 'input',
            placeholder:
              'โปรดระบุชื่อที่สามารถลิ้งก์เข้าระบบสารบรรณ',
          },
          {
            title:
              'ระบบสารบรรณอิเล็กทรอนิกส์ (e-Saraban) (คำอธิบาย) เป็นระบบบริหารจัดการหนังสือรับ-ส่ง ด้วยระบบเทคโนโลยีสารสนเทศ',
          },
        ],
      },
      {
        key: '5ca741e3-eb48-4564-bb80-a5d4340f663c',
        widget: 'matrix',
        alias: '37e',
        title:
          '5.11 โรงพยาบาลของท่านมีโปรแกรมหรือแพลตฟอร์มซึ่งสามารถใช้ในสื่อสาร และบริการผู้ป่วย ในรูปแบบดังต่อไปนี้หรือไม่',
        description:
          'หมายเหตุ: ไม่นับโปรแกรมที่มีฟังก์ชันเพียงอย่างเดียว เช่น ไปรษณีย์อิเล็กทรอนิกส์ (e-mail) (ไม่รวม โปรแกรมแพทย์ทางไกล Tele Medicine)',
        addOption: true,
        headerTitle: 'แพลตฟอร์ม',
        verticalAlignment: true,
        rows: [
          {
            key: '63e8d5af-4ef2-4b01-815a-f504cfc2a885',
            title: '1. Microsoft Team',
          },
          {
            key: 'fa3dac5c-3cfe-4846-b84c-1a9c36033e83',
            title:
              '2. Google Suite (เช่นGoogle Drive, Google Meet\n, Google Calendar ฯลฯ)',
          },
          {
            key: '4c3fb588-f996-49f4-87ea-7bac00894224',
            title: '3. แพลตฟอร์มที่พัฒนาขึ้นของโรงพยาบาล',
            options: [
              {
                placeholder: 'โปรดระบุ',
                type: 'input',
              },
            ],
          },
          {
            key: '8cb2fe83-0da6-48cd-a599-3a2cb030c34e',
            title: '4. Zoom Meeting',
          },
          {
            key: '7f127265-482f-4228-a038-16a2e8e4a987',
            title: '5. อื่นๆ โปรดระบุ',
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
            key: '1a2ae5e8-bbf7-4f5f-b036-8d2f6a0f3a8b',
            title:
              'โรงพยาบาลของท่านมีการใช้\nแพลตฟอร์มนี้หรือไม่',
            children: [
              {
                key: 'fbaffeeb-8c53-49c6-8bac-5a65cc2e3893',
                title: 'มี',
              },
              {
                key: 'fd935fcc-5640-488f-9dcc-01ddd54e05eb',
                title: 'ไม่มี',
              },
            ],
          },
          {
            key: 'e84defa7-8ee8-4825-8322-d5700189af78',
            title: 'รูปแบบการใช้งานของแพลตฟอร์ม',
            type: 'checkbox',
            visibility: [
              {
                target:
                  '1a2ae5e8-bbf7-4f5f-b036-8d2f6a0f3a8b',
                condition: 'equal',
                value:
                  'fbaffeeb-8c53-49c6-8bac-5a65cc2e3893',
              },
            ],
            children: [
              {
                key: 'adb8a833-dfca-4133-ad66-a7c5e317b39b',
                title:
                  'การส่งข้อความหาคนภายในองค์กร (Instant message)',
              },
              {
                key: '98e1a36a-e516-42f1-a119-a1eca5ff5fe9',
                title:
                  'การติดต่อคนในองค์กรผ่านเสียง (Voice-conferencing)',
              },
              {
                key: 'd59074b5-78da-4e97-895e-1747a33963b9',
                title:
                  'การติดต่อคนในองค์กรผ่านวิดีโอ (Video-conferencing)',
              },
              {
                key: '593253db-5f9d-4f2f-8edb-fe38dc42fef0',
                title:
                  'การแชร์ เอกสารดิจิทัล (File sharing)',
              },
              {
                key: '0028a03c-8e0e-4cbe-90b2-82d89084fd7b',
                title:
                  'การอัพเดทข้อมูลของไฟล์ (File synchronization)',
              },
              {
                key: 'de7824ca-135b-4aee-82b0-8110a0643465',
                title:
                  'การใช้งานร่วมกันเพื่อแก้ไขไฟล์/เอกสาร (Real time File editing)',
              },
            ],
          },
        ],
      },
      {
        key: '16ce7e27-e288-4483-8aea-cba2be1ed2ca',
        widget: 'short-text',
        verticalAlignment: true,
        alias: '38e',
        title:
          '5.12 โรงพยาบาลของท่านใช้ระบบ Tele Medicine แบบพัฒนาเอง หรือระบบที่ใช้กันอย่างแพร่หลายอยู่แล้ว \nเช่น Line โปรดระบุ',
        options: [
          {
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: '2be3167d-bf65-41fd-af5f-76c5accf5b4f',
        widget: 'check-box',
        alias: '39e',
        verticalAlignment: true,
        title:
          '5.12.1 โรงพยาบาลของท่านใช้ระบบ Tele Medicine สามารถดูข้อมูลในรูปแบบใด',
        options: [
          {
            title: 'Text',
          },
          {
            title: 'รูปภาพ',
          },
          {
            title: 'File Sharing',
          },
        ],
      },
      {
        key: '59a3c698-1dff-4b4f-8fca-35d099b7fe5c',
        alias: '40e',
        widget: 'radio-box',
        title:
          '5.13 โรงพยาบาลของท่านมีระบบเพื่อป้องกันการละเมิดข้อมูลส่วนบุคคลหรือไม่',
        verticalAlignment: true,
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
            title: 'มี โปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
        score: {
          result: 1,
        },
      },
    ],
  },
];
