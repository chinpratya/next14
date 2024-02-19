import { css } from '@emotion/css';
import { Typography, Row, Col } from 'antd';

import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { IntlMessage } from '@/components/util-components/intl-message';
import { convertBytesToSize } from '@/utils';

type ArchiveDetailInformationProps = {
  name: string;
  createdDate: string;
  size: number;
  label: string;
};

export const ArchiveDetailInformation = ({
  name,
  size,
  createdDate,
  label,
}: ArchiveDetailInformationProps) => {
  return (
    <>
      <Typography.Text className="font-weight-semibold">
        <IntlMessage id="logManagement.archive.information" />
      </Typography.Text>

      <Row
        gutter={[0, 18]}
        className={css`
          margin-top: 15px;
          font-size: 12px;
          margin-bottom: 35px;
        `}
      >
        <Col span={6}>
          <IntlMessage id="logManagement.archive.type" />{' '}
          :
        </Col>
        <Col span={18}>GZ</Col>

        <Col span={6}>
          <IntlMessage id="logManagement.archive.fileName" />{' '}
          :
        </Col>
        <Col span={18}>{name}</Col>

        <Col span={6}>
          <IntlMessage id="logManagement.createdDate" /> :
        </Col>
        <Col span={18}>
          <ShowTagDate date={createdDate} />
        </Col>

        <Col span={6}>
          <IntlMessage id="logManagement.archive.pathName" />{' '}
          :
        </Col>
        <Col span={18}>{label}</Col>

        <Col span={6}>
          <IntlMessage id="logManagement.archive.size" />{' '}
          :
        </Col>
        <Col span={18}>{convertBytesToSize(size)}</Col>
      </Row>
    </>
  );
};
