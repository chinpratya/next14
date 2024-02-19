import { css } from '@emotion/css';
import { Typography } from 'antd';
import Link from 'next/link';

import { DocumentationImage } from '../documentation-image';
import { DocumentationTag } from '../documentation-tag';

export const DocumentationFilebeat = () => {
  return (
    <div>
      <Typography.Title
        level={3}
        className="font-weight-bold mb-3"
      >
        Filebeat
      </Typography.Title>

      <p style={{ lineHeight: '25px' }}>
        การติดตั้ง Filebeat
        เป็นขั้นตอนที่สำคัญในการเริ่มต้นใช้งาน Elastic
        Stack
        เพื่อให้คุณสามารถเก็บรวบรวมและประมวลผลข้อมูลบันทึกได้อย่างมีประสิทธิภาพดังนั้นในบทนี้
        เราจะสรุปขั้นตอนพื้นฐานในการติดตั้ง Filebeat
        เพื่อเตรียมระบบของคุณให้พร้อมรับการส่งข้อมูลบันทึก
        ขั้นตอนแรกในการติดตั้ง Filebeat
        คือการดาวน์โหลดไฟล์ติดตั้ง
        สำหรับระบบปฏิบัติการที่คุณใช้งานอยู่
        สามารถดาวน์โหลดได้จากเว็บไซต์ของ Elastic เอง
        หลังจากดาวน์โหลดและแตกไฟล์ติดตั้งคุณจะได้รับโครงสร้างไดเรกทอรีที่มีไฟล์
        ต่าง ๆ ที่เกี่ยวข้อง
      </p>

      <p>
        ทำตามขั้นตอนด้านล่างเพื่อทำการติดตั้ง
        <span className="font-weight-bold mx-1">
          Filebeat
        </span>
      </p>
      <ul
        className={css`
          list-style: decimal;
          color: #72849a;
          display: flex;
          flex-direction: column;
          gap: 8px;

          li {
            line-height: 25px;
          }
        `}
      >
        <li>
          เข้าไปที่
          <DocumentationTag>
            <Link
              href="https://beta.onefence.co/apps"
              target="_blank"
            >
              https://beta.onefence.co/apps
            </Link>
          </DocumentationTag>
          จากนั้นกดเลือก Cyberfence
        </li>
        <li>
          จากนั้นเลือกหัวข้อ Indices แล้วกด Add Indices
        </li>
        <li>
          จากนั้นกรอกข้อมูลเกี่ยวกับอุปกรณ์ที่ใช้ใส่การเก็บ
          log
        </li>
        <li>
          ขั้นตอนการสร้าง Certificate ดำเนินการเสร็จสิ้น
          จะได้รายละเอียดข้อมูลโชว์ในหน้า รายการอุปกรณ์
          มีข้อมูล 3 ส่วนที่นำไปใช้ในขั้นตอนถัดไป
          <ul
            className="mt-2"
            style={{ listStyle: 'initial' }}
          >
            <li className="font-weight-semibold">
              Certificate
              <DocumentationImage src="/img/log-management/document/certificate.png" />
            </li>
            <li className="font-weight-semibold">
              Host
              <DocumentationImage src="/img/log-management/document/host.png" />
            </li>
            <li className="font-weight-semibold">
              Syslog Port
              <DocumentationImage src="/img/log-management/document/port.png" />
            </li>
          </ul>
        </li>
        <li>
          เมื่อสร้าง Certificate เสร็จแล้ว
          ต่อไปจะเป็นวิธีติดตั้ง Filebeat
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="apt update" />
          <DocumentationImage src="/img/log-management/document/filebeat/filebeat-step6.png" />
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="apt install curl -y" />
          <DocumentationImage src="/img/log-management/document/filebeat/filebeat-step7.png" />
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="acurl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.8.2-amd64.deb" />
          <DocumentationImage src="/img/log-management/document/filebeat/filebeat-step8.png" />
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="dpkg -i filebeat-8.8.2-amd64.deb" />
          <DocumentationImage src="/img/log-management/document/filebeat/filebeat-step9.png" />
        </li>
        <li>
          เมื่อติดตั้ง Filebeat เสร็จแล้ว
          ต่อไปจะเป็นวิธีกำหนดค่า Config filebeat
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="cd /etc/filebeat/" />
          และ
          <DocumentationTag label="ls -l" />
          เพื่อเช็คไฟล์ที่ทำการติดตั้งไป
          <DocumentationImage src="/img/log-management/document/filebeat/filebeat-step11.png" />
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="sudo vim filebeat.yml" />
          จากนั้นเลื่อนไปหัวข้อ inputs แก้ไขข้อมูลส่วน
          type เป็น
          <DocumentationTag label="log" />
          จากนั้นใส่เครื่องหมาย
          <DocumentationTag label="#" />
          หน้า id: my-filestream-id และ enabled: false
          สุดท้ายให้แก้ไขส่วนของ path เป็น
          <DocumentationTag label="auth.log" />
          <DocumentationImage src="/img/log-management/document/filebeat/filebeat-step12.png" />
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="Token:" />
          ตามด้วยส่วนหน้าของ host (ข้อ4)
          <DocumentationTag label="64bf4c357ab2c0ab8eb153f9" />
          แก้ไขในส่วน fields จากนั้นใช้คำสั่ง
          <DocumentationTag label="type : beat" />
          <DocumentationImage src="/img/log-management/document/filebeat/filebeat-step13.png" />
        </li>
        <li>
          นำ host (ข้อ4)
          <DocumentationTag label="64bf4c357ab2c0ab8eb153f9.log.cyber.onefence.co" />
          และ ssl.certificate_authorities: นำข้อมูลมาจาก
          path ทำการสร้างไฟล์ cert.pem แก้ไข Configuration
          ในส่วน output.logstash จากนั้นทำการกด ESC
          ตามด้วย :wq! กด Enter เสร็จสิ้นการ Configuration
          เรียบร้อยแล้ว
          <DocumentationImage src="/img/log-management/document/filebeat/filebeat-step14.png" />
        </li>
        <li>
          เมื่อกำหนดค่า Config filebeat เสร็จแล้ว
          ต่อไปจะเป็นวิธีการสร้าง File cert.pem
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="cd /etc/ssl/certs/" />
          แล้วใช้คำสั่ง
          <DocumentationTag label="vim cert.pem" />
          เพื่อทำการสร้างไฟล์
          <DocumentationImage src="/img/log-management/document/filebeat/filebeat-step16.png" />
        </li>
        <li>
          จากนั้นจะปรากฎช่องว่าง ให้ทำใช้คำสั่ง
          ข้อมูลที่ได้จากการสร้าง Certificate ในส่วน
          <DocumentationTag label="Certificate" />
          จากนั้นกดปุ่ม esc และตามด้วย :wq! กด Enter
          เป็นอันเสร็จสิ้น
          <DocumentationImage src="/img/log-management/document/filebeat/filebeat-step17.png" />
        </li>
        <li>
          เมื่อสร้าง File cert.pem เสร็จแล้ว
          ต่อไปจะเป็นวิธีเช็คการทำงานของ Filebeat
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="cd /etc/filebeat/" />
          <DocumentationImage src="/img/log-management/document/filebeat/filebeat-step19.png" />
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="sudo filebeat -e -c filebeat.yml" />
          เพื่อเช็ค Configuration ว่าทำงานปกติหรือไม่
          <DocumentationImage src="/img/log-management/document/filebeat/filebeat-step20.png" />
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="sudo service filebeat start" />
          เป็นอันเสร็จสิ้นกระบวนการทำงานทั้งหมด
          สามารถเข้าไปเช็ค log ได้ที่หน้าเว็บไซต์
          <DocumentationImage src="/img/log-management/document/filebeat/filebeat-step21.png" />
        </li>
      </ul>
    </div>
  );
};
