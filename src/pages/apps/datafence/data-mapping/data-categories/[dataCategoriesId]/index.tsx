import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Form, Tabs } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DataCategoriesDetail,
  DataCategoriesForm,
  DataCategoriesElementList,
  useGetDataCategories,
  useUpdateDataCategories,
  DataCategoriesRiskSituationList,
} from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { useToggle, usePermission } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { TitleHeader } from '@components/title-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const DataCategoriesDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const toggle = useToggle();

  const dataCategoriesId = router.query
    .dataCategoriesId as string;

  const { data, isLoading, isError } =
    useGetDataCategories(dataCategoriesId);

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:categories:update'],
    ],
  });

  const updateDataCategories = useUpdateDataCategories({
    dataCategoriesId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.dataCategories.update'
        ) as string,
      });
    },
  });

  const onUpdateDataCategories = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const payload = {
      name: values.name,
      status: values.status,
      categoryClassificationID:
        values.categoryClassification,
      organizationID: values.organizationID,
      groupID: values.groupID,
      dataSubjectID: values.dataSubjectID,
      dataCategoryID: dataCategoriesId,
      tagID: values.tagID,
      numberPerson: values.numberPerson,
    };

    updateDataCategories.submit(payload);
  };

  useEffect(() => {
    if (data) {
      const Classifications = _.map(
        data.categoryClassifications,
        (v) => {
          return v.categoryClassificationID;
        }
      );
      const dataSubjects = _.map(
        data.dataSubjects,
        (v) => v.dataSubjectID
      );
      form.setFieldsValue({
        ...data,
        categoryClassification: Classifications,
        dataSubjectID: dataSubjects,
        organization: data.organizationID,
      });
    }
    return () => {
      form.resetFields();
    };
  }, [form, data]);

  if (isLoading) {
    return <Loading cover="content" />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <TitleHeader
            title={
              <IntlMessage id="dataMapping.dataCategories.detail.title" />
            }
            meta={{
              dataCategoriesId: data?.name,
            }}
            tabKeys={['categories']}
          />
        }
        onBack={() =>
          router.replace(
            '/apps/datafence/data-mapping/data-categories'
          )
        }
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions[
                'pdpakit:datamap:categories:update'
              ],
            ]}
          >
            <Button
              onClick={() =>
                router.replace(
                  '/apps/datafence/data-mapping/data-categories'
                )
              }
              className="mr-1"
            >
              {
                <IntlMessage id="dataMapping.dataCategories.detail.cancel" />
              }
            </Button>
            <Button
              type="primary"
              loading={updateDataCategories.isLoading}
              onClick={() => onUpdateDataCategories()}
            >
              {
                <IntlMessage id="dataMapping.dataCategories.detail.save" />
              }
            </Button>
          </PermissionWrapper>
        }
        overlap
      />
      <Tabs
        items={[
          {
            key: 'generalData',
            label: (
              <IntlMessage id="dataMapping.dataCategories.generalData" />
            ),
            children: (
              <>
                <DataCategoriesDetail data={data} />
                <Card
                  title={
                    <IntlMessage id="dataMapping.dataCategories.detail" />
                  }
                >
                  <DataCategoriesForm
                    form={form}
                    data={data}
                  />
                </Card>
                <DataCategoriesElementList
                  dataCategoryID={dataCategoriesId}
                />
              </>
            ),
          },
          {
            key: 'riskAssessment',
            label: (
              <IntlMessage id="dataMapping.dataCategories.riskAssessment" />
            ),
            children: (
              <Card
                title={
                  <IntlMessage id="dataMapping.dataCategories.riskAssessment.title" />
                }
                extra={
                  <Button
                    type="primary"
                    onClick={() => toggle.create()}
                    disabled={!editPermission.isAllow}
                  >
                    <PlusCircleOutlined className="mr-1" />
                    <IntlMessage id="dataMapping.dataCategories.riskAssessment.add" />
                  </Button>
                }
              >
                <DataCategoriesRiskSituationList
                  open={toggle.openCreate}
                  onClose={() => toggle.create()}
                  dataCategoriesId={dataCategoriesId}
                />
              </Card>
            ),
          },
        ]}
      />
    </FallbackError>
  );
};

DataCategoriesDetailPage.getLayout = (
  page: React.ReactNode
) => <AppLayout>{page}</AppLayout>;

export default DataCategoriesDetailPage;
