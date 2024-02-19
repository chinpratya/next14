import { FileZipOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Col,
  Divider,
  Drawer,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import { Fragment } from 'react';

import { Flex } from '@/components/share-components/flex';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';

import { useGetLogFile } from '../../api/get-log-file';
import { Archive } from '../../types';

import { ArchiveDetailInformation } from './archive-detail-information';

type ArchiveDetailProps = {
  open: boolean;
  data?: Archive;
  onClose: () => void;
};

export const ArchiveDetail = ({
  open,
  data: archive,
  onClose,
}: ArchiveDetailProps) => {
  const { data, isError, isLoading } = useGetLogFile({
    fileId: archive?.id as string,
    enabled: !!archive?.id && open,
  });

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
    >
      <FallbackError isError={isError}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <FileZipOutlined
                className={css`
                  font-size: 65px;
                  color: #7f61ff;
                  margin-bottom: 15px;
                `}
              />
              <Typography.Text
                className="text-center font-size-md"
                style={{ minHeight: 76 }}
              >
                {data?.name}
              </Typography.Text>
            </Flex>
            <Divider />

            <ArchiveDetailInformation
              name={data?.name ?? '-'}
              createdDate={data?.created_date ?? '-'}
              label={data?.label ?? '-'}
              size={data?.size ?? 0}
            />

            <Typography.Text className="font-weight-semibold">
              <IntlMessage id="logManagement.archive.hash" />
            </Typography.Text>
            <Row
              gutter={[0, 18]}
              className={css`
                margin-top: 15px;
                font-size: 12px;
                margin-bottom: 35px;
              `}
            >
              {data?.hashing &&
                Object.entries(data.hashing).map(
                  ([key, value]) => (
                    <Fragment key={key}>
                      <Col span={6}>
                        {key.toUpperCase()} :
                      </Col>
                      <Col
                        span={18}
                        style={{
                          overflowWrap: 'break-word',
                        }}
                      >
                        {value}
                      </Col>
                    </Fragment>
                  )
                )}
            </Row>

            <Typography.Text className="font-weight-semibold">
              <IntlMessage id="logManagement.explorer.archive" />
            </Typography.Text>
            <Row
              gutter={[0, 18]}
              className={css`
                margin-top: 15px;
                font-size: 12px;
                margin-bottom: 35px;
              `}
            >
              <Col span={24}>
                <Typography.Text
                  className={css`
                    font-size: 14px;
                    color: #72849a;
                  `}
                >
                  {data?.archive.note
                    ? data.archive.note
                    : '-'}
                </Typography.Text>
              </Col>
              <Col span={6}>
                <IntlMessage id="logManagement.explorer.archiveDate" />{' '}
                :
              </Col>
              <Col span={18}>
                {data?.archive.is ? (
                  <ShowTagDate
                    date={data?.archive.created_date}
                  />
                ) : (
                  '-'
                )}
              </Col>
              <Col span={6}>
                <IntlMessage id="logManagement.archive.archiveTo" />{' '}
                :
              </Col>
              <Col span={18}>
                {data?.archive.is ? (
                  <ShowTagDate
                    date={data?.archive.date}
                  />
                ) : (
                  '-'
                )}
              </Col>
            </Row>
          </>
        )}
      </FallbackError>
    </Drawer>
  );
};
