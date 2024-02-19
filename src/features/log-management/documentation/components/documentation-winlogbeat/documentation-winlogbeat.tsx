import { css } from '@emotion/css';
import { Typography } from 'antd';
import Link from 'next/link';

import { DocumentationImage } from '../documentation-image';
import { DocumentationTag } from '../documentation-tag';

export const DocumentationWinlogbeat = () => {
  return (
    <div>
      <Typography.Title
        level={3}
        className="font-weight-bold mb-3"
      >
        WINLOGBEAT
      </Typography.Title>

      <p style={{ lineHeight: '25px' }}>
        คู่มือการติดตั้ง Winlogbeat
        นี้ถูกสร้างขึ้นเพื่อให้คุณได้รับคำแนะนำและขั้นตอนที่เป็นประโยชน์ในการติดตั้งและกำหนดค่า
        Winlogbeat
        ให้สามารถทำงานได้อย่างถูกต้องและมีประสิทธิภาพสูงสุดในองค์กรของคุณ
        ในคู่มือนี้คุณจะพบขั้นตอนและคำแนะนำเบื้องต้นในการติดตั้ง
        Winlogbeat ที่ครอบคลุมทั้งระบบการเตรียมการ,
        ขั้นตอนการดาวน์โหลดและติดตั้ง, การกำหนดค่าสำคัญ,
        และการทดสอบความพร้อมใช้งาน
      </p>

      <p>
        ทำตามขั้นตอนด้านล่างเพื่อทำการติดตั้ง
        <span className="font-weight-bold mx-1">
          Certificate
        </span>
        ของ
        <span className="font-weight-bold mx-1">
          Winlogbeat
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
              Beat Port
              <DocumentationImage src="/img/log-management/document/port.png" />
            </li>
          </ul>
        </li>
        <li>
          เมื่อสร้าง Certificate เสร็จแล้ว
          ต่อไปจะเป็นวิธีการสร้างไฟล์ cert.pem
        </li>
        <li>
          ไปที่ Folder C:\Program Files จากนั้นทำการสร้าง
          Folder ที่ชื่อ cert
          <DocumentationImage src="/img/log-management/document/winlogbeat/winlogbeat-step6.png" />
        </li>
        <li>
          จากนั้นไปเปิดโปรแกรม Notepad ทำการ copy
          ข้อมูลที่ได้จากการสร้าง Certificate ในส่วน
          <DocumentationTag label="Certificate" />
          จากนั้นกด Paste ใน Notepad ทำการ save
          ข้อมูลไว้ที่ Path : C:\Program Files\cert
          การตั้งชื่อไฟล์ให้ใส่ File name : cert.pem และ
          Save as type : All files ตามภาพ เป็นอันเสร็จสิ้น
          <DocumentationImage src="/img/log-management/document/winlogbeat/winlogbeat-step7.png" />
        </li>
        <li>
          เมื่อสร้างไฟล์ cert.pem เสร็จแล้ว
          ต่อไปจะเป็นวิธีการกำหนดค่า Winlogbeat
        </li>
        <li>
          ไปที่ File C:\Program Files\winlogbeat เลือก
          winlogbeat.yml จากนั้นเข้าไปแก้ไข Configuration
          โดยการคลิ๊กขวา เลือกเมนู edit with Notepad ++
          <DocumentationImage src="/img/log-management/document/winlogbeat/winlogbeat-step9.png" />
        </li>
        <li>
          นำส่วนหน้าของ host (ข้อ4)
          <DocumentationTag label="64bf4c357ab2c0ab8eb153f9" />
          แก้ไข Configuration ในส่วน fields
          <DocumentationImage src="/img/log-management/document/winlogbeat/winlogbeat-step10.png" />
        </li>
        <li>
          นำhost (ข้อ4)
          <DocumentationTag label="64bf4c357ab2c0ab8eb153f9" />
          และ ssl.certificate_authorities: นำข้อมูลมาจาก
          path ทำการสร้างไฟล์ cert.pem แก้ไข Configuration
          ในส่วน output.logstash จากนั้นทำการกด save
          เสร็จสิ้นการสร้าง Configuration Winlogbeat
          เรียบร้อย
          <DocumentationImage src="/img/log-management/document/winlogbeat/winlogbeat-step11.png" />
        </li>
        <li>
          เมื่อสร้าง Configuration Winlogbea เสร็จแล้ว
          ต่อไปจะเป็นวิธีการทดสอบ Configuration Winlogbeat
        </li>
        <li>
          ไปที่ช่องค้นหาจากนั้นพิม Windows PowerShell
          (x86) กดคลิกขวา เลือก run as administrator
          <DocumentationImage src="/img/log-management/document/winlogbeat/winlogbeat-step13.png" />
        </li>
        <li>
          จากนั้นพิมคำสั่ง
          <DocumentationTag label="cd 'C:\Program Files\winlogbeat'" />
          <DocumentationImage src="/img/log-management/document/winlogbeat/winlogbeat-step14.png" />
        </li>
        <li>
          จากนั้นพิมคำสั่ง
          <DocumentationTag label=".\winlogbeat.exe test config -c .\winlogbeat.yml -e" />
          เพื่อเช็คการทำงานของ Configuration
          <DocumentationImage src="/img/log-management/document/winlogbeat/winlogbeat-step15.png" />
        </li>
        <li>
          จากนั้นพิมคำสั่ง
          <DocumentationTag label=".\winlogbeat.exe setup -e" />
          <DocumentationImage src="/img/log-management/document/winlogbeat/winlogbeat-step16.png" />
        </li>
        <li>
          จากนั้นพิมคำสั่ง
          <DocumentationTag label="PowerShell.exe -ExecutionPolicy UnRestricted -File .\install-service-winlogbeat.ps1." />
          <DocumentationImage src="/img/log-management/document/winlogbeat/winlogbeat-step17.png" />
        </li>
        <li>
          จากนั้นพิมคำสั่ง
          <DocumentationTag label="Start-Service winlogbeat" />
          เท่านี้ก็ถือว่าวิธีการทดสอบ Configuration
          Winlogbeat เสร็จสิ้น
          <DocumentationImage src="/img/log-management/document/winlogbeat/winlogbeat-step18.png" />
        </li>
      </ul>
    </div>
  );
};
