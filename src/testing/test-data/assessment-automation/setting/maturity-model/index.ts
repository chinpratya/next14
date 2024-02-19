import { v4 as uuid } from 'uuid';

const initialData = {
  ObjectUUID: 'd164db48-8859-46c7-834e-56d3a4153025',
  name: 'Maturity Model 1s',
  modelType: 'โรงพยาบาลรัฐ',
  numberOfWebformAvailable: 2,
  description: '',
  createdDt: '2023-04-01T00:00:00.000Z',
  createdBy: 'admin',
  updatedDt: '2023-04-01T00:00:00.000Z',
  updatedBy: 'admin',
};

const detail = [
  {
    ObjectUUID: uuid(),
    columnName: 'Initial',
    columnDetail: 'Underdeveloped',
    icon: 'https://file-management-public.s3.amazonaws.com/assessment-automation/maturity-model/developing-8fdadc6f3a79.png',
    description:
      '<ul><li>หน่วยงานยังไม่มีการจัดทำแผนที่สอดคล้องกับแผนพัฒนารัฐบาลดิจิทัล</li><li>หน่วยงานยังไม่มีแผนและรายชื่อ ชุดข้อมูลที่คาดว่าจะทำธรรมาภิบาลข้อมูลภาครัฐหรือมีรายชื่อชุดข้อมูลที่คาดว่าจะทำธรรมาภิบาลข้อมูล แล้ว แต่ยังไม่มีแผนการดำเนินงาน</li><li>หน่วยงานไม่มีการเปิดเผยข้อมูลในระดับใดเลย</li><li>หน่วยงานไม่มีการเปิดเผยชุดข้อมูลเปิดภาครัฐในรูปแบบดิจิทัลต่อสาธารณะ</li><li>หน่วยงานไม่มีการนำข้อมูลไป วิเคราะห์</li></ul>',
  },
  {
    ObjectUUID: uuid(),
    columnName: 'Developing',
    columnDetail: 'Traditional',
    icon: 'https://file-management-public.s3.amazonaws.com/assessment-automation/maturity-model/defined-c03a598317c8.png',
    description:
      '<ul><li>หน่วยงานมีการจัดทำแผนที่สอด คล้องกับแผนพัฒนารัฐบาลดิจิทัลเป็นส่วนน้อยซึ่งยังไม่ครบทุกแนวทาง ปฏิบัติและมาตรการที่จำ เป็น(แยกตามภารกิจหลักของ หน่วยงาน)</li><li>หน่วยงานมีรายชื่อชุดข้อมูลที่คาดว่าจะทำธรรมาภิ บาลข้อมูลภาครัฐ และแผนการดำเนินงาน แล้วแต่ยังไม่มีการดำเนินงาน</li><li>หน่วยงานมีการเปิดเผยข้อมูลในระดับ 1 ดาว ซึ่งประกอบไฟล์ PDF, DOC, TXT, TIFF และ JPEG</li><li>หน่วยงานมีการเปิดเผยชุดข้อมูล ต่อสาธารณะแต่ไม่ได้ถูกดึงไป แสดงบน เว็บไซต์กลาง (data.go.th)</li><li>หน่วยงานมีการนำข้อมูลมาใช้ใน การวิเคราะห์ 1 ใน 4 ข้อ</li></ul>',
  },
  {
    ObjectUUID: uuid(),
    columnName: 'Defined',
    columnDetail: 'Developed',
    icon: 'https://file-management-public.s3.amazonaws.com/assessment-automation/maturity-model/initial-13b6282caa57.png',
    description:
      '<ul><li>หน่วยงานมีการจัดทำแผนที่สอดคล้องกับแผนพัฒนารัฐบาลดิจิทัล บางส่วนซึ่งยังไม่ครบทุกแนวทาง ปฏิบัติและมาตรการที่จำเป็น (แยกตามภารกิจหลักของหน่วย งาน)</li><li>หน่วยงานมีการดำเนินการเกี่ยวกับธรรมาภิบาลข้อมูลภาครัฐในด้าน เดียวกันแล้ว 3 ข้อ ตามกำหนด</li><li>หน่วยงานมีการเปิดเผยข้อมูลใน ระดับ 2 ดาว ซึ่งประกอบด้วยไฟล์ XLS</li><li>หน่วยงานมีการเปิดเผยชุดข้อมูล ต่อสาธารณะบน เว็บไซต์กลาง (data.go.th)และเปิดเผยชุดข้อ- มูลใน GD Catalog หน่วยงานมีการนำข้อมูลมาใช้ใน การวิเคราะห์ 2 ใน 4 ข้อ</li></ul>',
  },
  {
    ObjectUUID: uuid(),
    columnName: 'Managed',
    columnDetail: 'Insight-driven Transformation',
    icon: 'https://file-management-public.s3.amazonaws.com/assessment-automation/maturity-model/managed-08c41e508c01.png',
    description:
      '<ul><li>หน่วยงานมีการจัดทำแผนที่สอด คล้องกับแผนพัฒนารัฐบาลดิจิทัล เกือบครบทุกแนวทางปฏิบัติและมาตรการที่จำเป็น(แยกตามภารกิจ หลักของหน่วยงาน)</li><li>หน่วยงานมีการดำเนินการเกี่ยวกับธรรมาภิบาลข้อมูลภาครัฐในด้าน เดียวกันแล้ว 4 ข้อ ตามกำหนด</li><li>หน่วยงานมีการเปิดเผยข้อ 3 ดาวขึ้นไป ซึ่งประกอบด้วยไฟล์ CSV, ODS, XML, JSON, KML, SHP, KMZ, RDF (URIs), RDF, (Linked data)</li><li>หน่วยงานมีการเปิดเผยข้อมูลต่อ สาธารณะบนเว็บไซต์ กลาง(data.go.th)และเปิดเผยชุดข้อมูลใน GD Catalog โดยมีชุด ข้อมูลเปิด เผยเพิ่ม ขึ้น 30% เมื่อเทียบกับปีก่อนหน้า หน่วยงานมีการนำข้อมูลใช้ในการ วิเคราะห์ 3 ใน 4 ข้อ</li></ul>',
  },
  {
    ObjectUUID: uuid(),
    columnName: 'Optimizing',
    columnDetail: 'Sustainability',
    icon: 'https://file-management-public.s3.amazonaws.com/assessment-automation/maturity-model/optimizing-17fcfe4dcd77.png',
    description:
      '<ul><li>หน่วยงานมีการจัดทำแผนที่สอด คล้องกับแผนพัฒนารัฐบาลดิจิทัล เกือบครบทุกแนวทางปฏิบัติและมาตรการที่จำเป็น(แยกตามภารกิจ หลักของหน่วยงาน)</li><li>หน่วยงานมีการดำเนินการเกี่ยวกับธรรมาภิบาลข้อมูลภาครัฐในด้าน เดียวกันครบถ้วนทุกข้อ</li><li>หน่วยงานมีการเปิดเผยข้อมูลใน ระดับ 3ดาวขึ้นไปซึ่งประกอบด้วย ไฟล์ CSV, ODS, XML, JSON, KML, SHP, KMZ, RDF (URIs), RDF, (Linked data)</li><li>หน่วยงานมีการเปิดเผยข้อมูลต่อ สาธารณะบนเว็บไซต์กลาง (data.go.th)และเปิดเผยชุดข้อ-มูลใน GDCatalogโดยมีชุดข้อ-มูลเปิดเผยเพิ่มขึ้น 30% เมื่อเทียบกับปีก่อนหน้าและมีการ นำข้อมูลไปใช้ประโยชน์ หน่วยงานมีการนำข้อมูลมาใช้ใน การวิเคราะห์ครบถ้วนทั้ง 4 ข้อ</li></ul>',
  },
];

const list = Array.from({ length: 20 }, (_, i) => {
  const maturityModelUUID = uuid();
  return {
    ...initialData,
    ObjectUUID: `623d6c41-3c8e-4102-99d9-60b5af79c48e${i}`,
    name: `Maturity Model ${i + 1}`,
    detail: detail.map((d) => ({
      ...d,
      ObjectUUID: uuid(),
      maturityModelUUID: maturityModelUUID,
    })),
  };
});

export const maturityModel = {
  list,
};
