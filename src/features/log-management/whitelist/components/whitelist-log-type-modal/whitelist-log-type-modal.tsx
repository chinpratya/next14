import { css } from '@emotion/css';
import { List, Table, Typography } from 'antd';

import { Modal } from '@/components/share-components/modal';
import { IntlMessage } from '@/components/util-components/intl-message';

type WhitelistLogTypeModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const WhitelistLogTypeModal = ({
  open,
  onCancel,
}: WhitelistLogTypeModalProps) => {
  const dataSource = [
    {
      id: 1,
      type: 'ก. ข้อมูลอินเทอร์เน็ตที่เกิดจากการ เข้าถึงระบบเครือข่าย',
      detail: [
        '๑) ข้อมูล Log ที่มีการบันทึกไว้เมื่อมีการเข้าถึงระบบเครือข่ายซึ่งระบุถึงตัวตนและ สิทธิในการเข้าถึงเครือข่าย (Access Logs Specific to Authentication and Authorization Servers เช่น TACACS (Terminal Access Controller AccessControl System) or RADIUS (Remote Authentication Dial-In User Service) or DIAMETER (Used to Control Access to IP Routers or Network Access Servers)',
        '๒) ข้อมูลเกี่ยวกับวัน และเวลาการติดต่อของเครื่องที่เข้ามาใช้บริการและเครื่อง ให้บริการ (Date and Time of Connection of Client to Server)2',
        '๓) ข้อมูลเกี่ยวกับชื่อที่ระบุตัวตนผู้ใช้ (User ID)',
        '๔) ข้อมูลหมายเลขชุดอินเทอร์เน็ตที่ถูกกำหนดให้โดยระบบผู้ให้บริการ (Assigned IP Address)',
        '๕) ข้อมูลที่บอกถึงหมายเลขสายที่เรียกเข้ามา (Calling Line Identification)',
      ],
    },
    {
      id: 2,
      type: 'ข. ข้อมูลอินเทอร์เน็ตบนเครื่อง ผู้ให้บริการจดหมายอิเล็กทรอนิกส์ (e-mail servers)',
      detail: [
        '๑) ข้อมูล Log ที่บันทึกไว้เมื่อเข้าถึงเครื่องให้บริการไปรษณีย์อิเล็กทรอนิกส์ (Simple Mail Transfer Protocol : SMTP Log) ซึ่งได้แก่\n - ข้อมูลหมายเลขของข้อความที่ระบุในจดหมายอิเล็กทรอนิกส์(Message ID)\n - ข้อมูลชื่อที่อยู่อิเล็กทรอนิกส์ของผู้ส่ง (Sender E-mail Address)\n - ข้อมูลชื่อที่อยู่อิเล็กทรอนิกส์ของผู้รับ (Receiver E-mail Address)\n - ข้อมูลที่บอกถึงสถานะในการตรวจสอบ (Status Indicator) ซึ่งได้แก่ จดหมาย อิเล็กทรอนิกส์ที่ส่งสำเร็จ จดหมายอิเล็กทรอนิกส์ที่ส่งคืน จดหมายอิเล็กทรอนิกส์ที่มี การส่งล่าช้า เป็นต้น',
        '๒) ข้อมูลหมายเลขชุดอินเทอร์เน็ตของเครื่องคอมพิวเตอร์ผู้ใช้บริการที่เชื่อมต่ออยู่ ขณะเข้ามาใช้บริการ (IP Address of Client Connected to Server)',
        '๓) ข้อมูลวัน และเวลาการติดต่อของเครื่องที่เข้ามาใช้บริการและเครื่องให้บริการ (Date and time of connection of Client Connected to server)',
        '๔) ข้อมูลหมายเลขชุดอินเทอร์เน็ตของเครื่องบริการจดหมายอิเล็กทรอนิกส์ ที่ถูกเชื่อมต่ออยู่ในขณะนั้น (IP Address of Sending Computer)',
        '๕) ชื่อผู้ใช้งาน (User ID)',
        '๖) ข้อมูลที่บันทึกการเข้าถึงข้อมูลจดหมายอิเล็กทรอนิกส์ ผ่านโปรแกรมจัดการจาก เครื่องของสมาชิก หรือการเข้าถึงเพื่อเรียกข้อมูลจดหมายอิเล็กทรอนิกส์ไปยังเครื่อง สมาชิก โดยยังคงจัดเก็บข้อมูลที่บันทึกการเข้าถึงข้อมูลจดหมายอิเล็กทรอนิกส์ที่ดึงไป นั้น ไว้ที่เครื่องให้บริการ (POP3 (Post Office Protocol version 3) Log or IMAP4 (Internet Message Access Protocol Version 4) Log)',
      ],
    },
    {
      id: 3,
      type: 'ค. ข้อมูลอินเทอร์เน็ตจากการโอน แฟ้มข้อมูลบนเครื่องให้บริการโอน แฟ้มข้อมูล',
      detail: [
        '๑) ข้อมูล Log ที่บันทึกเมื่อมีการเข้าถึงเครื่องให้บริการโอนแฟ้มข้อมูล',
        '๒) ข้อมูลวัน และเวลาการติดต่อของเครื่องที่เข้ามาใช้บริการและเครื่องให้บริการ (Date and Time of Connection of Client to Server)',
        '๓) ข้อมูลหมายเลขชุดอินเทอร์เน็ตของเครื่องคอมพิวเตอร์ผู้เข้าใช้ที่เชื่อมต่ออยู่ใน ขณะนั้น (IP Source Address)',
        '๔) ข้อมูลชื่อผู้ใช้งาน (User ID)',
        '๕) ข้อมูลตำแหน่ง (Path) และ ชื่อไฟล์ที่อยู่บนเครื่องให้บริการโอนถ่ายข้อมูลที่มี การส่งขึ้นมาบันทึก หรือให้ดึงข้อมูลออกไป (Path and Filename of Data Object Uploaded or Downloaded)',
      ],
    },
    {
      id: 4,
      type: 'ง. ข้อมูลอินเทอร์เน็ตบนเครื่อง ผู้ให้บริการเว็บ',
      detail: [
        '๑) ข้อมูล Log ที่บันทึกเมื่อมีการเข้าถึงเครื่องผู้ให้บริการเว็บ',
        '๒) ข้อมูลวัน และเวลาการติดต่อของเครื่องที่เข้ามาใช้บริการและเครื่องให้บริการ',
        '๓) ข้อมูลหมายเลขชุดอินเทอร์เน็ตของเครื่องคอมพิวเตอร์ผู้เข้าใช้ที่เชื่อมต่ออยู่ใน ขณะนั้น',
        '๔) ข้อมูลคำสั่งการใช้งานระบบ',
        '๕) ข้อมูลที่บ่งบอกถึงเส้นทางในการเรียกดูข้อมูล (URI: Uniform Resource Identifier) เช่น ตำแหน่งของเว็บเพ็จ',
      ],
    },
    {
      id: 5,
      type: 'จ. ชนิดของข้อมูลบนเครือข่าย คอมพิวเตอร์ขนาดใหญ่ (Usenet)',
      detail: [
        '๑) ข้อมูล Log ที่บันทึกเมื่อมีการเข้าถึงเครือข่าย (NNTP (Network News Transfer Protocol) Log)',
        '๒) ข้อมูลวัน และเวลาการติดต่อของเครื่องที่เข้ามาใช้บริการและเครื่องให้บริการ (Date and Time of Connection of Client to Server)',
        '๓) ข้อมูลหมายเลข Port ในการใช้งาน (Protocol Process ID)',
        '๔) ข้อมูลชื่อเครื่องให้บริการ (Host Name)',
        '๕) ข้อมูลหมายเลขลำดับข้อความที่ได้ถูกส่งไปแล้ว (Posted Message ID)',
      ],
    },
    {
      id: 6,
      type: 'ฉ. ข้อมูลที่เกิดจากการโต้ตอบกันบน เครือข่ายอินเทอร์เน็ต เช่น Internet Relay Chat (IRC) หรือ Instance Messaging (IM) เป็นต้น',
      detail: [
        'ข้อมูล Log เช่น ข้อมูลเกี่ยวกับวัน เวลาการติดต่อของผู้ใช้บริการ (Date and Time of Connection of Client to Server) และ ข้อมูลชื่อเครื่องบนเครือข่าย และ หมายเลขเครื่องของผู้ให้บริการที่เครื่องคอมพิวเตอร์เชื่อมต่ออยู่ในขณะนั้น (Hostname and IP Address) เป็นต้น',
      ],
    },
  ];

  return (
    <Modal
      title={
        <IntlMessage id="logManagement.whitelist.logType" />
      }
      open={open}
      onCancel={onCancel}
      centered
      width={1500}
      footer={null}
      zIndex={1010}
    >
      <Table
        rowKey="id"
        bordered
        dataSource={dataSource}
        className={css`
          th.ant-table-cell {
            text-align: center;
            background-color: #f7f7f8;
            font-weight: 700;
          }

          td.ant-table-cell {
            vertical-align: top;
            :last-child {
              padding: 0;
            }
          }
        `}
        columns={[
          {
            key: 'type',
            title: (
              <IntlMessage id="logManagement.whitelist.logType" />
            ),
            dataIndex: 'type',
            width: 350,
          },
          {
            key: 'detail',
            title: (
              <IntlMessage id="logManagement.whitelist.adviceDetail" />
            ),
            dataIndex: 'detail',
            render(value) {
              return (
                <List
                  dataSource={value}
                  className={css`
                    .ant-list-item {
                      padding: 9px 10px;
                      white-space: break-spaces;
                    }
                  `}
                  renderItem={(item: string) => (
                    <List.Item>
                      <Typography.Text>
                        {item}
                      </Typography.Text>
                    </List.Item>
                  )}
                />
              );
            },
          },
        ]}
        pagination={false}
      />
    </Modal>
  );
};
