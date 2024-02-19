export const section04 = [
  {
    key: '3201f9b4-4097-4d05-8874-182d489d6ea4',
    widget: 'question-group',
    title:
      '4. การจัดการความมั่นคงปลอดภัยในระบบเทคโนโลยีสารสนเทศ',
    alias: '4p',
    description: `นิยาม อภิบาลสารสนเทศ Information Governance การนำเทคโนโลยีสารสนเทศ หรือ IT เข้ามาสนับสนุนเพื่อให้เกิดธรรมาภิบาลในองค์กรมีบทบาทสำคัญ
ที่จะช่วยให้ ผู้บริหารตัดสินใจได้อย่างถูกต้อง รวดเร็ว และแม่นยำ และส่งผลให้องค์กรขับเคลื่อน บรรลุเป้าหมาย และกลยุทธ์ที่วางไว้ ดังนั้น การบริหารจัดการ
ระบบสารสนเทศอย่างเป็นระบบและการรักษาความมั่นคงปลอดภัยของสิทธิ์ในการเข้าถึงข้อมูล (Confidentiality) ความครบถ้วนถูกต้อง (Integrity)
และความพร้อมใช้ (Availability)`,
    children: [
      {
        key: '9c4c5d65-b6c8-4f53-a979-99675038db45',
        widget: 'radio-box',
        alias: '1d',
        title:
          '4.1 โรงพยาบาลของท่านทราบ และมีการดำเนินการระบบอภิบาลสารสนเทศ Information Governance หรือไม่',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value:
                'ยังไม่ทราบ แต่ได้มีการดำเนินการที่คาดว่าเกี่ยวข้องกับการใช้ อภิบาลสารสนเทศ (Information Governance) (ตอบข้อ 4.1.1 )',
              target:
                '3f53b964-13bf-4cd6-993b-28128298511a',
            },
            {
              condition: 'equal',
              value: 'ทราบ (ตอบข้อ 4.1.1 )',
              target:
                '3f53b964-13bf-4cd6-993b-28128298511a',
            },
          ],
          else: {
            target:
              'a50a94dc-72c3-405d-a3e6-df023965ffe7',
          },
        },
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
            title: 'ยังไม่ทราบ (ข้ามไปข้อ 4.2)',
          },
          {
            title:
              'ยังไม่ทราบ แต่ได้มีการดำเนินการที่คาดว่าเกี่ยวข้องกับการใช้ อภิบาลสารสนเทศ (Information Governance) (ตอบข้อ 4.1.1 )',
          },
          {
            title: 'ทราบ (ตอบข้อ 4.1.1 )',
          },
        ],
      },
      {
        key: '3f53b964-13bf-4cd6-993b-28128298511a',
        widget: 'matrix',
        alias: '2d',
        multipleSelection: false,
        verticalAlignment: true,
        title:
          '4.1.1 โรงพยาบาลของท่านมีการดำเนินการระบบ อภิบาลสารสนเทศ Information Governance ต่อไปนี้อย่างไร',
        rows: [
          {
            key: '4837b87c-5868-4588-afd8-9919bc5c4a30',
            title:
              'กำหนดโครงสร้างธรรมาภิบาลข้อมูลภาครัฐ หน้าที่ ความรับผิดชอบในแต่ละส่วนงาน และมีระบบอภิบาลสารสนเทศ (Information Governance)',
            isTitle: true,
          },
          {
            key: '900f0605-3686-4e35-85bc-bc12bf6cac07',
            title:
              '1 มีการกำหนด สิทธิ หน้าที่ ความรับผิดชอบในการบริหารจัดการข้อมูลของโรงพยาบาล',
          },
          {
            key: '60d30f5c-53ce-42ee-afa3-77853cf6ebd4',
            title:
              '2 มีการทบทวนสิทธิ์การเข้าถึงของผู้ใช้งาน อย่างน้อยปีละ ครั้ง และเมื่อเจ้าหน้าที่มีการ\nโยกย้าย หรือเปลี่ยนตำแหน่ง ลาออก สิ้นสุดการจ้างงาน เมื่อเปลี่ยนหน้าที่ความรับผิดชอบใน\nระบบที่ขอสิทธิ์การใช้งาน ให้ถอดถอนสิทธิ์ภายใน 1-2 วันทำการ',
          },
          {
            key: '64d52589-afd7-4043-a316-890ad0205f49',
            title:
              '3 จัดตั้งและกำหนดบทบาทของทีมบริกรข้อมูล (Data Steward Team)',
          },
          {
            key: '69effb4c-e09f-44e4-9cb4-06e492f055b8',
            title:
              '4 กำหนดสิทธิ หน้าที่ ความรับผิดชอบ ของผู้ครอบครองข้อมูล และ ผู้ควบคุมข้อมูล \nตามวงจรชีวิตข้อมูล (create, collect, classify, process/use, store, publish/\ndisclose, inspect, terminate)',
          },
          {
            key: 'c223ac3e-010b-4e4f-b2ea-a77857afee24',
            title:
              '5 มีระบบบริหารและ กระบวนการจัดการและ คุ้มครองข้อมูล ตามวงจรชีวิตข้อมูล \n(create, collect, classify, process/use, store, publish/disclose, inspect,\n terminate)',
          },
          {
            key: '0447cf9a-b7e7-477a-a314-ead1e73ba120',
            title:
              '6 มีการกำหนดนโยบาย/กฎเกณฑ์การเข้าถึงและใช้ประโยชน์จากข้อมูล',
          },
          {
            key: 'fc83b55d-e659-429d-9bf4-214071652a83',
            title:
              '7 มีการกำหนดมาตรการ หรือ กระบวนการตรวจสอบ ประเมินคุณภาพข้อมูลได้แก่ \nถูกต้อง ครบถ้วน สอดคล้องกัน เป็นปัจจุบัน ตรงความต้องการผู้ใช้ และพร้อมใช้',
          },
          {
            key: '383974a5-9c01-4369-a37e-2d194e66bf99',
            title:
              '8 มีการจัดทำบัญชีรายชื่อข้อมูล (Data Catalog) คำอธิบายข้อมูล (Metadata) และ\nพจนานุกรมข้อมูล (Data Dictionary)',
          },
          {
            key: '0963b4ea-5764-4432-b355-25457cf4bfeb',
            title:
              '9 มีการกำหนดรายชื่อชุดข้อมูลเปิด และปรับปรุงข้อมูลให้เป็นปัจจุบัน สำหรับนำไป\nบูรณาการเชื่อมโยงแลกเปลี่ยนข้อมูล',
          },
          {
            key: '1747078e-2564-497b-9b97-b2fff7294f7b',
            title:
              '10 มีการประกาศบัญชีรายชื่อข้อมูลกลาง และคำอธิบายชุดข้อมูลดิจิทัลกลาง ผ่านระบบ \nWebsite โรงพยาบาล, GD Catalog, data.go.th, GDX หรือ Linkage Center',
          },
        ],
        columns: [
          {
            key: '839a35ce-4c1d-4d7a-b7a2-5b771406fbb2',
            title: 'ยังไม่มีการดำเนินการใด ๆ',
          },
          {
            key: '9e8b68c6-dce8-4a19-9090-98ad4f93de07',
            title: 'อยู่ระหว่างดำเนินการ',
          },
          {
            key: '7fd32393-01f4-457a-9f06-8ddc57cef04f',
            title:
              'จัดทำเสร็จเรียบร้อย แต่ยังไม่มี การประกาศใช้',
            isMore: true,
            options: [
              {
                type: 'attachment',
                uploadButtonText: 'แนบหลักฐาน',
                required: true,
              },
              {
                type: 'number',
                label: 'จำนวนชุด',
                required: true,
                showOnRows: [10],
              },
              {
                type: 'checkbox',
                label: 'ไม่ทราบจำนวน',
                required: true,
                showOnRows: [10],
              },
            ],
          },
          {
            key: '54eaeab2-fd87-4598-b708-1a38b834d4c4',
            title:
              'จัดทำเสร็จเรียบร้อย พร้อมทั้งประกาศใช้แล้ว โปรดระบุวันเดือนปี ที่ประกาศใช้',
            options: [
              {
                type: 'attachment',
                uploadButtonText: 'แนบหลักฐาน',
                required: true,
              },
              {
                type: 'number',
                label: 'จำนวนชุด',
                required: true,
                showOnRows: [10],
              },
              {
                type: 'checkbox',
                label: 'ไม่ทราบจำนวน',
                required: true,
                showOnRows: [10],
              },
            ],
          },
        ],
      },
      {
        key: 'a50a94dc-72c3-405d-a3e6-df023965ffe7',
        widget: 'radio-box',
        alias: '3d',
        verticalAlignment: true,
        title:
          '4.2 ช่องทางในการเผยแพร่ข้อมูลของสถานพยาบาล',
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี (ตอบข้อ 4.2.1)',
              target:
                '5aa78e20-98ff-4e9a-896d-b285e23b2e49',
            },
          ],
          else: {
            target:
              'a83b8ee9-cf3d-4110-8809-a71403384c38',
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
            title: 'มี (ตอบข้อ 4.2.1)',
          },
        ],
      },
      {
        key: '5aa78e20-98ff-4e9a-896d-b285e23b2e49',
        widget: 'check-box',
        alias: '4d',
        title:
          '4.2.1 โปรดระบุ ช่องทางในการเผยแพร่ข้อมูลของสถานพยาบาล',
        verticalAlignment: true,
        options: [
          {
            title: 'เว็บไซต์โรงพยาบาล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'Facebook / Line',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'มี ระบุ URL ที่รวมชุดข้อมูลเปิดของโรงพยาบาล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'อื่นๆ ที่ไม่ใช่เว็บไซต์โรงพยาบาล โปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: 'a83b8ee9-cf3d-4110-8809-a71403384c38',
        widget: 'statement',
        alias: '5d',
        verticalAlignment: true,
        title:
          '4.3 การดำเนินการคุ้มครองข้อมูลส่วนบุคคล (PDPA)',
      },
      {
        key: 'd7050e87-95df-4c1d-b081-cbfb6a2f72ed',
        widget: 'radio-box',
        alias: '6d',
        verticalAlignment: true,
        title:
          '4.3.1 โรงพยาบาลของท่านมีการกำหนดผู้บริหาร ให้ดูแลการปฏิบัติตามกฎหมายข้อมูล หรือไม่',
        description:
          'หมายเหตุ: โรงพยาบาลของกระทรวงสาธารณสุข Data controller คือ สำนักงานปลัดกระทรวงสาธารณสุข',
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี',
              target:
                'eb967241-3423-4afa-8433-b839eb3a37f1',
            },
          ],
          else: {
            target:
              '9b29e991-f656-470f-aa6b-f1352295cd1f',
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
            title: 'ไม่มี (ข้ามไปตอบข้อ 4.3.3)',
          },
          {
            title: 'มี',
          },
        ],
      },
      {
        key: 'eb967241-3423-4afa-8433-b839eb3a37f1',
        widget: 'radio-box',
        alias: '7d',
        verticalAlignment: true,
        title:
          '4.3.2 โรงพยาบาลมีการดำเนินงานตาม PDPA ท่านใช้แนวทางปฎิบัติอย่างไร',
        scores: [
          {
            value: 0,
          },
          {
            value: 0.5,
          },
          {
            value: 1,
          },
        ],
        options: [
          {
            title: 'ยังไม่ได้รับการฝึกอบรมเพียงพอ',
          },
          {
            title:
              'อบรมแล้วแต่ยังไม่เข้าใจฐานกฎหมายการประมวลผล',
          },
          {
            title: 'อบรมแล้วเข้าใจ และสามารถประเมินได้',
          },
        ],
      },
      {
        key: '9b29e991-f656-470f-aa6b-f1352295cd1f',
        widget: 'radio-box',
        alias: '8d',
        verticalAlignment: true,
        title:
          '4.3.3 โรงพยาบาลมีการประกาศความเป็นส่วนบุคคล (Privacy Notice) สำหรับกิจกรรมที่สำคัญตามภารกิจขององค์กร \nอย่างน้อย 1 กิจกรรม',
        scores: [
          {
            value: 0,
          },
          {
            value: 0.5,
          },
          {
            value: 1,
          },
        ],
        options: [
          {
            title: 'ยังไม่มีความเข้าใจที่ดีพอ',
          },
          {
            title: 'เข้าใจและอยู่ระหว่างจัดทำ',
          },
          {
            title: 'ดำเนินการแล้ว',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
      {
        key: '1327c61d-9b31-47e7-b328-3c38e3ea0a09',
        widget: 'radio-box',
        alias: '9d',
        verticalAlignment: true,
        title:
          '4.3.4 โรงพยาบาลของท่านมีการส่งข้อมูลส่วนบุคคลให้กับหน่วยงานภายนอกประมวลผล และมีการจัดทำ Data\nProcessing Agreement เอกสารเปิดเผยข้อมูล',
        description:
          'เช่น การจ้างองค์กรภายนอก ประมวลผลข้อมูล หรือการทำวิจัยการส่งข้อมูลเพื่อตรวจทางห้องปฏิบัติการภายนอก',
        scores: [
          {
            value: 0,
          },
          {
            value: 0,
          },
          {
            value: 0.5,
          },
          {
            value: 1,
          },
        ],
        options: [
          {
            title:
              'ไม่มีการส่งข้อมูลให้กับหน่วยงานภายนอก',
          },
          {
            title: 'ยังไม่มีความเข้าใจที่ดีพอ',
          },
          {
            title: 'เข้าใจและอยู่ระหว่างจัดทำ',
          },
          {
            title: 'ดำเนินการแล้ว',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
      {
        key: '2f327627-708c-4324-98e3-f93cc16d0e4a',
        widget: 'radio-box',
        alias: '10d',
        verticalAlignment: true,
        title:
          '4.3.5 โรงพยาบาลมีการจัดทำบันทึกรายการประมวลผลข้อมูลส่วนบุคคล (Record of Processing Activities: ROPA) \nสำหรับกิจกรรมที่สำคัญตามภารกิจขององค์กร อย่างน้อย 1 กิจกรรม',
        scores: [
          {
            value: 0,
          },
          {
            value: 0.5,
          },
          {
            value: 1,
          },
        ],
        options: [
          {
            title: 'ยังไม่มีความเข้าใจที่ดีพอ',
          },
          {
            title: 'เข้าใจและอยู่ระหว่างจัดทำ',
          },
          {
            title: 'ดำเนินการแล้ว',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
      {
        key: '267bdb95-719b-4687-95b7-8f36e8805db0',
        widget: 'matrix',
        alias: '11d',
        headerTitle: 'การดำเนินการ',
        verticalAlignment: true,
        title:
          '4.4 การดำเนินการเรื่องการรักษาความมั่นคงปลอดภัยในระบบเทคโนโลยีสารสนเทศ',
        rows: [
          {
            key: 'f1c07359-b440-4dcf-b190-2671660f278f',
            title:
              'มาตรการป้องกันด้านการบริหารจัดการ (Administrative Safeguard)',
            isTitle: true,
          },
          {
            key: 'dae29a61-f206-4f2e-85eb-ab1141857286',
            title:
              '4.4.1 มีการออกระเบียบ วิธีปฏิบัติ สำหรับควบคุมการเข้าถึงข้อมูล อุปกรณ์ในการจัดเก็บและอุปกรณ์สำหรับประมวลผลข้อมูล (เช่น คลาวด์ และ เครื่องแม่ข่าย)',
          },
          {
            key: 'f1968158-da5e-4295-a781-30b824f11386',
            title:
              '4.4.2 มีการกำหนดเกี่ยวกับการอนุญาตหรือการกำหนดสิทธิในการเข้าถึงข้อมูลของผู้ใช้งาน \nครอบคลุมรูปแบบต่าง ๆ ได้แก่ สิทธิในการเข้าดู แก้ไข/ปรับปรุง เพิ่มข้อมูล ง\nการเปิดเผยและเผยแพร่ จัดเก็บ การตรวจสอบคุณภาพข้อมูล ตลอดจนการลบทำลาย',
          },
          {
            key: 'ecfbe392-7cb6-4905-9383-e083d171892e',
            title:
              '4.4.3 มีการจัดให้มีการซ้อมรับภัยโจมตีทางไซเบอร์ (Cyber Drill)\nนิยาม: การฝึกดำเนินการกรณีระบบหรือเว็บไซต์ของโรงพยาบาลถูกโจมตี ปลอมแปลง แก้ไข หรือ ล่ม\n(ตัวอย่าง: มีการทดสอบเชิงปฏิบัติโดยสร้างสถานการณ์จำลองการโจมตีในรูปแบบต่าง ๆ เช่น Email phishing หรือ Ransomware เป็นต้น)',
          },
          {
            key: 'a3d5d93c-92eb-4f0d-a443-c498fc8cd2c2',
            title:
              'มาตรการป้องกันทางเทคนิค (Technical Safeguard)',
            isTitle: true,
          },
          {
            key: 'c206bd34-a809-43ce-8d69-2782d6c15c4f',
            title:
              '4.4.4 มีการจัดให้มีวิธีการเพื่อให้สามารถตรวจสอบย้อนหลังเกี่ยวกับการเข้าถึง เปลี่ยนแปลง ลบ หรือถ่ายโอนข้อมูล ให้สอดคล้องเหมาะสมกับวิธีการและสื่อที่ใช้ในการเก็บรวบรวม ใช้หรือเปิดเผยข้อมูล',
          },
          {
            key: 'd71514aa-8435-45b3-9a4b-64dd4c4653eb',
            title:
              '4.4.5 มีการบริหารจัดการการเข้าถึงของผู้ใช้งาน (user access management) ตามระเบียบปฏิบัติที่ประกาศ (คำถามข้อ 4.4.1) เพื่อควบคุมการเข้าถึงข้อมูลเฉพาะผู้ที่ได้รับอนุญาต ตามระดับสิทธิการใช้งาน ได้แก่ สิทธิในการเข้าดู แก้ไข/ปรับปรุง เพิ่มข้อมูล การเปิดเผยและเผยแพร่ การจัดเก็บ การตรวจสอบคุณภาพข้อมูล ตลอดจนการลบทำลาย',
          },
          {
            key: 'eae0327a-5092-43cb-b8b8-c32fafb0315b',
            title:
              '4.4.6 มีการจัดให้มีระบบสำรองและกู้คืนข้อมูล เพื่อให้ระบบ และ/หรือ บริการหลักต่างๆ สามารถดำเนินการได้อย่างต่อเนื่อง',
            isTitle: true,
            options: [
              {
                type: 'radio',
                options: [
                  {
                    label: 'ไม่มี',
                  },
                  {
                    label:
                      'มีการดำเนินการ จำเป็นต้องแนบหลักฐานอธิบายเพิ่มเติมว่าจัดการอย่างไร กับระบบ และ/หรือ บริการใด',
                    isMore: true,
                    type: 'attachment',
                    uploadButtonText: 'แนบหลักฐาน',
                  },
                ],
              },
            ],
          },
          {
            key: 'f6864c21-6088-4016-b591-b65b5f87fbd2',
            title:
              '4.4.7 มีการจัดให้มีระบบควบคุม เช่น firewall, IDS/IPS, VPN, anti-malware และ ความสามารถในการ detect/respond โดยมี SOC (Security Operation Center) และ Incident Response Team',
            isTitle: true,
            options: [
              {
                type: 'radio',
                options: [
                  {
                    label: 'ไม่มี',
                  },
                  {
                    label:
                      'มีการดำเนินการ จำเป็นต้องแนบหลักฐานอธิบายเพิ่มเติมว่าจัดการอย่างไร กับระบบ และ/หรือ บริการใด',
                    isMore: true,
                    type: 'attachment',
                    uploadButtonText: 'แนบหลักฐาน',
                  },
                ],
              },
            ],
          },
          {
            key: '70114371-90f5-4b16-a3d4-de67026ff5ec',
            title:
              'มาตรการป้องกันทางกายภาพ (Physical Safeguard) ในเรื่องการเข้าถึงหรือควบคุมการใช้งานข้อมูลส่วนบุคคล (Access Control)',
            isTitle: true,
          },
          {
            key: '7db81d3e-a97b-4efa-bc81-ce7f9e5f9e5e',
            title:
              '4.4.8 การควบคุมการเข้าถึงข้อมูลและอุปกรณ์ในการจัดเก็บและประมวลผลข้อมูลโดย\nคำนึงถึง การใช้งานและความมั่นคงปลอดภัย เช่น มีบันทึกการเข้าออกพื้นที่ มีเจ้าหน้าที่รักษาความปลอดภัยของพื้นที่ มีระบบกล้องวงจรปิดติดตั้ง มีการล้อมรั้วและล็อคประตูทุกครั้ง มีระบบบัตรผ่านเฉพาะผู้มีสิทธิเข้าออก ทั้งนี้ความเข้มข้นของมาตรการ ให้เป็นไปตามระดับความเสี่ยง หรือ ความเสียหายที่อาจเกิดขึ้นหากข้อมูลรั่วไหล ถูกแก้ไข ถูกคัดลอก ถูกเผยแพร่ หรือ ถูกทำลาย โดยมิชอบ',
          },
        ],
        columns: [
          {
            key: '8547a6e1-802c-4597-9e5c-003de3fbdc2d',
            title: 'ข้อมูลส่วนบุคคล',
            children: [
              {
                key: 'ffd55db3-0c96-426d-b948-1b96b4bd6af8',
                title: 'ไม่มีการดำเนินการ',
              },
              {
                key: 'a9c96ae5-515c-49e4-85e6-836cb9b80f51',
                title: 'มีการดำเนินการ',
                isMore: true,
                options: [
                  {
                    type: 'attachment',
                    uploadButtonText: 'แนบหลักฐาน',
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            key: '8ee1d284-8978-496d-8e98-43a92c2506aa',
            title: 'ข้อมูลอื่นๆ',
            children: [
              {
                key: '8580520a-6728-44cc-9a02-443920e032a4',
                title: 'ไม่มีการดำเนินการ',
              },
              {
                key: '9b031ff3-bdae-449c-a340-280bcbd0a045',
                title: 'มีการดำเนินการ',
                isMore: true,
                options: [
                  {
                    type: 'attachment',
                    uploadButtonText: 'แนบหลักฐาน',
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: 'a1cea32a-9aa3-4f27-a9c7-4c21fb12aa55',
        widget: 'statement',
        alias: '12d',
        title:
          '4.5 โรงพยาบาลของท่านมีการบริหารจัดการข้อมูลอย่างไร',
      },
      {
        key: '9595a9dc-f1fe-4c8d-84e2-ff2a1a325555',
        widget: 'radio-box',
        alias: '13d',
        verticalAlignment: true,
        title:
          '4.5.1 โรงพยาบาลของท่านมีการจัดทำ Data Warehouse และ/หรือ Data Lake หรือไม่',
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี (ตอบข้อ 4.5.1.1)',
              target:
                'aa64330f-5b9d-4827-b1e7-9ff619c0471d',
            },
          ],
          else: {
            target:
              '46ff3e72-fdf6-46e9-ba15-b5d6bd189383',
          },
        },
        scores: [
          {
            value: 0,
          },
          {
            value: 1,
          },
          {
            value: 0,
          },
        ],
        options: [
          {
            title: 'ไม่มี โปรดระบุเหตุผล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'มี (ตอบข้อ 4.5.1.1)',
          },
          {
            title: 'อื่นๆ โปรดระบุเหตุผล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: 'aa64330f-5b9d-4827-b1e7-9ff619c0471d',
        widget: 'check-box',
        alias: '14d',
        verticalAlignment: true,
        title:
          '4.5.1.1 รูปแบบการดำเนินการจัดทำ (ตอบได้มากกว่า 1 คำตอบ)',
        options: [
          {
            title: 'Data Warehouse',
          },
          {
            title: 'Data Lake',
          },
        ],
      },
      {
        key: '46ff3e72-fdf6-46e9-ba15-b5d6bd189383',
        widget: 'radio-box',
        alias: '15d',
        verticalAlignment: true,
        title:
          '4.5.2 คลังข้อมูลโรงพยาบาลของท่านมีการอัพเดตข้อมูลในฐานข้อมูลให้เป็นปัจจุบันและพร้อมใช้งาน',
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี (ตอบข้อ 4.5.2.1)',
              target:
                'e1966937-711f-44c9-ae56-2fa007109143',
            },
          ],
          else: {
            target:
              'b6bc7d03-f4d8-47de-9f4b-10f0e7a7cdf4',
          },
        },
        scores: [
          {
            value: 0,
          },
          {
            dependOn:
              'e1966937-711f-44c9-ae56-2fa007109143',
          },
        ],
        options: [
          {
            title: 'ไม่มี โปรดระบุเหตุผล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'มี (ตอบข้อ 4.5.2.1)',
          },
        ],
      },
      {
        key: 'e1966937-711f-44c9-ae56-2fa007109143',
        widget: 'radio-box',
        alias: '16d',
        title: '4.5.2.1 โดยมีการดำเนินการ ดังนี้',
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
            value: 0,
          },
          {
            value: 0,
          },
          {
            value: 0,
          },
          {
            value: 0,
          },
          {
            value: 0,
          },
        ],
        options: [
          {
            title: '1 อัพเดท Real-time',
          },
          {
            title: '2 อัพเดทเป็นรายวัน',
          },
          {
            title: '3 อัพเดทเป็นรายเดือน',
          },
          {
            title: '4 อัพเดทเป็นรายไตรมาส',
          },
          {
            title: '5 อัพเดทเป็นรายปี',
          },
          {
            title: '6 อัพเดทนานกว่าหนึ่งปีครั้ง',
          },
          {
            title: '7 อัพเดทเป็นครั้งคราว/ไม่แน่นอน',
          },
          {
            title: '8 อื่นๆ โปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: 'b6bc7d03-f4d8-47de-9f4b-10f0e7a7cdf4',
        widget: 'radio-box',
        alias: '17d',
        verticalAlignment: true,
        title:
          '4.5.3 โรงพยาบาลมีการดำเนินการตรวจสอบ แก้ไขข้อมูล (Data cleansing) ก่อนนำเข้าสู่คลังข้อมูลหรือไม่',
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
            title: 'ไม่มี โปรดระบุเหตุผล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: 'มี ด้วยวิธีการแบบใด *โปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: 'b5571ab5-43fb-4b2a-a859-4227745e3bbd',
        widget: 'radio-box',
        alias: '18d',
        verticalAlignment: true,
        title:
          '4.5.4 โรงพยาบาลมีการดำเนินการปกปิดข้อมูล ที่สามารถระบุตัวตน ก่อนนำไปวิเคราะห์ เพื่อค้นหาโอกาสพัฒนา \nหรือวิจัยเพิ่มเติมหรือไม่',
        logic: {
          if: [
            {
              condition: 'equal',
              value:
                'มี ด้วยวิธีการแบบใดโปรดระบุ (ตอบข้อ 4.5.4.1)',
              target:
                '40976461-a30a-4a95-9e11-25aa4017b748',
            },
          ],
          else: {
            target:
              'b39fd944-b932-4f0a-b854-f7915281019d',
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
            title: 'ไม่มี โปรดระบุเหตุผล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              'มี ด้วยวิธีการแบบใดโปรดระบุ (ตอบข้อ 4.5.4.1)',
          },
        ],
      },
      {
        key: '40976461-a30a-4a95-9e11-25aa4017b748',
        widget: 'check-box',
        verticalAlignment: true,
        alias: '19d',
        title: '4.5.4.1 มี ด้วยวิธีการแบบใดโปรดระบุ',
        options: [
          {
            title:
              'การเข้ารหัส/ถอดรหัส (Encryption/Decryption)',
          },
          {
            title:
              'การแทนที่ด้วยข้อมูลหรืออักษรอื่น (Substitution)',
          },
          {
            title: 'อื่นๆ โปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: 'b39fd944-b932-4f0a-b854-f7915281019d',
        widget: 'radio-box',
        alias: '20d',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value:
                'ไม่มี โปรดระบุเหตุผล (ตอบข้อ 4.6.1)',
              target:
                '925fa86c-1002-4d55-9588-630f74828ee6',
            },
            {
              condition: 'equal',
              value:
                'มีการนำข้อมูลมาใช้ในการวิเคราะห์ (โปรดระบุวัตถุประสงค์การวิเคราะห์) (ตอบข้อ 4.6.2)',
              target:
                '40bb2acc-418a-424d-ba60-bcd9e2b93db6',
            },
          ],
          else: {
            target:
              'd66b449d-d0ad-4648-ac36-8a3541c86ab7',
          },
        },
        title:
          '4.6 โรงพยาบาลของท่านมีการนำข้อมูลมาใช้ในการวิเคราะห์ หรือไม่ ถ้ามี มีการนำไปวิเคราะห์อย่างไร',
        description:
          'หมายเหตุ รายงานเชิงสถิติ ที่มีแต่ตัวเลขไม่ถือเป็นการวิเคราะห์',
        options: [
          {
            title: 'ไม่มี โปรดระบุเหตุผล (ตอบข้อ 4.6.1)',
          },
          {
            title:
              'มีการนำข้อมูลมาใช้ในการวิเคราะห์ (โปรดระบุวัตถุประสงค์การวิเคราะห์) (ตอบข้อ 4.6.2)',
          },
        ],
      },
      {
        key: '925fa86c-1002-4d55-9588-630f74828ee6',
        widget: 'check-box',
        alias: '21d',
        title: '4.6.1 ไม่มี โปรดระบุเหตุผล',
        verticalAlignment: true,
        options: [
          {
            title: 'ข้อมูลเก่าเกินไป',
          },
          {
            title:
              'ข้อมูลอยู่ในสภาพที่ไม่สามารถนำมาใช้ในการวิเคราะห์',
          },
          {
            title: 'อื่นๆ โปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: '40bb2acc-418a-424d-ba60-bcd9e2b93db6',
        widget: 'check-box',
        alias: '22d',
        title:
          '4.6.2 โปรดระบุวัตถุประสงค์การวิเคราะห์ (ตอบได้มากกว่า 1 คำตอบ)',
        verticalAlignment: true,
        scores: [
          {
            value: 0.5,
          },
          {
            value: 1,
          },
          {
            value: 1.5,
          },
          {
            value: 2,
          },
          {
            value: 2,
          },
        ],
        options: [
          {
            title:
              '1. เพื่อใช้ในการอธิบายปัญหาและปรากฏการณ์ (Descriptive Analytic)\n' +
              'ตัวอย่าง: ผลการวิเคราะห์รายงานข้อมูลของผู้ใช้บริการรายเดือน ในช่วงปีที่ผ่านมา\n' +
              'โปรดระบุตัวอย่างการปรับใช้ในโรงพยาบาล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              '2. เพื่อใช้ในการอธิบายถึงสาเหตุของสิ่งที่เกิดขึ้น ปัจจัย และความสัมพันธ์ต่างๆ (Diagnostic Analytic)\n' +
              'ตัวอย่าง: การนำข้อมูลผู้ใช้บริการมาวิเคราะห์ถึงสาเหตุที่ทำให้ผู้ใช้บริการในแต่ละเดือนไม่เท่ากัน\n' +
              'โปรดระบุตัวอย่างการปรับใช้ในโรงพยาบาล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              '3. เพื่อใช้ในการคาดการณ์หรือทำนายสิ่งที่จะเกิดขึ้น (Predictive Analytic)\n' +
              'ตัวอย่าง: การนำข้อมูลมาวิเคราะห์เพื่อใช้ศึกษารูปแบบของการใช้บริการ และคาดเดาถึงจำนวนผู้ใช้บริการในเดือนถัดไป\n' +
              'โปรดระบุตัวอย่างการปรับใช้ในโรงพยาบาล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title:
              '4. เพื่อใช้ในการวิเคราะห์ วางแผนรับมือกับสิ่งที่จะเกิดขึ้นในอนาคต (Prescriptive Analytic)\n' +
              'ตัวอย่าง: การนำข้อมูลมาวิเคราะห์เพื่อคาดเดาถึงจำนวนผู้ใช้บริการในเดือนถัดไป และเสนอแนะจำนวนบุคลากรที่เหมาะสม (Optimize) สำหรับให้บริการ\n' +
              'โปรดระบุตัวอย่างการปรับใช้ในโรงพยาบาล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
          {
            title: '5. อื่นๆ โปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: 'd66b449d-d0ad-4648-ac36-8a3541c86ab7',
        widget: 'radio-box',
        alias: '23d',
        title:
          '4.7 โรงพยาบาลของท่านมีการปรับใช้เทคโนโลยีเพื่อช่วยในการวิเคราะห์ข้อมูลและการตัดสินใจ \n(Data-driven decision making) หรือไม่ อย่างไรบ้าง',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value:
                'มี เฉพาะขั้นพื้นฐาน เช่น ทำรายงานประจำปี หรือ สรุปข้อมูลสถิติ (ตอบข้อ 4.7.1)',
              target:
                '332cd074-08a1-40a5-9377-21719598a6f8',
            },
            {
              condition: 'equal',
              value:
                'มี มากกว่าขั้นพื้นฐาน (ตอบข้อ 4.7.2)',
              target:
                '776ca38a-80ba-485e-bcbb-eb8068493789',
            },
          ],
          else: {
            target:
              '6f35411a-3c61-4be5-97b8-fae216b83859',
          },
        },
        scores: [
          {
            value: 0,
          },
          {
            value: 0,
          },
          {
            dependOn:
              '03c299da-03fb-417a-a235-9e4d92f251eb',
          },
        ],
        options: [
          {
            title: 'ไม่มี โปรดระบุเหตุผล',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุเหตุผล',
          },
          {
            title:
              'มี เฉพาะขั้นพื้นฐาน เช่น ทำรายงานประจำปี หรือ สรุปข้อมูลสถิติ (ตอบข้อ 4.7.1)',
          },
          {
            title: 'มี มากกว่าขั้นพื้นฐาน (ตอบข้อ 4.7.2)',
          },
        ],
      },
      {
        key: '332cd074-08a1-40a5-9377-21719598a6f8',
        widget: 'radio-box',
        alias: '24d',
        title:
          '4.7.1 การวิเคราะห์ข้อมูลแบบพื้นฐาน (Descriptive analytic data)',
        verticalAlignment: true,
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
        key: '776ca38a-80ba-485e-bcbb-eb8068493789',
        widget: 'check-box',
        title:
          '4.7.2 การปรับใช้เทคโนโลยีเพื่อช่วยในการวิเคราะห์ข้อมูลและการตัดสินใจ (Data-driven decision making)\n' +
          'มากกว่าขั้นพื้นฐาน (สามารถตอบได้มากกว่าหนึ่งข้อ)',
        description:
          'วิเคราะห์ผลการรักษาย้อนหลัง 3 - 5 ปี เพื่อนำว่าสร้าง โมเดลพยากรณ์ ผู้ป่วยรายใหม่ ที่เข้ามาและเสนอแนะแนวทางการดูแลรักษาที่เหมาะสมได้ เช่น',
        verticalAlignment: true,
        alias: '25d',
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
            title:
              'มีการวิเคราะห์ข้อมูลแบบพยากรณ์ (Predictive analytic data)',
          },
          {
            title:
              'มีระบบแจ้งเตีอนเมื่อผู้ป่วยไม่ได้รับการรักษาตามแนวทางมาตรฐาน ',
          },
          {
            title:
              'มีระบบแจ้งเตือนช่วยในการตรวจสอบการปฏิบัติตาม (patient safety guidelines)',
          },
          {
            title: 'อื่นๆ โปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: '6f35411a-3c61-4be5-97b8-fae216b83859',
        widget: 'statement',
        alias: '26d',
        title: '4.8 การวิเคราะห์ข้อมูล',
      },
      {
        key: 'a17f0be8-6336-41da-9afe-e749ed67b782',
        widget: 'radio-box',
        alias: '27d',
        title:
          '4.8.1. โรงพยาบาลของท่านมีระบบวิเคราะห์ข้อมูล และบริหารจัดการคลังข้อมูล เพื่อสร้างโอกาสการพัฒนา \nหรือ วิเคราะห์ข้อมูลปริมาณมาก (Big data) หรือการวิเคราะห์ที่เฉพาะเจาะจงมากขึ้น เช่น Business Intelligence (BI)',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี ใช้โปรแกรมอะไร (ตอบข้อ 4.8.1.1)',
              target:
                '1e2c69d9-b80c-4964-a5c7-51bb3d578db7',
            },
          ],
          else: {
            target:
              '8e85a9c3-bbad-49aa-8f46-d8a12f43ff08',
          },
        },
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี ใช้โปรแกรมอะไร (ตอบข้อ 4.8.1.1)',
          },
        ],
      },
      {
        key: '1e2c69d9-b80c-4964-a5c7-51bb3d578db7',
        title: '4.8.1.1 โปรดระบุโปรแกรมที่ใช้',
        alias: '28d',
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
        key: '8e85a9c3-bbad-49aa-8f46-d8a12f43ff08',
        widget: 'radio-box',
        alias: '29d',
        title:
          '4.8.2 โรงพยาบาลของท่านมีบุคลากรที่ทำหน้าที่วิเคราะห์ข้อมูล Data analytic หรือไม่',
        verticalAlignment: true,
        logic: {
          if: [
            {
              condition: 'equal',
              value: 'มี (ตอบข้อ 4.8.2.1)',
              target:
                '37d549c7-fe29-4768-802b-57f01af9ed6a',
            },
          ],
          else: {
            target:
              'ffbe22d6-c147-476c-a848-79831a359772',
          },
        },
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title: 'มี (ตอบข้อ 4.8.2.1)',
          },
        ],
      },
      {
        key: '37d549c7-fe29-4768-802b-57f01af9ed6a',
        widget: 'radio-box',
        alias: '30d',
        title:
          '4.8.2.1 บุคลากรที่ทำหน้าที่วิเคราะห์ข้อมูล Data analytic',
        verticalAlignment: true,
        options: [
          {
            title: 'ระบุอยุ่ในภาระงานชัดเจน',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title: 'งานที่ได้รับมอบหมายเป็นครั้งคราว',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
        ],
      },
      {
        key: 'ffbe22d6-c147-476c-a848-79831a359772',
        widget: 'radio-box',
        alias: '31d',
        title:
          '4.9 โรงพยาบาลของท่านมีการใช้เทคโนโลยีเพื่อสร้างความปลอดภัย และความน่าเชื่อถือในการทำงานต่างๆ หรือไม่',
        verticalAlignment: true,
        options: [
          {
            title: 'ไม่มี',
          },
          {
            title:
              'มีเฉพาะขั้นพื้นฐาน เช่น การใส่ password เพื่อปกป้องไฟล์',
          },
          {
            title: 'อื่นๆ โปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
      {
        key: '966d1e50-4aa3-41fc-967a-b8b125fd66ca',
        widget: 'statement',
        alias: '32d',
        title:
          '4.10 เทคโนโลยีเพื่อสร้างความปลอดภัยของข้อมูล',
      },
      {
        key: '50bd8b16-2af0-4c63-8572-1bc6f2c8d229',
        widget: 'check-box',
        alias: '33d',
        title:
          '4.10.1 การใช้ Security control รูปแบบต่างๆ เพื่อนำมาจัดการข้อมูล และการทำงานภายในองค์กรตามความเหมาะสม',
        description:
          'ตัวอย่าง: การให้ระบบเข้ารหัสข้อมูลก่อนการส่งไปยังอุปกรณ์อื่น, การยืนยันตัวตนผ่านสองขั้นตอน, การกำหนดสิทธิ์ในการเข้าถึงข้อมูล หรือระบบต่างๆ ของคนภายในองค์กร เช่น',
        verticalAlignment: true,
        options: [
          {
            title:
              'Single Sign-on (SSO) (การพิสูจน์ตัวตนเพียงครั้งเดียว)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title:
              'One Time Password (OTP) (รหัสผ่านที่ใช้งาน)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title: 'Username/Password',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title:
              'Biometric Security (ลายนิ้วมือ, ม่านตา, เสียง)',
            isMore: true,
            type: 'attachment',
            placeholder: 'แนบหลักฐาน',
          },
          {
            title: 'อื่น ๆ โปรดระบุ',
            isMore: true,
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
    ],
  },
];
