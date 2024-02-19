import {
  Col,
  Divider,
  Grid,
  Radio,
  Row,
  Skeleton,
} from 'antd';
import { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import {
  ConsentBuilderContent,
  ConsentBuilderContext,
  ConsentBuilderForm,
  ConsentBuilderFormContent,
  ConsentBuilderFormFields,
  ConsentBuilderLogo,
  ConsentStyleWrapper,
} from '@/shared';
import { useConsentBuilderStore } from '@/stores/consent-builder';
import utils, { getColLayout } from '@/utils';
import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetCollectionPointPreview } from '../../api/get-collection-point-preview';

const { useBreakpoint } = Grid;

type CollectionPointBuilderProps = {
  collectionPointsId: string;
};

export const CollectionPointBuilder = ({
  collectionPointsId,
}: CollectionPointBuilderProps) => {
  const {
    onSetStoreId,
    onInitiateForm,
    reset,
    formSetting,
  } = useConsentBuilderStore();

  const { data, isError, isLoading } =
    useGetCollectionPointPreview(collectionPointsId);

  const isMobile = !utils
    .getBreakPoint(useBreakpoint())
    .includes('xl');

  const [selectedBuilder, setSelectedBuilder] = useState<
    'formFields' | 'formContent'
  >('formFields');

  useEffect(() => {
    onSetStoreId(collectionPointsId);
  }, [collectionPointsId, onSetStoreId]);

  useEffect(() => {
    if (data) {
      onInitiateForm(data);
    }
    return () => {
      reset();
    };
  }, [data, onInitiateForm, reset]);

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <FallbackError isError={isError}>
      <ConsentBuilderContext>
        <Row style={{ minHeight: 'calc(100vh - 384px)' }}>
          <Col
            {...getColLayout(16)}
            className={
              isMobile ? '' : 'border-right pr-4'
            }
          >
            <ConsentStyleWrapper
              pageSetting={formSetting?.page}
            >
              <ConsentBuilderLogo />
              <ConsentBuilderContent type="header" />
              <ConsentBuilderForm />
              <ConsentBuilderContent type="footer" />
            </ConsentStyleWrapper>
          </Col>
          <Col
            {...getColLayout(8)}
            className={isMobile ? '' : 'pl-4'}
          >
            <Flex justifyContent="center">
              <Radio.Group
                value={selectedBuilder}
                onChange={(e) =>
                  setSelectedBuilder(e.target.value)
                }
                options={[
                  {
                    label: (
                      <IntlMessage id="consentManagement.collectionPoint.builder.formFields" />
                    ),
                    value: 'formFields',
                  },
                  {
                    label: (
                      <IntlMessage id="consentManagement.collectionPoint.builder.formContent" />
                    ),
                    value: 'formContent',
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Flex>
            <Divider />
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              style={{
                height: 'calc(100vh - 88px)',
                minHeight: 750 - 88,
              }}
            >
              {selectedBuilder === 'formFields' ? (
                <ConsentBuilderFormFields
                  isUseActivitiesPanel={false}
                />
              ) : (
                <ConsentBuilderFormContent
                  isUsePurposeStyle
                />
              )}
            </Scrollbars>
          </Col>
        </Row>
      </ConsentBuilderContext>
    </FallbackError>
  );
};
