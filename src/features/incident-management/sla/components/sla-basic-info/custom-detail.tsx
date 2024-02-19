import { css } from '@emotion/css';

export function CustomDetail() {
  return (
    <div
      className={css`
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #d4d4d4;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 24px */
        letter-spacing: -0.176px;
      `}
    >
      ไม่มีรายละเอียด <br /> เนื่องเป็นการกำหนดเอง
    </div>
  );
}
