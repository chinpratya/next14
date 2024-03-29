export const section07 = [
  {
    key: '3285b9ff-4f41-4b73-a586-ff33552e124d',
    widget: 'question-group',
    title:
      '7.ข้อเสนอแนะอื่น ๆ โรงพยาบาลสามารถให้ข้อเสนอแนะเพื่อเป็นกรณีศึกษา และปรับปรุงการประเมินในปีถัดไป',
    alias: '7p',
    children: [
      {
        key: 'be62a0d3-ce04-42e5-9384-e90fab595c10',
        widget: 'radio-box',
        alias: '1g',
        verticalAlignment: true,
        title:
          '7.1 หน่วยงานของท่านต้องการองค์ความรู้หรือการสนันสนุนเพิ่มเติมจากภาครัฐในประเด็นต่าง ๆ ในด้าน Cybersecurity ดังต่อไปนี้ หรือไม่',
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี (ตอบข้อ 7.1.1 )',
              target:
                '1f664c53-182a-4fb3-9fc4-9f6a26d96582',
            },
          ],
          else: {
            target:
              '46f6dace-5f65-402d-a3d5-5c3c17317201',
          },
        },
        options: [
          {
            title: 'มี (ตอบข้อ 7.1.1 )',
          },
          {
            title: 'ไม่มี (ข้ามไปข้อ 7.2)',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุเหตุผล',
          },
        ],
      },
      {
        key: '1f664c53-182a-4fb3-9fc4-9f6a26d96582',
        widget: 'check-box',
        alias: '2g',
        verticalAlignment: true,
        title:
          '7.1.1 เลือกประเด็นต่าง ๆ ในด้านCybersecurity ที่หน่วยงานของท่านต้องการองค์ความรู้หรือการสนันสนุนเพิ่มเติมจากภาครัฐดัง',
        options: [
          {
            title: 'ด้านพัฒนาศักยภาพบุคลากร',
          },
          {
            title: 'ด้านนโยบาย',
          },
          {
            title: 'ด้านเทคโนโลยี',
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
        key: '46f6dace-5f65-402d-a3d5-5c3c17317201',
        widget: 'long-text',
        alias: '3g',
        verticalAlignment: true,
        title:
          '7.2 ท่านอยากให้โรงพยาบาลมีการพัฒนาด้านความมั่นคงปลอดภัยในระบบเทคโนโลยีสารสนเทศอย่างไร',
        options: [
          {
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: 'c53a5330-9b5c-4daf-830e-e75fe531241e',
        widget: 'long-text',
        alias: '4g',
        verticalAlignment: true,
        title: '7.3 ข้อเสนอแนะหรือความคิดเห็นเพิ่มเติม',
        options: [
          {
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: '12f82b8b-2fe9-44c7-ae2c-033d23017028',
        widget: 'statement',
        alias: '5g',
        verticalAlignment: true,
        title: 'สรุปแบบสอบถาม',
        description: `
                 สรุปแบบสอบถามนี้จะนำไปประเมินระดับความพร้อมของระบบเทคโนโลยีสารสนเทศในการให้บริการแก่ผู้ใช้งาน และเพื่อประเมินความเหมาะสมของระบบเทคโนโลยีสารสนเทศที่ใช้ในโรงพยาบาล
ว่าตอบสนองความต้องการของผู้ใช้งาน และให้ข้อมูลเพื่อการวางแผนและการพัฒนาระบบเทคโนโลยีสารสนเทศ ในอนาคตเพื่อปรับปรุงและพัฒนาระบบให้เหมาะสมกับความต้องการของผู้ใช้งาน
ปรับปรุงกระบวนการให้บริการด้านเทคโนโลยีสารสนเทศให้มีประสิทธิภาพและสามารถตอบสนองความต้องการของผู้ใช้งานได้อย่างเหมาะสม ตรวจสอบและปรับปรุงระบบรักษาความปลอดภัยของ
ข้อมูลส่วนบุคคลและการรักษาความลับของข้อมูลในระบบเทคโนโลยีสารสนเทศในโรงพยาบาลรัฐ
          ในการนี้ ทางสถาบันรับรองคุณภาพสถานพยาบาล ขอขอบคุณโรงพยาบาลที่ให้การอนุเคราะห์ ตอบแบบสอบถามประเมินตนเอง ทั้งนี้ สรพ.จะนำส่งผลการประเมินให้กับโรงพยาบาล
ภายหลังการวิเคราะห์ข้อมูล เรียบร้อยแล้ว ในระยะเวลาที่กำหนด
        `,
      },
    ],
  },
];
