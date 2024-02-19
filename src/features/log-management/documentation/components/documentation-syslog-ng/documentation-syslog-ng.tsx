import { css } from '@emotion/css';
import { Typography } from 'antd';
import Link from 'next/link';

import { DocumentationImage } from '../documentation-image';
import { DocumentationTag } from '../documentation-tag';

export const DocumentationSyslogNg = () => {
  return (
    <div>
      <Typography.Title
        level={3}
        className="font-weight-bold mb-3"
      >
        SYSLOG-NG
      </Typography.Title>

      <p style={{ lineHeight: '25px' }}>
        การติดตั้ง syslog-ng
        เริ่มต้นด้วยการตรวจสอบว่าระบบปฏิบัติการของคุณสนับสนุน
        syslog-ng หากคุณใช้ระบบปฏิบัติการที่เข้ากันได้กับ
        syslog-ng คุณสามารถดาวน์โหลดและติดตั้ง syslog-ng
        ได้จากเว็บไซต์หลักของ syslog-ng หรือจากที่อยู่ URL
        ที่กำหนดให้ การติดตั้ง syslog-ng
        อาจมีขั้นตอนที่ควรจำไว้ เช่น
        การกำหนดค่าการตั้งค่าเริ่มต้น
        การกำหนดค่าการเข้าถึงข้อมูลและการเข้ารหัส
        และการกำหนดค่าที่เกี่ยวข้องอื่น ๆ
        นอกจากนี้ยังมีเอกสารและคู่มือที่มีอยู่สำหรับช่วย
        ในกระบวนการติดตั้งและการใช้งาน syslog-ng
        ให้ง่ายขึ้น
      </p>

      <p>
        ทำตามขั้นตอนด้านล่างเพื่อทำการติดตั้ง
        <span className="font-weight-bold mx-1">
          Certificate
        </span>
        ของ
        <span className="font-weight-bold mx-1">
          Syslog-ng
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
          ต่อไปจะเป็นการติดตั้ง syslog-ng ลงบน Ubuntu
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="sudo -i" />
          เพื่อเปลี่ยนการดำเนินการเป็นสิทธิ์ของผู้ใช้งานเป็นสิทธิ์ของผู้ดูแลระบบ
          (root)
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="apt update && sudo apt upgrade && sudo apt install syslog-ng -y" />
          <DocumentationImage src="/img/log-management/document/syslog-ng/syslog-ng-step7.png" />
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="ufw allow 6514/tcp" />
          <DocumentationImage src="/img/log-management/document/syslog-ng/syslog-ng-step8.png" />
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="ufw allow 6514/udp" />
          <DocumentationImage src="/img/log-management/document/syslog-ng/syslog-ng-step9.png" />
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="ufw enble" />
          <DocumentationImage src="/img/log-management/document/syslog-ng/syslog-ng-step10.png" />
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="sudo ufw status verbose" />
          <DocumentationImage src="/img/log-management/document/syslog-ng/syslog-ng-step11.png" />
        </li>
        <li>
          เมื่อติดตั้ง syslog-ng ลงบน Ubuntu เสร็จแล้ว
          ต่อไปจะเป็นวิธีสร้างไฟล์ fortigate.conf
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="cd /etc/syslog-ng/conf.d/" />
          <DocumentationImage src="/img/log-management/document/syslog-ng/syslog-ng-step13.png" />
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="vim forti.conf" />
          เป็นการเพิ่มช่องว่าง จากนั้นวางเนื้อหาจาก
          <DocumentationTag label="ลิงค์สำหรับการโหลด Config" />
          ลงในช่องว่าง เพื่อสร้างไฟล์ config ในการส่ง log
          <DocumentationImage src="/img/log-management/document/syslog-ng/syslog-ng-step14.png" />
        </li>
        <li>
          แก้ไขในส่วนของ Network ip ให้นำ IP ขอเครื่อง
          Proxy Server มาใส่ จากนั้นทำการ copy
          ข้อมูลที่ได้จากการสร้าง Certificate ในส่วน
          <DocumentationTag label="Host" />
          แก้ไขในส่วนของ Destination Network
          และแก้ไขในส่วนของ ca_dir ให้นำ path ที่
          สร้างไฟล์ cert.pem มาใส่ในหัวข้อนี้
          เสร็จแล้วกดปุ่ม esc และตามด้วย :wq!
          เพื่อบันทึกคอนฟิก ที่ทำรายการไป
          <DocumentationImage src="/img/log-management/document/syslog-ng/syslog-ng-step15.png" />
        </li>
        <li>
          เมื่อสร้างไฟล์ fortigate.conf เสร็จแล้ว
          ต่อไปจะเป็นวิธีการสร้าง File cert.pem
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="cd /etc" />
          ตามด้วยคำสั่ง
          <DocumentationTag label="mkdir cyber" />,
          <DocumentationTag label="cd cyber/" />
          เพื่อทำการสร้างโฟเดอร์ ของ cyber แล้วใช้คำสั่ง
          <DocumentationTag label="vim forti.conf" />
          เพื่อทำการสร้างไฟล์ .pem
          <DocumentationImage src="/img/log-management/document/syslog-ng/syslog-ng-step17.png" />
        </li>
        <li>
          จากนั้นจะปรากฎช่องว่าง ให้ทำใช้คำสั่ง
          ข้อมูลที่ได้จากการสร้าง Certificate ในส่วน
          <DocumentationTag label="Certificate" />
          จากนั้นพิม esc และตามด้วย :wq! เป็นอันเสร็จสิ้น
          <DocumentationImage src="/img/log-management/document/syslog-ng/syslog-ng-step18.png" />
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="ccd /etc/syslog-ng/" />
          <DocumentationImage src="/img/log-management/document/syslog-ng/syslog-ng-step19.png" />
        </li>
        <li>
          ใช้คำสั่ง
          <DocumentationTag label="systemctl restart syslog-ng" />
          เพื่อเริ่มการทำงาน syslog-ng เป็นอันเสร็จสิ้น
          <DocumentationImage src="/img/log-management/document/syslog-ng/syslog-ng-step20.png" />
        </li>
      </ul>
    </div>
  );
};
