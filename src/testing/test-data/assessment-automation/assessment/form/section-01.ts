export const section01 = [
  {
    key: '5f5f9d9e-1a95-421a-909e-cc1dea7dba7b',
    widget: 'question-group',
    title: '1. ข้อมูลพื้นฐานของโรงพยาบาล',
    alias: '1p',
    description:
      'คำถามสำหรับผู้บริหารเทคโนโลยีสารสนเทศโรงพยาบาล (Hospital Chief Information Officer: HCIO) หรือรับผิดชอบในฐานะผู้บริหารด้านระบบเทคโนโลยีดิจิทัล',
    children: [
      {
        title:
          '1.1 โรงพยาบาลของท่าน เคยผ่านการประเมินมาตรฐานที่เกี่ยวข้องกับระบบเทคโนโลยีดิจิทัล ดังต่อไปนี้บ้าง (ตอบได้มากกว่า 1 คำตอบ)',
        key: '804caed3-5a09-4525-bfa1-6c225ded7e76',
        alias: '1a',
        verticalAlignment: true,
        required: true,
        widget: 'check-box',
        options: [
          {
            title: '1. มาตรฐาน HIMSS/EMRAM.',
          },
          {
            title:
              '2. มาตรฐาน TMI HAIT การพัฒนาคุณภาพระบบเทคโนโลยีสารสนเทศโรงพยาบาล',
          },
          {
            title:
              '3. มาตรฐาน ISO 27001 (Information Security Management System-ISMS) มาตรฐานการจัดการความมั่นคงปลอดภัยของสารสนเทศ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: '4. มาตรฐาน COBIT/ITIL',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: '5. อื่นโปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: '6. ไม่เคยผ่านการประเมิน',
          },
        ],
      },
      {
        key: 'b31a7cec-fde5-43a7-822c-4c281739141c',
        alias: '2a',
        title:
          '1.2 รพ. ของท่านมีการกำหนดผู้บริหารเทคโนโลยีสารสนเทศระดับรพ. (Chief Information Officer : CIO) ของโรงพยาบาล หรือไม่',
        widget: 'radio-box',
        logic: {
          if: [
            {
              condition: 'equal',
              value:
                '2. มี หากมีตอบข้อ 1.3 (โปรดระบุเดือน และ ปี พ.ศ. ที่ได้รับการแต่งตั้ง ในรูปแบบ MM-YYYY เช่น 01-2566)',
              target:
                'c80474c0-faba-45ac-a676-c7ac072e1a05',
            },
          ],
          else: {
            target:
              'df105cfe-370e-4f49-8ba7-2aa726acd4b0',
          },
        },
        verticalAlignment: true,
        options: [
          {
            title: '1. ไม่มี',
          },
          {
            title:
              '2. มี หากมีตอบข้อ 1.3 (โปรดระบุเดือน และ ปี พ.ศ. ที่ได้รับการแต่งตั้ง ในรูปแบบ MM-YYYY เช่น 01-2566)',
            isMore: true,
            type: 'input',
            placeholder:
              'โปรดระบุเดือน และ ปี พ.ศ. ที่ได้รับการแต่งตั้ง ในรูปแบบ MM-YYYY เช่น 01-2566',
          },
        ],
      },
      {
        key: 'c80474c0-faba-45ac-a676-c7ac072e1a05',
        alias: '3a',
        title:
          '1.3  CIO รพ.ของ ท่านได้เข้าร่วมการอบรมหลักสูตรสำหรับผู้บริหารเทคโนโลยีดิจิทัลหรือไม่ ทั้งในและต่างประเทศ (ไม่รวมถึงการเข้าร่วมสัมมนา หรือ ประชุม ทั้งในและต่างประเทศ)',
        widget: 'radio-box',
        logic: {
          if: [
            {
              condition: 'equal',
              value:
                'เคย เข้าร่วมหลักสูตรใดบ้าง ตอบเฉพาะที่มีใบ certificate (ตอบในข้อ 1.3.1 ตอบได้มากกว่า 1 คำตอบ)',
              target:
                '3ea9b26c-ab33-4296-aafa-defa730c7f8a',
            },
          ],
          else: {
            target:
              'df105cfe-370e-4f49-8ba7-2aa726acd4b0',
          },
        },
        verticalAlignment: true,
        options: [
          {
            title:
              'ไม่เคยเข้าร่วมหลักสูตร   โปรดระบุเหตุผล (ข้ามไปข้อ 1.4)',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'เคย เข้าร่วมหลักสูตรใดบ้าง ตอบเฉพาะที่มีใบ certificate (ตอบในข้อ 1.3.1 ตอบได้มากกว่า 1 คำตอบ)',
          },
        ],
      },
      {
        key: '3ea9b26c-ab33-4296-aafa-defa730c7f8a',
        alias: '4a',
        title:
          '1.3.1 เคย เข้าร่วมหลักสูตรใดบ้าง ตอบเฉพาะที่มีใบ certificate (ตอบได้มากกว่า 1 คำตอบ)',
        widget: 'check-box',
        verticalAlignment: true,
        options: [
          {
            title:
              '1. หลักสูตรผู้บริหารเทคโนโลยีสารสนเทศระดับสูง (CIO) เช่น หลักสูตร CIO รพ. รามาธิบดี หลักสูตร CIO ของ DGA ระยะเวลาที่อบรมล่าสุด',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              '2. หลักสูตรผู้บริหารทั่วไป แต่มีบทเรียนเกี่ยวกับ CIO รวมอยู่ในหลักสูตรบางส่วน ระยะเวลาที่อบรมล่าสุด',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              '3. หลักสูตร Digital Transformation เช่น หลักสูตรการสร้างกระบวนการเปลี่ยนผ่านองค์กรสู่รัฐบาลดิจิทัล ระยะเวลาที่อบรมล่าสุด',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: '4. อื่นๆ โปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: 'df105cfe-370e-4f49-8ba7-2aa726acd4b0',
        alias: '5a',
        title:
          '1.4 CIO รพ.ของ ท่านได้เข้าร่วมสัมมนา หรือประชุม ทั้งในและต่างประเทศ',
        widget: 'radio-box',
        verticalAlignment: true,
        options: [
          {
            title: 'ไม่เคยเข้าร่วม โปรดระบุเหตุผล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'เคยเข้าร่วม โปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: 'bc3f8d37-7009-41bb-8523-ff6cbd81064f',
        alias: '6a',
        title:
          '1.5 ระหว่างการดำรงตำแหน่ง CIO ภายใต้โรงพยาบาลปัจจุบัน ท่านได้มีการผลักดันให้เกิดการเปลี่ยนแปลงด้านเทคโนโลยี\nดิจิทัลและสารสนเทศจนประสบความสำเร็จ หรือสร้างชื่อเสียงให้กับโรงพยาบาลภายใต้กรอบการดำเนินงานย้อนหลังไม่เกิน\n2 ปีหรือไม่',
        description:
          'ตัวอย่าง: การริเริ่มโครงการใหม่ การปรับเปลี่ยนกระบวนการทำงาน การออกแนวทาง หรือนโยบายที่สนับสนุนการดำเนินงาน',
        widget: 'radio-box',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value:
                'มี โปรดระบุ รายละเอียด (ตอบในข้อ 1.5.1 ไม่เกิน 5 โครงการหรือแผนงาน)',
              target:
                '67811372-e0ce-4a85-b9b3-fdf028ff7d26',
            },
            {
              condition: 'equal',
              value:
                'มี โปรดระบุ รายละเอียด (ตอบในข้อ 1.5.1 ไม่เกิน 5 โครงการหรือแผนงาน)',
              target:
                '06e48bb8-def2-4765-bd17-d903bbcb840c',
            },
            {
              condition: 'equal',
              value:
                'มี โปรดระบุ รายละเอียด (ตอบในข้อ 1.5.1 ไม่เกิน 5 โครงการหรือแผนงาน)',
              target:
                '5971a6db-aec9-4045-a734-2eaeb834c790',
            },
          ],
          else: {
            target:
              '41564cac-e795-4c18-8d26-53be00bf6b04',
          },
        },
        options: [
          {
            title: 'ไม่มี โปรดระบุเหตุผล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'มี โปรดระบุ รายละเอียด (ตอบในข้อ 1.5.1 ไม่เกิน 5 โครงการหรือแผนงาน)',
          },
        ],
      },
      {
        key: '67811372-e0ce-4a85-b9b3-fdf028ff7d26',
        title:
          '1.5.1 โปรดระบุ รายละเอียด (ไม่เกิน 5 โครงการหรือแผนงาน)',
        alias: '7a',
        widget: 'short-text',
        description:
          'ตัวอย่าง : โครงการ1/แผนงาน1/นโยบาย1 ',
        verticalAlignment: true,
        addOption: true,
        maxOption: 5,
        options: [
          {
            title: 'โครงการ/แผนงาน/นโยบาย 1',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: '06e48bb8-def2-4765-bd17-d903bbcb840c',
        dependencyKey:
          '67811372-e0ce-4a85-b9b3-fdf028ff7d26',
        title:
          '1.5.1.1 โปรดระบุ รายละเอียด (ไม่เกิน 5 โครงการหรือแผนงาน)',
        alias: '8a',
        widget: 'from-data',
        description:
          'เลือกผลสำเร็จการดำเนินการของโครงการ/แผนงาน/นโยบาย',
        options: [
          [
            {
              type: 'radio',
              options: [
                'สำเร็จ',
                'อยู่ระหว่างดำเนินการ',
                'รอประเมินผล',
              ],
            },
            {
              type: 'attachment',
              placeholder: 'หลักฐานการนำไปใช้วิเคราะห์',
            },
          ],
          [
            {
              type: 'radio',
              options: [
                'สำเร็จ',
                'อยู่ระหว่างดำเนินการ',
                'รอประเมินผล',
              ],
            },
            {
              type: 'attachment',
              placeholder: 'หลักฐานการนำไปใช้วิเคราะห์',
            },
          ],
          [
            {
              type: 'radio',
              options: [
                'สำเร็จ',
                'อยู่ระหว่างดำเนินการ',
                'รอประเมินผล',
              ],
            },
            {
              type: 'attachment',
              placeholder: 'หลักฐานการนำไปใช้วิเคราะห์',
            },
          ],
          [
            {
              type: 'radio',
              options: [
                'สำเร็จ',
                'อยู่ระหว่างดำเนินการ',
                'รอประเมินผล',
              ],
            },
            {
              type: 'attachment',
              placeholder: 'หลักฐานการนำไปใช้วิเคราะห์',
            },
          ],
          [
            {
              type: 'radio',
              options: [
                'สำเร็จ',
                'อยู่ระหว่างดำเนินการ',
                'รอประเมินผล',
              ],
            },
            {
              type: 'attachment',
              placeholder: 'หลักฐานการนำไปใช้วิเคราะห์',
            },
          ],
        ],
      },
      {
        key: '5971a6db-aec9-4045-a734-2eaeb834c790',
        title:
          '1.5.1.2 ความสำเร็จของโครงการต้องสามารถวัดผลผ่านด้านใดด้านหนึ่งได้',
        description:
          'อาทิ (1) ด้านประสิทธิภาพ (ลดความผิดพลาดได้น้อยลง หรือ สร้างกลไก มาตรการ ข้อบังคับหรือดำเนินการปรับปรุงกระบวนการทำงานให้อยู่บนดิจิทัลได้สำเร็จทั้งหมดทุกขั้นตอน\nในการทำงาน) (2) ด้านเวลา (ลดเวลาการทำธุรกรรมลงเหลือไม่เกิน 3 นาทีต่อรายการ) (3) ด้านต้นทุน (ลดค่าใช้จ่ายอุปกรณ์สำนักงานได้ 5,000 บาทต่อเดือน) เป็นต้น',
        alias: '9a',
        widget: 'long-text',
        verticalAlignment: true,
        options: [
          {
            title: '',
            placeholder: 'อธิบาย แสดงผล',
          },
        ],
      },
      {
        key: '41564cac-e795-4c18-8d26-53be00bf6b04',
        widget: 'radio-box',
        title:
          '1.6  โรงพยาบาลของท่าน ประสบปัญหาหรืออุปสรรคที่ส่งผลให้การพัฒนาโรงพยาบาลไปสู่องค์กรดิจิทัลไม่เป็นไป\nตามแผนที่กำหนดไว้หรือไม่',
        description:
          'นิยามองค์กรดิจิทัลสำหรับโรงพยาบาล\nองค์กรดิจิทัลสำหรับโรงพยาบาลคือการนำเทคโนโลยีดิจิทัลมาใช้เพื่อพัฒนาระบบการบริหารจัดการในโรงพยาบาลให้มีประสิทธิภาพและเหมาะสมกับสภาพแวดล้อมที่เปลี่ยนไป\nอย่างต่อเนื่องในสังคมดิจิทัล โดยองค์กรดิจิทัลนี้จะใช้เทคโนโลยีดิจิทัล เช่น ระบบ Electronic Health Record (EHR) ในการจัดเก็บและแชร์ข้อมูลผู้ป่วยระหว่างแพทย์และบุคลากร\nทางการแพทย์อื่น ๆ รวมถึงระบบอื่น ๆ เช่น การจัดการนัดหมาย การจัดการผู้ป่วยเคลื่อนย้าย และการจัดการความเสี่ยง\nการสร้างองค์กรดิจิทัลสำหรับโรงพยาบาลจะช่วยให้การบริหารจัดการในโรงพยาบาลมีประสิทธิภาพมากขึ้น โดยสามารถลดการใช้กระดาษและช่วยประหยัดเวลาในการดำเนินงานได้\nเช่น การเข้าถึงข้อมูลผู้ป่วยที่ต้องใช้งานร่วมกัน การบันทึกข้อมูลและการแสดงผลที่เหมือนกัน โดยที่ไม่ต้องมีการพิมพ์หรือบันทึกข้อมูลซ้ำซ้อน สามารถทำให้การดำเนินงานด้าน\nการดูแลผู้ป่วยและบริหารจัดการที่ประสบความสำเร็จและมีประสิทธิภาพมากยิ่งขึ้นด้วยการใช้เทคโนโลยีดิจิทัลในการบริหารจัดการในโรงพยาบาล',
        alias: '10a',
        logic: {
          if: [
            {
              target:
                'ab29681b-315e-4008-8648-20a949defabf',
              condition: 'equal',
              value: 'มี โปรดระบุ (ในข้อ 1.6.1)',
            },
          ],
          else: {
            target:
              'da8c76c0-2e75-4732-901c-fd867c38e7d3',
          },
        },
        options: [
          {
            title: 'ไม่มี (ข้ามไปข้อ 1.7)',
          },
          {
            title: 'มี โปรดระบุ (ในข้อ 1.6.1)',
          },
        ],
      },
      {
        key: 'ab29681b-315e-4008-8648-20a949defabf',
        widget: 'check-box',
        title:
          '1.6.1  โรงพยาบาลของท่าน ประสบปัญหาหรืออุปสรรคที่ส่งผลให้การพัฒนาโรงพยาบาลไปสู่องค์กรดิจิทัลไม่เป็นไป\nตามแผนที่กำหนดไว้หรือไม่',
        description: 'มี โปรดระบุ',
        alias: '11a',
        verticalAlignment: true,
        options: [
          {
            title:
              'อุปสรรคปัญหาด้านนโยบายและแนวทางการปฏิบัติด้านดิจิทัล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'อุปสรรคปัญหาด้านศักยภาพ ความสามารถและทักษะด้านดิจิทัลของเจ้าหน้าที่ในโรงพยาบาลของท่าน',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'อุปสรรคปัญหาด้านการให้บริการผ่านระบบดิจิทัล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'อุปสรรคปัญหาต่อการเชื่อมโยงระบบและข้อมูลภายในและภายนอกโรงพยาบาลของท่าน',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'อุปสรรคปัญหาด้านความมั่นคงปลอดภัยของระบบเทคโนโลยีสารสนเทศและข้อมูล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'อุปสรรคปัญหาด้านเทคโนโลยีดิจิทัลและการนำไปใช้',
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
        key: 'da8c76c0-2e75-4732-901c-fd867c38e7d3',
        widget: 'radio-box',
        title:
          '1.7 โรงพยาบาลของท่าน เคยใช้บริการระบบบริการดังนี้ หรือไม่',
        description:
          'ระบบบริการภาคบังคับ e-GP, GFMIS, ระบบเบิกจ่ายของกองทุน e-claim, กรมบัญชีกลาง',
        alias: '12a',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value:
                'ใช้แล้ว โปรดระบุบริการ (ในข้อ 1.7.1)',
              target:
                'b14d0d01-1875-441d-a1c2-ed5b9fc06907',
            },
          ],
          else: {
            target:
              '563da068-fb1d-45e4-a5be-c26b761cc153',
          },
        },
        options: [
          {
            title: 'ยังไม่เคยใช้',
          },
          {
            title: 'ใช้แล้ว โปรดระบุบริการ (ในข้อ 1.7.1)',
          },
        ],
      },
      {
        key: 'b14d0d01-1875-441d-a1c2-ed5b9fc06907',
        title:
          '1.7.1 โรงพยาบาลของท่าน เคยใช้บริการระบบบริการดังนี้ หรือไม่',
        alias: '13a',
        widget: 'short-text',
        description:
          'ใช้แล้ว โปรดระบุ (ระบบบริการภาคบังคับ e-GP, GFMIS, ระบบเบิกจ่ายของกองทุน e-claim, กรมบัญชีกลาง)',
        required: false,
        addOption: true,
        verticalAlignment: true,
        options: [
          {
            title: 'โปรดระบุ',
            placeholder:
              'ชื่อบริการ…………………………………………ชื่อองค์กรผู้ให้บริการ……………………………………………',
          },
        ],
      },
      {
        key: '563da068-fb1d-45e4-a5be-c26b761cc153',
        widget: 'radio-box',
        title:
          '1.7.2 โรงพยาบาลของท่าน เคยใช้บริการระบบบริการดังนี้ หรือไม่',
        description:
          'ระบบบริการที่ไม่ใช่ภาคบังคับ อาทิเช่น e-saraban, e-signature, e-Tax/receipt, eMDC Medical death certificate, e-billing ของสำนักงบประมาณ เป็นต้น',
        alias: '14a',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value:
                'ใช้แล้ว โปรดระบุบริการ (ในข้อ 1.7.2.1)',
              target:
                'fe28b073-1cef-42bd-97cb-8d48d3c839be',
            },
          ],
          else: {
            target:
              'a7e01e30-3672-4193-b1cf-592eeb2417bf',
          },
        },
        options: [
          {
            title: 'ยังไม่เคยใช้',
          },
          {
            title:
              'ใช้แล้ว โปรดระบุบริการ (ในข้อ 1.7.2.1)',
          },
        ],
      },
      {
        key: 'fe28b073-1cef-42bd-97cb-8d48d3c839be',
        title:
          '1.7.2.1 โรงพยาบาลของท่าน เคยใช้บริการระบบบริการดังนี้ หรือไม่',
        alias: '15a',
        widget: 'short-text',
        verticalAlignment: true,
        description:
          'ใช้แล้ว โปรดระบุ (ระบบบริการที่ไม่ใช่ภาคบังคับ อาทิเช่น e-saraban, e-signature, e-Tax/receipt, eMDC Medical death certificate, e-billing ของสำนักงบประมาณ เป็นต้น)',
        required: false,
        addOption: true,
        options: [
          {
            title: 'โปรดระบุ',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'โปรดระบุ',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'โปรดระบุ',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'โปรดระบุ',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
    ],
  },
];