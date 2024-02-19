import { faker } from '@faker-js/faker';

import { uid } from '@/utils';

import { form } from './form';

export const assessmentParentData = [
  {
    key: '1x6sssssuf7022gklkx6yr8',
    widget: 'question-group',
    title: '1. ข้อมูลพื้นฐานของโรงพยาบาล',
  },
  {
    key: '1dj777779ms0fauyjvp63en',
    title: '2. แผนแม่บทเทคโนโลยีสารสนเทศ',
    widget: 'question-group',
  },
  {
    key: '1dj777779ms0fauydfv63en',
    title:
      '3. การจัดการความเสี่ยงในระบบเทคโนโลยีสารสนเทศ',
    widget: 'question-group',
  },
];

export const assessmentData = [
  {
    key: '1my05ikaoumun9r',
    widget: 'statement',
    title:
      'แบบสํารวจระดับความพร้อมระบบเทคโนโลยีสารสนเทศโรงพยาบาลรัฐ ประจําปี 2566',
    value: `<p><strong>วัตถุประสงค์ของการสำรวจความพร้อมของระบบเทคโนโลยีสารสนเทศ สามารถระบุได้ดังนี้</strong><br />
    1. เพื่อประเมินระดับความพร้อมของระบบเทคโนโลยีสารสนเทศในการให้บริการแก่ผู้ใช้งานว่ามีประสิทธิภาพและประสิทธิผลในการใช้งาน<br />
    2. เพื่อประเมินความเหมาะสมของระบบเทคโนโลยีสารสนเทศที่ใช้ในโรงพยาบาลว่าตอบสนองความต้องการของผู้ใช้งานและการให้บริการได้อย่างเหมาะสม<br />
    3. เพื่อให้ข้อมูลเพื่อการวางแผนและการพัฒนาระบบเทคโนโลยีสารสนเทศในอนาคตเพื่อปรับปรุงและพัฒนาระบบให้เหมาะสมกับความต้องการของผู้ใช้งาน<br />
    4. เพื่อช่วยปรับปรุงกระบวนการให้บริการด้านเทคโนโลยีสารสนเทศให้มีประสิทธิภาพและสามารถตอบสนองความต้องการของผู้ใช้งานได้อย่างเหมาะสม<br />
    5. เพื่อตรวจสอบและปรับปรุงระบบรักษาความปลอดภัยของข้อมูลส่วนบุคคลและการรักษาความลับของข้อมูลในระบบเทคโนโลยีสารสนเทศในโรงพยาบาลรัฐ<br />
    </p>
    <p><strong>แบบสำรวจประกอบด้วยคำถาม 2 ประเภท คือ</strong><br />
    1) คำถามปลายปิด คือ คำถามแบบให้เลือกตอบในตัวเลือกที่กำหนดไว้แล้ว โดยใส่เครื่องหมาย ลงในช่อง หมายถึง ตอบได้มากกว่า 1 คำตอบ
    หรือ หมายถึง ตอบได้คำตอบเดียว <br />
    2) คำถามปลายเปิด คือ คำถามที่เว้นช่องว่างสำหรับกรอกข้อความเพื่อกรอกรายละเอียดของคำตอบ
    </p>`,
  },
  {
    ...assessmentParentData[0],
    value:
      '<p>คำถามสำหรับผู้บริหารเทคโนโลยีสารสนเทศโรงพยาบาล (Hospital Chief Information Officer: HCIO) หรือรับผิดชอบในฐานะผู้บริหารด้านระบบเทคโนโลยีดิจิทัล</p>',
    children: [
      {
        key: '1onweeeed6m0p1kmr7cux5b',
        widget: 'check-box',
        title:
          '1.1 โรงพยาบาลของท่าน เคยผ่านการประเมินมาตรฐานที่เกี่ยวข้องกับระบบเทคโนโลยีดิจิทัล ดังต่อไปนี้บ้าง (ตอบได้มากกว่า 1 คำตอบ)',
        parent: assessmentParentData[0].key,
        options: [
          '1. มาตรฐาน HIMSS/EMRAM',
          '2. มาตรฐาน TMI HAIT การพัฒนาคุณภาพระบบเทคโนโลยีสารสนเทศโรงพยาบาล',
          '3. มาตรฐาน ISO 27001 (Information Security Management System-ISMS) มาตรฐานการจัดการความมั่นคงปลอดภัยของสารสนเทศ',
          '4. มาตรฐาน COBIT/ITIL',
          '5. อื่น ๆ โปรดระบุ',
          '6. ไม่เคยผ่านการประเมิน',
        ],
        optionMore: [
          false,
          false,
          true,
          true,
          true,
          false,
        ],
      },
      {
        key: '1bw3llllkseo0bpvjlw1rswu',
        widget: 'radio-box',
        options: [
          '1. มี (โปรดระบุเดือน และปี พ.ศ. ที่ได้รับการแต่งตั้ง)',
          '2. ไม่มี',
        ],
        optionMore: [true, false],
        parent: assessmentParentData[0].key,
        title:
          '1.2 รพ. ของท่านมีการกำหนดผู้บริหารเทคโนโลยีสารสนเทศระดับรพ. (Chief Information Officer : CIO) ของโรงพยาบาล หรือไม่',
      },
      {
        key: uid(),
        widget: 'radio-box',
        options: [
          'ไม่เคยเข้าร่วมหลักสูตร โปรดระบุเหตุผล (ข้ามไปข้อ 1.5)',
          'เคย เข้าร่วมหลักสูตรใดบ้าง ตอบเฉพาะที่มีใบ certificate (ตอบในข้อ 1.3.1 ตอบได้มากกว่า 1 คำตอบ)',
        ],
        optionMore: [true, false],
        parent: assessmentParentData[0].key,
        title:
          '1.3  CIO รพ.ของ ท่านได้เข้าร่วมการอบรมหลักสูตรสำหรับผู้บริหารเทคโนโลยีดิจิทัลหรือไม่ ทั้งในและต่างประเทศ) (ไม่รวมถึงการเข้าร่วม)',
      },
      {
        key: '11wp77775kt00ng538vlubr',
        widget: 'check-box',
        options: [
          '1. หลักสูตรผู้บริหารเทคโนโลยีสารสนเทศระดับสูง (CIO) เช่น หลักสูตร CIO รพ. รามาธิบดี หลักสูตร CIO ของ DGA ระยะเวลาที่อบรมล่าสุด',
          '2. หลักสูตรผู้บริหารทั่วไป แต่มีบทเรียนเกี่ยวกับ CIO รวมอยู่ในหลักสูตรบางส่วน ระยะเวลาที่อบรมล่าสุด',
          '3. หลักสูตร Digital Transformation เช่น หลักสูตรการสร้างกระบวนการเปลี่ยนผ่านองค์กรสู่รัฐบาลดิจิทัล ระยะเวลาที่อบรมล่าสุด',
          '4. อื่นๆ โปรดระบุ',
        ],
        optionMore: [true, true, true, true],
        parent: assessmentParentData[0].key,
        title:
          '1.3.1 เคย เข้าร่วมหลักสูตรใดบ้าง ตอบเฉพาะที่มีใบ certificate (ตอบได้มากกว่า 1 คำตอบ)',
      },
      {
        key: 'ty3llllmte0i5wbmlvwz',
        widget: 'radio-box',
        options: [
          'ไม่เคยเข้าร่วม โปรดระบุเหตุผล',
          'เคยเข้าร่วม โปรดระบุ',
        ],
        optionMore: [true, true],
        parent: assessmentParentData[0].key,
        title:
          '1.4 CIO รพ.ของ ท่านได้เข้าร่วมสัมมนา หรือประชุม ทั้งในและต่างประเทศ',
      },
      {
        key: '10dsssssuf70b508apdkn46',
        widget: 'radio-box',
        options: [
          'ไม่มี โปรดระบุเหตุผล',
          'มี โปรดระบุ รายละเอียด (ตอบในข้อ 15.1.1 ไม่เกิน 5 โครงการหรือแผนงาน)',
        ],
        optionMore: [true, false],
        parent: assessmentParentData[0].key,
        title:
          '1.5 ระหว่างการดำรงตำแหน่ง CIO ภายใต้โรงพยาบาลปัจจุบัน ท่านได้มีการผลักดันให้เกิดการเปลี่ยนแปลงด้านเทคโนโลยี ดิจิทัลและสารสนเทศจนประสบความสำเร็จ หรือสร้างชื่อเสียงให้กับโรงพยาบาลภายใต้กรอบการดำเนินงานย้อนหลังไม่เกิน 2 ปีหรือไม่',
      },
      {
        key: '1c8assssse7c0rluz31qdt2',
        widget: 'short-text',
        title:
          '1.5.1 โปรดระบุ รายละเอียด (ไม่เกิน 5 โครงการหรือแผนงาน)',
        label:
          '<p>ตัวอย่าง : โครงการ1/แผนงาน1/นโยบาย1</p>',
        options: [
          'โปรดระบุ',
          'โปรดระบุ',
          'โปรดระบุ',
          'โปรดระบุ',
          'โปรดระบุ',
        ],
        parent: assessmentParentData[0].key,
      },
      {
        key: 'y3i0c3zabwo1fco',
        widget: 'form-data',
        title:
          '1.5.1.1 โปรดระบุ รายละเอียด (ไม่เกิน 5 โครงการหรือแผนงาน)',
        label:
          '<p>เลือกผลสำเร็จการดำเนินการของโครงการ/แผนงาน/นโยบาย</p>',
        options: [
          {
            key: uid(),
            title: 'โปรแกรม 1',
            type: 'radio',
            options: [
              'สำเร็จ',
              'อยู่ระหว่างดำเนินการ',
              'รอประเมินผล',
            ],
            upload: true,
            uploadText: 'หลักฐานการนำไปใช้วิเคราะห์',
          },
          {
            key: uid(),
            title: 'โปรแกรม 2',
            type: 'radio',
            options: [
              'สำเร็จ',
              'อยู่ระหว่างดำเนินการ',
              'รอประเมินผล',
            ],
            upload: true,
            uploadText: 'หลักฐานการนำไปใช้วิเคราะห์',
          },
          {
            key: uid(),
            title: 'โปรแกรม 3',
            type: 'radio',
            options: [
              'สำเร็จ',
              'อยู่ระหว่างดำเนินการ',
              'รอประเมินผล',
            ],
            upload: true,
            uploadText: 'หลักฐานการนำไปใช้วิเคราะห์',
          },
          {
            key: uid(),
            title: 'โปรแกรม 4',
            type: 'radio',
            options: [
              'สำเร็จ',
              'อยู่ระหว่างดำเนินการ',
              'รอประเมินผล',
            ],
            upload: true,
            uploadText: 'หลักฐานการนำไปใช้วิเคราะห์',
          },
          {
            key: uid(),
            title: 'โปรแกรม 5',
            type: 'radio',
            options: [
              'สำเร็จ',
              'อยู่ระหว่างดำเนินการ',
              'รอประเมินผล',
            ],
            upload: true,
            uploadText: 'หลักฐานการนำไปใช้วิเคราะห์',
          },
        ],
        parent: assessmentParentData[0].key,
      },
      {
        key: '1dj777779ms0fauyjvp63eg',
        title:
          '1.5.1.2 ความสำเร็จของโครงการต้องสามารถวัดผลผ่านด้านใดด้านหนึ่งได้',
        label:
          '<p>อาทิ (1) ด้านประสิทธิภาพ (ลดความผิดพลาดได้น้อยลง หรือ สร้างกลไก มาตรการ ข้อบังคับหรือดำเนินการปรับปรุงกระบวนการทำงานให้อยู่บนดิจิทัลได้สำเร็จทั้งหมดทุกขั้นตอน' +
          'ในการทำงาน) (2) ด้านเวลา (ลดเวลาการทำธุรกรรมลงเหลือไม่เกิน 3 นาทีต่อรายการ) (3) ด้านต้นทุน (ลดค่าใช้จ่ายอุปกรณ์สำนักงานได้ 5,000 บาทต่อเดือน) เป็นต้น</p>',
        widget: 'long-text',
        placeholder: 'อธิบาย แสดงผล',
        parent: assessmentParentData[0].key,
      },
      {
        key: '1dj777779ms0fauyjvp63eh',
        title:
          '1.6 โรงพยาบาลของท่าน ประสบปัญหาหรืออุปสรรคที่ส่งผลให้การพัฒนาโรงพยาบาลไปสู่องค์กรดิจิทัลไม่เป็นไป ตามแผนที่กำหนดไว้หรือไม่',
        widget: 'radio-box',
        label:
          '<p>นิยามองค์กรดิจิทัลสำหรับโรงพยาบาล\n' +
          'องค์กรดิจิทัลสำหรับโรงพยาบาลคือการนำเทคโนโลยีดิจิทัลมาใช้เพื่อพัฒนาระบบการบริหารจัดการในโรงพยาบาลให้มีประสิทธิภาพและเหมาะสมกับสภาพแวดล้อมที่เปลี่ยนไป\n' +
          'อย่างต่อเนื่องในสังคมดิจิทัล โดยองค์กรดิจิทัลนี้จะใช้เทคโนโลยีดิจิทัล เช่น ระบบ Electronic Health Record (EHR) ในการจัดเก็บและแชร์ข้อมูลผู้ป่วยระหว่างแพทย์และบุคลากร\n' +
          'ทางการแพทย์อื่น ๆ รวมถึงระบบอื่น ๆ เช่น การจัดการนัดหมาย การจัดการผู้ป่วยเคลื่อนย้าย และการจัดการความเสี่ยง\n' +
          'การสร้างองค์กรดิจิทัลสำหรับโรงพยาบาลจะช่วยให้การบริหารจัดการในโรงพยาบาลมีประสิทธิภาพมากขึ้น โดยสามารถลดการใช้กระดาษและช่วยประหยัดเวลาในการดำเนินงานได้\n' +
          'เช่น การเข้าถึงข้อมูลผู้ป่วยที่ต้องใช้งานร่วมกัน การบันทึกข้อมูลและการแสดงผลที่เหมือนกัน โดยที่ไม่ต้องมีการพิมพ์หรือบันทึกข้อมูลซ้ำซ้อน สามารถทำให้การดำเนินงานด้าน\n' +
          'การดูแลผู้ป่วยและบริหารจัดการที่ประสบความสำเร็จและมีประสิทธิภาพมากยิ่งขึ้นด้วยการใช้เทคโนโลยีดิจิทัลในการบริหารจัดการในโรงพยาบาล</p>',
        options: [
          'ไม่มี (ข้ามไปข้อ 1.7)',
          'มี โปรดระบุ (ในข้อ 1.6.1) ',
        ],
        parent: assessmentParentData[0].key,
      },
      {
        key: '1dj777779ms0fauyjvp63ei',
        title:
          '1.6.1  โรงพยาบาลของท่าน ประสบปัญหาหรืออุปสรรคที่ส่งผลให้การพัฒนาโรงพยาบาลไปสู่องค์กรดิจิทัลไม่เป็นไป\n' +
          'ตามแผนที่กำหนดไว้หรือไม่',
        label: '<p>มี โปรดระบุ</p>',
        widget: 'check-box',
        options: [
          'อุปสรรคปัญหาด้านนโยบายและแนวทางการปฏิบัติด้านดิจิทัล',
          'อุปสรรคปัญหาด้านศักยภาพ ความสามารถและทักษะด้านดิจิทัลของเจ้าหน้าที่ในโรงพยาบาลของท่าน',
          'อุปสรรคปัญหาด้านการให้บริการผ่านระบบดิจิทัล',
          'อุปสรรคปัญหาต่อการเชื่อมโยงระบบและข้อมูลภายในและภายนอกโรงพยาบาลของท่าน',
          'อุปสรรคปัญหาด้านความมั่นคงปลอดภัยของระบบเทคโนโลยีสารสนเทศและข้อมูล',
          'อุปสรรคปัญหาด้านเทคโนโลยีดิจิทัลและการนำไปใช้',
          'อื่นๆ',
        ],
        optionMore: [
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ],
        parent: assessmentParentData[0].key,
      },
      {
        key: '1dj777779ms0fauyjvp63ej',
        widget: 'radio-box',
        title:
          '1.7 โรงพยาบาลของท่าน เคยใช้บริการระบบบริการดังนี้ หรือไม่',
        label:
          '<p>ระบบบริการภาคบังคับ e-GP, GFMIS, ระบบเบิกจ่ายของกองทุน e-claim, กรมบัญชีกลาง</p>',
        options: [
          'ยังไม่เคยใช้',
          'ใช้แล้ว โปรดระบุบริการ (ในข้อ 1.7.1)',
        ],
        optionMore: [true, true],
        parent: assessmentParentData[0].key,
      },
      {
        key: '1dj777779ms0fauyjvp63ek',
        widget: 'short-text',
        title:
          '1.7.1 โรงพยาบาลของท่าน เคยใช้บริการระบบบริการดังนี้ หรือไม่',
        label:
          '<p>ใช้แล้ว โปรดระบุ (ระบบบริการภาคบังคับ e-GP, GFMIS, ระบบเบิกจ่ายของกองทุน e-claim, กรมบัญชีกลาง)</p>',
        options: [
          'ชื่อบริการ.................ชื่อองค์กรผู้ให้บริการ',
          'โปรดระบุ',
          'โปรดระบุ',
          'โปรดระบุ',
          'โปรดระบุ',
        ],
        parent: assessmentParentData[0].key,
      },
      {
        key: '1dj777779ms0fauyjvp63el',
        title:
          '1.7.2 โรงพยาบาลของท่าน เคยใช้บริการระบบบริการดังนี้ หรือไม่',
        label:
          '<p>ระบบบริการที่ไม่ใช่ภาคบังคับ อาทิเช่น e-saraban, e-signature, e-Tax/receipt, eMDC Medical death certificate, e-billing ของสำนักงบประมาณ เป็นต้น</p>',
        widget: 'radio-box',
        options: [
          'ยังไม่เคยใช้',
          'ใช้แล้ว โปรดระบุบริการ (ในข้อ 1.7.2.1)',
        ],
        parent: assessmentParentData[0].key,
      },
      {
        key: '1dj777779ms0fauyjvp63em',
        widget: 'short-text',
        useAdditionalOption: true,
        title:
          '1.7.2.1 โรงพยาบาลของท่าน เคยใช้บริการระบบบริการดังนี้ หรือไม่',
        label:
          '<p>ใช้แล้ว โปรดระบุ (ระบบบริการที่ไม่ใช่ภาคบังคับ อาทิเช่น e-saraban, e-signature, e-Tax/receipt, eMDC Medical death certificate, e-billing ของสำนักงบประมาณ เป็นต้น)</p>',
        options: [
          'โปรดระบุ',
          'โปรดระบุ',
          'โปรดระบุ',
          'โปรดระบุ',
        ],
        parent: assessmentParentData[0].key,
      },
    ],
  },
  {
    ...assessmentParentData[1],
    children: [
      {
        key: '1dj777779ms0fauyjvp54en',
        widget: 'radio-box',
        title:
          '2.1 โรงพยาบาลของท่าน มีการจัดทำแผนแม่บทเทคโนโลยีสารสนเทศ ที่ได้มาตรฐานสอดคล้องกับแผนยุทธศาสตร์ของโรงพยาบาล หรือไม่',
        options: [
          'ไม่สอดคล้อง',
          'สอดคล้อง โปรดระบุ ตัวอย่างที่สอดคล้องที่ 1 -2 ตัวอย่าง',
        ],
        optionMore: [false, true],
        parent: assessmentParentData[1].key,
      },
      {
        key: '1dj777779ms0fauyjvp54eo',
        widget: 'radio-box',
        title:
          '2.2 โรงพยาบาลของท่าน มีนโยบายและแผนการปฏิบัติด้านเทคโนโลยีสารสนเทศของโรงพยาบาลหรือไม่',
        options: [
          'ไม่มีการจัดทำ โปรดระบุเหตุผล',
          'มีการจัดทำ',
        ],
        optionMore: [true, true],
        extensions: [null, 'upload'],
        parent: assessmentParentData[1].key,
      },
      {
        key: '1dj777779ms0fauyjvp54ep',
        widget: 'radio-box',
        title:
          '2.3 โรงพยาบาลของท่าน มีแผนปฏิบัติการ 1-3 ปี และมีการสื่อสารแผนไปสู่ผู้ที่เกี่ยวข้อง เพื่อรองรับการก้าวไปสู่รัฐบาลดิจิทัลของประเทศไทยหรือไม่',
        options: [
          'ไม่มีการจัดทำ โปรดระบุเหตุผล',
          'มีการจัดทำแผน แต่ยังไม่มีการสื่อสาร โปรดระบุเหตุผล',
          'มีการจัดทำแผนและการสื่อสาร',
        ],
        optionMore: [true, true, true],
        extensions: [null, null, 'upload'],
        parent: assessmentParentData[1].key,
      },
      {
        key: '1dj777779ms0fauyjvp54eq',
        widget: 'radio-box',
        title:
          '2.4 เมื่อดำเนินการตามแผนการปฏิบัติด้านเทคโนโลยีสารสนเทศแล้วมีการประเมินผลและดำเนินการปรับแผนในปีถัดไปหรือไม่',
        options: [
          'ไม่มีการจัดทำ โปรดระบุเหตุผล',
          'มีการจัดทำ',
        ],
        optionMore: [true, true],
        extensions: [null, 'upload'],
        parent: assessmentParentData[1].key,
      },
    ],
  },
  {
    ...assessmentParentData[2],
    children: [
      {
        key: '1dj777779ms0fauyjvp54er',
        widget: 'radio-box',
        title:
          '3.1 โรงพยาบาลของท่าน มีแผนจัดการความเสี่ยงเป็นลายลักษณ์อักษร โดยกำหนดกลยุทธ์โครงการ ระยะเวลาดำเนินการผู้รับผิดชอบ อย่างชัดเจน',
        options: ['ไม่มี', 'มี'],
        parent: assessmentParentData[2].key,
      },
      {
        key: '1dj777779ms0fauyjvp54es',
        widget: 'radio-box',
        title:
          '3.2 โรงพยาบาลของท่าน มีกระบวนการประเมินและให้คะแนนความเสี่ยงของระบบสารสนเทศอย่างเป็นระบบโดยการมีส่วนร่วมของทุกฝ่าย',
        options: ['ไม่มี', 'มี'],
        parent: assessmentParentData[2].key,
      },
      {
        key: '1dj777779ms0fauyjvp54et',
        widget: 'radio-box',
        title:
          '3.3 โรงพยาบาลของท่าน มีการดำเนินการตามแผนจัดการความเสี่ยง',
        options: ['ไม่มี', 'มี'],
        parent: assessmentParentData[2].key,
      },
      {
        key: '1dj777779ms0fauyjvp54eu',
        widget: 'radio-box',
        title:
          '3.4 โรงพยาบาลของท่าน มีการติดตาม ประเมินผลการดำเนินการจัดการความเสี่ยง และวิเคราะห์ผลการประเมินจัดทำเป็นรายงาน',
        options: ['ไม่มี', 'มี'],
        parent: assessmentParentData[2].key,
      },
      {
        key: '1dj777779ms0fauyjvp54ev',
        widget: 'radio-box',
        title:
          '3.5 โรงพยาบาลของท่าน มีการนำผลการประเมินการดำเนินการจัดการความเสี่ยงมาปรับแผนการจัดการความเสี่ยงให้ดีขึ้น',
        options: ['ไม่มี', 'มี'],
        parent: assessmentParentData[2].key,
      },
      {
        key: '1dj777779ms0fauyjvp54ew',
        widget: 'radio-box',
        title:
          '3.6 โรงพยาบาลของท่าน มีการจัดทำนโยบายและระเบียบปฏิบัติด้านความมั่นคงปลอดภัยในระบบเทคโนโลยีสารสนเทศหรือไม่',
        options: ['ไม่มี', 'มี'],
        parent: assessmentParentData[2].key,
      },
      {
        key: '1dj777779ms0fauyjvp54ex',
        widget: 'radio-box',
        title:
          '3.7 โรงพยาบาลของท่าน มีนโยบายและระเบียบปฏิบัติที่อนุญาตให้เฉพาะผู้ที่รับผิดชอบดูแลรักษาผู้ป่วยในช่วงเวลาปัจจุบันเท่านั้นที่จะเข้าถึงข้อมูลผู้ป่วยรายนั้นได้',
        options: ['ไม่มี', 'มี'],
        parent: assessmentParentData[2].key,
      },
      {
        key: '1dj777779ms0fauyjvp54ey',
        widget: 'radio-box',
        title:
          '3.8 โรงพยาบาลของท่าน มีนโยบายและระเบียบปฏิบัติที่ป้องกันความลับผู้ป่วยมิให้รั่วไหลทุกช่องทางรวมทั้งช่องทางSocial Media ทุกด้าน',
        options: ['ไม่มี', 'มี'],
        parent: assessmentParentData[2].key,
      },
      {
        key: '1dj777779ms0fauyjvp54ez',
        widget: 'radio-box',
        title:
          '3.9 โรงพยาบาลของท่าน มีการประชาสัมพันธ์นโยบายและระเบียบปฏิบัติให้บุคลากรทุกคนได้รับทราบ',
        options: ['ไม่มี', 'มี'],
        parent: assessmentParentData[2].key,
      },
      {
        key: '1dj777779ms0fauyjvp54f0',
        widget: 'radio-box',
        title:
          '3.10 โรงพยาบาลของท่าน มีการตรวจสอบว่าบุคลากรได้รับทราบ เข้าใจ ยอมรับ และปฏิบัติตามระเบียบปฏิบัติด้านความมั่นคงปลอดภัยอย่างเคร่งครัด',
        options: ['ไม่มี', 'มี'],
        parent: assessmentParentData[2].key,
      },
      {
        key: '1dj777779ms0fauyjvp54f1',
        widget: 'radio-box',
        title:
          '3.11 โรงพยาบาลของท่าน มีการประเมินผลการปฏิบัติตามระเบียบปฏิบัติและนำผลการประเมินมาปรับกระบวนการบังคับใช้ระเบียบปฏิบัติต่อไป',
        options: ['ไม่มี', 'มี'],
        parent: assessmentParentData[2].key,
      },
    ],
  },
];

