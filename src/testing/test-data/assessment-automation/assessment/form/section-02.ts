export const section02 = [
  {
    key: 'a7e01e30-3672-4193-b1cf-592eeb2417bf',
    widget: 'question-group',
    title: '2. แผนแม่บทเทคโนโลยีสารสนเทศ',
    alias: '2p',
    children: [
      {
        key: 'd766d406-4bab-4c8f-88c2-28a8b8aab2a5',
        widget: 'radio-box',
        alias: '1b',
        title:
          '2.1 โรงพยาบาลของท่าน มีการจัดทำแผนแม่บทเทคโนโลยีสารสนเทศ ที่ได้มาตรฐานสอดคล้องกับ\nแผนยุทธศาสตร์ของโรงพยาบาล หรือไม่',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'สอดคล้อง (ตอบข้อ 2.1.1)',
              target:
                '592e7377-6b37-4afc-8b67-5aa9c02a6a84',
            },
          ],
          else: {
            target:
              'b3407fa7-50d9-465c-8805-0892e414f182',
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
            title: 'ไม่สอดคล้อง',
          },
          {
            title: 'สอดคล้อง (ตอบข้อ 2.1.1)',
          },
        ],
      },
      {
        key: '592e7377-6b37-4afc-8b67-5aa9c02a6a84',
        title:
          '2.1.1 โปรดระบุ ตัวอย่างที่สอดคล้องที่ 1-2',
        alias: '2b',
        widget: 'short-text',
        verticalAlignment: true,
        options: [
          {
            title: 'โปรดระบุ ตัวอย่างที่สอดคล้องที่ 1-2',
            placeholder:
              'โปรดระบุ ตัวอย่างที่สอดคล้องที่ 1-2',
            attachment: true,
          },
        ],
      },
      {
        key: 'b3407fa7-50d9-465c-8805-0892e414f182',
        widget: 'radio-box',
        alias: '3b',
        title:
          '2.2  โรงพยาบาลของท่าน มีนโยบาย และแผนการปฏิบัติด้านเทคโนโลยีสารสนเทศของโรงพยาบาลหรือไม่',
        verticalAlignment: true,
        scores: [
          {
            value: 0,
          },
          {
            value: 1,
          },
        ],
        logic: {
          if: [
            {
              condition: 'equal',
              value:
                'มีการจัดทำ (แนบหลักฐานหรือใส่ลิงก์ ตอบข้อ 2.2.1)',
              target:
                '00abe93b-e189-43e3-a678-d9add28c96fd',
            },
          ],
          else: {
            target:
              '201c8f07-aaa5-45de-a1d8-1b026e7e690a',
          },
        },
        options: [
          {
            title: 'ไม่มีการจัดทำ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'มีการจัดทำ (แนบหลักฐานหรือใส่ลิงก์ ตอบข้อ 2.2.1)',
          },
        ],
      },
      {
        key: '00abe93b-e189-43e3-a678-d9add28c96fd',
        title:
          '2.2.1  แนบหลักฐานหรือใส่ลิงก นโยบาย และแผนการปฏิบัติด้านเทคโนโลยีสารสนเทศของโรงพยาบาล',
        alias: '4b',
        widget: 'short-text',
        verticalAlignment: true,
        options: [
          {
            title: 'ระบุลิงก์',
            placeholder: 'ระบุลิงก์',
            attachment: true,
          },
        ],
      },
      {
        key: '201c8f07-aaa5-45de-a1d8-1b026e7e690a',
        widget: 'radio-box',
        alias: '5b',
        verticalAlignment: true,
        title:
          '2.2.2 โรงพยาบาลของท่าน รู้จักแนวปฏิบัติในการรักษาความมั่นคงปลอดภัยด้านสารสนเทศ ของกระทรวง\nสาธารณสุข พ.ศ. ๒๕๖๕ หรือไม่(https://ict.moph.go.th/uploadfile/files/bfa2dfae9c3c2ff79e12cb0faa09d8c7.pdf)',
        options: [
          {
            title: 'ไม่ทราบ',
          },
          {
            title: 'ทราบ แต่ไม่เคยนำมาใช้',
          },
          {
            title:
              'ทราบ นำมาปรับใช้กับนโยบายของโรงพยาบาลแล้ว',
          },
        ],
      },
      {
        key: '57ca94ef-fbcf-4913-9cec-acc835979be7',
        widget: 'radio-box',
        alias: '6b',
        verticalAlignment: true,
        scores: [
          {
            value: 0,
          },
          {
            value: 1,
          },
          {
            value: 2,
          },
        ],
        title:
          '2.3 โรงพยาบาลของท่าน มีแผนปฏิบัติการ 1-3 ปี และมีการสื่อสารแผนไปสู่ผู้ที่เกี่ยวข้อง เพื่อรองรับการก้าวไปสู่รัฐบาล\nดิจิทัลของประเทศไทยหรือไม่',
        options: [
          {
            title:
              'ไม่มีการจัดทำแผนปฏิบัติการ (Action Plan) โปรดระบุเหตุผล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'มีการจัดทำแผนปฏิบัติการ (Action Plan) แต่ยังไม่มีการสื่อสาร โปรดระบุเหตุผล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'มีการจัดทำแผนปฏิบัติการ (Action Plan) และการสื่อสาร (แนบหลักฐาน)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
      {
        key: 'fd65a107-cdc3-4d83-8eee-a7868bec3abf',
        widget: 'radio-box',
        alias: '7b',
        verticalAlignment: true,
        title:
          '2.4 เมื่อดำเนินการตามแผนการปฏิบัติด้านเทคโนโลยีสารสนเทศแล้วมีการประเมินผลและดำเนินการปรับแผน\nในปีถัดไปหรือไม่',
        scores: [
          {
            value: 0,
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
            title:
              'ไม่มีการประเมินแผนการปฏิบัติด้านเทคโนโลยีสารสนเทศ โปรดระบุเหตุผล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'มีการจัดทำการประเมินแผนการปฏิบัติด้านเทคโนโลยีสารสนเทศ (แนบหลักฐาน)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title:
              'มีการประเมิน และมีการปรับแผนการปฏิบัติ (แนบหลักฐาน)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
    ],
  },
];
