import { css } from '@emotion/css';
import { Image } from 'antd';

import { TemplateSettingEmail } from '../types';

export type EmailPreviewProps = {
  emailSetting?: TemplateSettingEmail;
};

export const EmailPreview = ({
  emailSetting,
}: EmailPreviewProps) => {
  const header = emailSetting?.header;
  const footer = emailSetting?.footer;
  const button = emailSetting?.button;

  return (
    <div
      className={css`
        font-family: 'TH SarabunPSK', sans-serif;
        font-size: 24px;

        strong {
          font-weight: 600;
        }

        p {
          margin-bottom: 0;
          line-height: 1;
        }

        h2 {
          font-size: 28px;
          margin: 0;
          padding: 0;
        }

        h4 {
          font-size: 24px;
          margin: 0;
          padding: 0;
        }
      `}
    >
      <div
        className={css`
          padding: 24px 0;
          background-color: ${header?.backgroundColor};
        `}
      />
      <div
        style={{
          display: header?.showLogo ? 'flex' : 'none',
          justifyContent: 'center',
          padding: '24px 0',
        }}
      >
        <Image
          src={header?.logo}
          alt="email template header logo"
          width={300}
        />
      </div>
      <div
        className={css`
          padding: 0 76px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-top: 24px;

          p {
            margin-bottom: 14px;
          }
        `}
      >
        <div className="w-100 mb-2">
          <strong>เรียน เจ้าหน้าที่ องค์กร</strong>{' '}
          (ดร.สายธารา นะโมนะโม)
        </div>
        <div className="ml-4">
          <p>
            เนื่องจากองค์กรของท่าน
            ต้องทำการประเมินตามกฎหมาย
            กรุณาทำแบบประเมินให้เสร็จสิ้นภายในระยะเวลาที่กำหนด
            โดยมีรายละเอียดดังนี้
          </p>
          <p>
            <strong>ชื่อการประเมิน : </strong>
            การประเมินครั้งที่ 1
          </p>
          <p>
            <strong>ชื่อแบบประเมิน : </strong>
            แบบสำรวจความพร้อมระบบ...
          </p>
          <p>
            <strong>ประเภทแบบประเมิน : </strong>
            ความพร้อม
          </p>
          <p>
            <strong>ผู้อนุมัติ : </strong>
            ดร.ธิติวัต การงาน
          </p>
          <p>
            <strong>ระยะเวลาสำหรับทำแบบประเมิน : </strong>
            {new Date().toLocaleDateString('th-TH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              minute: 'numeric',
              hour: 'numeric',
            })}{' '}
            -{' '}
            {new Date(
              new Date().getTime() +
                1000 * 60 * 60 * 24 * 7
            ).toLocaleDateString('th-TH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              minute: 'numeric',
              hour: 'numeric',
            })}
          </p>
          <div className="text-center">
            <button
              style={{
                backgroundColor: button?.backgroundColor,
                color: button?.textColor,
                padding: '12px 24px',
                marginTop: 24,
                border: 'none',
                pointerEvents: 'none',
              }}
            >
              คลิกที่นี่เพื่อทำแบบประเมิน
            </button>
          </div>
        </div>
      </div>
      <div
        className={css`
          display: flex;
          justify-content: center;
          margin-top: 24px;
          padding: 0 76px;
        `}
      >
        <div
          className={css`
            border-top: 1px solid rgb(84, 88, 89);
            width: 100%;
            padding: 24px 0;
            display: flex;
            gap: 24px;
            align-items: center;

            @media (max-width: 768px) {
              flex-direction: column;
            }
          `}
        >
          {footer?.showLogo && (
            <Image
              src={footer?.logo}
              alt="email template footer logo"
              width={80}
            />
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: footer?.content ?? '',
            }}
          />
        </div>
      </div>
      <div
        style={{
          padding: '24px 0',
          backgroundColor: footer?.backgroundColor,
        }}
      />
    </div>
  );
};