export const list = [
  {
    ObjectUUID: '71c8818b-9777-4a06-b3ef-cca00d0e9ea9',
    name:
      'แบบสำรวจระดับความพร้อมของระบบ ' +
      faker.company.name(),
    formName: 'แบบสำรวจระดับความพร้อมของระบบ',
    group: 'ความพร้อม',
    status: 'waiting_progress',
    form: JSON.stringify(assessmentData),
    createdDt: faker.date.recent(1).toString(),
    createdBy:
      faker.name.firstName() +
      ' ' +
      faker.name.lastName(),
    startDt: '06/01/2023 14:30',
    endDt: '06/02/2023 15:30',
    updatedDt: '10/04/2566 10:00',
    updatedBy: 'นาย สมชาย สมบัติ',
    sendDt: faker.date.recent(1).toString(),
    deadlineDt: faker.date.recent(1).toString(),
    approveDt: '',
  },
  {
    ObjectUUID: 'cfe2de3f-3c3f-495e-b0bd-f0be803cc2ba',
    name:
      'แบบสำรวจระดับความพร้อมของระบบ ' +
      faker.company.name(),
    formName: 'แบบสำรวจระดับความพร้อมของระบบ',
    group: 'ความพร้อม',
    status: 'in_progress',
    form: JSON.stringify(assessmentData),
    createdDt: faker.date.recent(1).toString(),
    createdBy:
      faker.name.firstName() +
      ' ' +
      faker.name.lastName(),
    startDt: '06/01/2023 14:30',
    endDt: '06/01/2023 15:30',
    updatedDt: '10/04/2566 10:00',
    updatedBy: 'นาย สมชาย สมบัติ',
    sendDt: faker.date.recent(1).toString(),
    deadlineDt: faker.date.recent(1).toString(),
    approveDt: '',
  },
  {
    ObjectUUID: '9a3175d3-1fa5-4b3e-a7e9-55885db73bb8',
    name:
      'แบบสำรวจระดับความพร้อมของระบบ ' +
      faker.company.name(),
    formName: 'แบบสำรวจระดับความพร้อมของระบบ',
    group: 'ความพร้อม',
    status: 'approve',
    form: JSON.stringify(assessmentData),
    approveDt: faker.date.recent(1).toString(),
    sendDt: faker.date.recent(1).toString(),
    deadlineDt: faker.date.recent(1).toString(),
    createdDt: faker.date.recent(1).toString(),
    createdBy:
      faker.name.firstName() +
      ' ' +
      faker.name.lastName(),
    updatedDt: '10/04/2566 10:00',
    updatedBy: 'นาย สมชาย สมบัติ',
  },
  {
    ObjectUUID: '476d5c7b-dbb6-40bc-8e9b-f6b8e5589982',
    name:
      'แบบสำรวจระดับความพร้อมของระบบ ' +
      faker.company.name(),
    formName: 'แบบสำรวจระดับความพร้อมของระบบ',
    group: 'ความพร้อม',
    status: 'waiting_approve',
    form: JSON.stringify(assessmentData),
    approveDt: '',
    sendDt: faker.date.recent(1).toString(),
    deadlineDt: faker.date.recent(1).toString(),
    createdDt: faker.date.recent(1).toString(),
    createdBy:
      faker.name.firstName() +
      ' ' +
      faker.name.lastName(),
    updatedDt: '10/04/2566 10:00',
    updatedBy: 'นาย สมชาย สมบัติ',
  },
  {
    ObjectUUID: '07627c5b-a8f4-4a22-8c4f-dced6ffb209b',
    name:
      'แบบสำรวจระดับความพร้อมของระบบ ' +
      faker.company.name(),
    formName: 'แบบสำรวจระดับความพร้อมของระบบ',
    group: 'ความพร้อม',
    status: 'waiting_update',
    form: JSON.stringify(assessmentData),
    approveDt: '',
    sendDt: faker.date.recent(1).toString(),
    deadlineDt: faker.date.recent(1).toString(),
    createdDt: faker.date.recent(1).toString(),
    createdBy:
      faker.name.firstName() +
      ' ' +
      faker.name.lastName(),
    updatedDt: '10/04/2566 10:00',
    updatedBy: 'นาย สมชาย สมบัติ',
  },
  {
    ObjectUUID: '61d05eda-e0a3-4b8e-ae3e-9fbe95a7c227',
    name:
      'แบบสำรวจระดับความพร้อมของระบบ ' +
      faker.company.name(),
    formName: 'แบบสำรวจระดับความพร้อมของระบบ',
    group: 'ความพร้อม',
    status: 'reject',
    form: JSON.stringify(assessmentData),
    approveDt: '',
    sendDt: faker.date.recent(1).toString(),
    deadlineDt: faker.date.recent(1).toString(),
    createdDt: faker.date.recent(1).toString(),
    createdBy:
      faker.name.firstName() +
      ' ' +
      faker.name.lastName(),
    updatedDt: '10/04/2566 10:00',
    updatedBy: 'นาย สมชาย สมบัติ',
  },
  {
    ObjectUUID: 'f15fc0dd-69d9-4864-a708-3b9cb143791a',
    name:
      'แบบสำรวจระดับความพร้อมของระบบ ' +
      faker.company.name(),
    formName: 'แบบสำรวจระดับความพร้อมของระบบ',
    group: 'ความพร้อม',
    status: 'in_progress',
    form: JSON.stringify(assessmentData),
    approveDt: '',
    sendDt: faker.date.recent(1).toString(),
    deadlineDt: faker.date.recent(1).toString(),
    createdDt: faker.date.recent(1).toString(),
    createdBy:
      faker.name.firstName() +
      ' ' +
      faker.name.lastName(),
    updatedDt: '10/04/2566 10:00',
    updatedBy: 'นาย สมชาย สมบัติ',
  },
  {
    ObjectUUID: '2ed8a5cc-6199-4064-98b0-3064c6235067',
    name:
      'แบบสำรวจระดับความพร้อมของระบบ ' +
      faker.company.name(),
    formName: 'แบบสำรวจระดับความพร้อมของระบบ',
    group: 'ความพร้อม',
    status: 'approve',
    form: JSON.stringify(assessmentData),
    approveDt: faker.date.recent(1).toString(),
    sendDt: faker.date.recent(1).toString(),
    deadlineDt: faker.date.recent(1).toString(),
    createdDt: faker.date.recent(1).toString(),
    createdBy:
      faker.name.firstName() +
      ' ' +
      faker.name.lastName(),
    updatedDt: '10/04/2566 10:00',
    updatedBy: 'นาย สมชาย สมบัติ',
  },
];

