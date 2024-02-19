import { PaperClipOutlined } from '@ant-design/icons';
import { Typography, Empty, Skeleton } from 'antd';
import _ from 'lodash';

import { Flex } from '@components/flex';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetActivityMeta } from '../../api/get-activity-meta';
import { Protectioninfo } from '../../types';
type ActivityDisclosurePurposeDestinationMeasureModalDetailProps =
  {
    open: boolean;
    onClose: () => void;
    lawId: string;
  };

export const ActivityDisclosurePurposeDestinationMeasureModalDetail =
  ({
    open,
    onClose,
    lawId,
  }: ActivityDisclosurePurposeDestinationMeasureModalDetailProps) => {
    const { data, isLoading, isError } =
      useGetActivityMeta({
        law: true,
      });
    const findObjectByKey = (
      array: Array<Protectioninfo>
    ) => {
      for (const obj of array) {
        if (obj.id === lawId) {
          return obj;
        }
        if (obj.childs.length > 0) {
          const result = _.find(
            obj.childs,
            (v) => v.id === lawId
          );
          console.log('result', result);

          if (result) {
            return result;
          }
        }
      }
      return null;
    };
    const lawDetail = findObjectByKey(
      data?.protectioninfo ?? []
    );

    return (
      <Modal
        title={
          <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.measure.detail" />
        }
        open={open}
        onCancel={onClose}
        width={800}
        okButtonProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <FallbackError isError={isError}>
          {!isLoading ? (
            <>
              <Typography.Title level={3}>
                คำสั่งควบคุม
              </Typography.Title>
              <div
                dangerouslySetInnerHTML={{
                  __html: lawDetail?.discussion ?? '-',
                }}
              />
              <Typography.Title
                level={3}
                className="mt-2"
              >
                เอกสาร
              </Typography.Title>
              {lawDetail?.reference &&
              lawDetail?.reference.length > 0 ? (
                _.map(
                  lawDetail?.reference,
                  (v, index) => {
                    return (
                      <Flex
                        justifyContent="start"
                        alignItems={'start'}
                        className="mb-2"
                      >
                        <PaperClipOutlined className="mt-1 mr-1" />
                        <div
                          key={index}
                          dangerouslySetInnerHTML={{
                            __html: v,
                          }}
                        />
                      </Flex>
                    );
                  }
                )
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </>
          ) : (
            <Skeleton active />
          )}
        </FallbackError>
      </Modal>
    );
  };
