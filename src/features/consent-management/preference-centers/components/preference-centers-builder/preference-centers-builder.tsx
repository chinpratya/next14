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
} from '@/shared';
import { useConsentBuilderStore } from '@/stores/consent-builder';
import utils, { getColLayout } from '@/utils';
import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetPreferenceCentersPreview } from '../../api/get-preference-centers-preview';

const { useBreakpoint } = Grid;

type PreferenceCentersBuilderProps = {
  preferenceCentersId: string;
};
export const PreferenceCentersBuilder = ({
  preferenceCentersId,
}: PreferenceCentersBuilderProps) => {
  const { onSetStoreId, onInitiateForm, reset } =
    useConsentBuilderStore();

  const { data, isLoading, isError } =
    useGetPreferenceCentersPreview({
      preferenceCenterId: preferenceCentersId,
    });

  const isMobile = !utils
    .getBreakPoint(useBreakpoint())
    .includes('xl');

  const [selectedBuilder, setSelectedBuilder] = useState<
    'formFields' | 'formContent'
  >('formFields');

  useEffect(() => {
    if (data) {
      onSetStoreId(preferenceCentersId);
      onInitiateForm(data);
    }
    return () => {
      reset();
    };
  }, [
    data,
    onInitiateForm,
    onSetStoreId,
    preferenceCentersId,
    reset,
  ]);

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
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              style={{
                height: '100vh',
                minHeight: 750,
              }}
            >
              <ConsentBuilderLogo />
              <ConsentBuilderContent type="header" />
              <ConsentBuilderForm />
              <ConsentBuilderContent type="footer" />
            </Scrollbars>
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
                    label: 'แบบฟอร์มฟิลด์',
                    value: 'formFields',
                  },
                  {
                    label: 'เนื้อหาแบบฟอร์ม',
                    value: 'formContent',
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Flex>
            <Divider />
            {selectedBuilder === 'formFields' ? (
              <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                style={{
                  height: '100vh',
                  minHeight: 750,
                }}
              >
                <ConsentBuilderFormFields
                  isUsePurposesPanel={true}
                  isUseHeaderPanel={false}
                  isUseFieldsPanel={false}
                  isUseActivitiesPanel={false}
                  isUseLabelPanel={false}
                  isUseIdentifierPanel={false}
                />
              </Scrollbars>
            ) : (
              <ConsentBuilderFormContent />
            )}
          </Col>
        </Row>
      </ConsentBuilderContext>
    </FallbackError>
  );
};