export const listAssessors = [
  {
    ObjectUUID: uid(),
    name: 'นายนพรัตน์ คำทิพย์',
    email: 'Nopparat.k@gmail.com',
    approver: 'นายธิติวุฒิ สังข์ประสิทธิ์',
    status: 'approve',
    deadlineDt: faker.date.recent(1).toString(),
    isExtend: true,
    extendDt: '',
  },
  {
    ObjectUUID: uid(),
    name: 'นายธิติวุฒิ สังข์ประสิทธิ์',
    email: 'Thitirat.k@gmail.com',
    approver: 'นายนพรัตน์ คำทิพย์',
    status: 'approve',
    deadlineDt: faker.date.recent(1).toString(),
    isExtend: false,
    extendDt: '',
  },
];
const institutes = [
  {
    ObjectUUID: uid(),
    name: 'สำนักงานใหญ่',
    respondents: [
      {
        ObjectUUID: uid(),
        name: 'นายนพรัตน์ ตำทิพย์',
        department: 'ผู้บริหาร',
        position: 'ผู้บริหารระดับสูง',
        email: 'nopparat.k@gmail.com',
        tel: faker.phone.number(),
      },
    ],
  },
  // {
  //   ObjectUUID: uid(),
  //   name: 'สาขาพญาไท',
  //   respondents: generateRespondents(),
  // },
  // {
  //   ObjectUUID: uid(),
  //   name: 'สาขาพระนคร',
  //   respondents: generateRespondents(),
  // },
  // {
  //   ObjectUUID: uid(),
  //   name: 'สาขาลาดพร้าว',
  //   respondents: generateRespondents(),
  // },
  // {
  //   ObjectUUID: uid(),
  //   name: 'สาขาบางแค',
  //   respondents: generateRespondents(),
  // },
  // {
  //   ObjectUUID: uid(),
  //   name: 'สาขาพยุหะคีรี',
  //   respondents: generateRespondents(),
  // },
  // {
  //   ObjectUUID: uid(),
  //   name: 'สาขาหล่มเก่า',
  //   respondents: generateRespondents(),
  // },
  // {
  //   ObjectUUID: uid(),
  //   name: 'สาขาเขาค้อ',
  //   respondents: generateRespondents(),
  // },
  // {
  //   ObjectUUID: uid(),
  //   name: 'สาขาสรรพยา',
  //   respondents: generateRespondents(),
  // },
  // {
  //   ObjectUUID: uid(),
  //   name: 'สาขาเมืองชัยนาท',
  //   respondents: generateRespondents(),
  // },
];

export const respondentsReport = {
  ObjectUUID: uid(),
  name: 'Security Pitch',
  orgType: 'security',
  industryGroup: 'security',
  businessCategory: 'security',
  institutes,
};

export const metaId = [
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
];

const rankingInstitute = [
  'บริษัท ซีเคียวริตี้ พิทช์ จำกัด / สำนักงานใหญ่',
  // 'บริษัท ซีเคียวริตี้ พิทช์ จำกัด / สาขาพญาไท',
  // 'บริษัท ซีเคียวริตี้ พิทช์ จำกัด / สาขาพระนคร',
  // 'บริษัท ซีเคียวริตี้ พิทช์ จำกัด / สาขาลาดพร้าว',
  // 'บริษัท ซีเคียวริตี้ พิทช์ จำกัด / สาขาบางแค',
  // 'บริษัท ซีเคียวริตี้ พิทช์ จำกัด / สาขาพยุหะคีรี',
  // 'บริษัท ซีเคียวริตี้ พิทช์ จำกัด / สาขาหล่มเก่า',
  // 'บริษัท ซีเคียวริตี้ พิทช์ จำกัด /สาขาเขาค้อ',
  // 'บริษัท ซีเคียวริตี้ พิทช์ จำกัด /สาขาสรรพยา',
  // 'บริษัท ซีเคียวริตี้ พิทช์ จำกัด /สาขาเมืองชัยนาท',
];

const rankingSections = [
  'ส่วนที่ 1',
  'ส่วนที่ 2',
  'ส่วนที่ 3',
  'ส่วนที่ 4',
  'ส่วนที่ 5',
  'ส่วนที่ 6',
];

export const rankingMeta = () => {
  return rankingSections.map((name, index) => ({
    key: metaId[index],
    value: name,
  }));
};

const meta = rankingMeta();

export const rankingScore = () => {
  return rankingInstitute.map((name) => {
    const score = [] as number[];

    meta.forEach((item, index) => {
      score[index] = Math.floor(Math.random() * 65) + 35;
    });

    return {
      key: uid(),
      name,
      [meta[0].key]: score[0],
      [meta[1].key]: score[1],
      [meta[2].key]: score[2],
      [meta[3].key]: score[3],
      [meta[4].key]: score[4],
      [meta[5].key]: score[5],
      avg:
        score.reduce((a, b) => a + b, 0) / score.length,
    };
  });
};

const scores = rankingScore();
const rankingScoreHorizontal = () => {
  const score = {
    key: uid(),
    name: 'ค่าเฉลี่ย',
    avg: 0,
  } as {
    key: string;
    name: string;
    avg: number;
    [key: string]: number | string;
  };

  meta.forEach((item) => {
    const key = item.key;
    const values = scores.map(
      (item) => item[key]
    ) as number[];
    score[key] =
      values.reduce((a, b) => a + b, 0) / values.length;
    score.avg =
      values.reduce((a, b) => a + b, 0) / values.length;
  });

  return score;
};

export const ranking = {
  code: 200,
  message: 'success',
  data: {
    scores,
    avgHorizontal: rankingScoreHorizontal(),
  },
  meta,
};

export const assessment = {
  form,
  list,
  listAssessors,
};
