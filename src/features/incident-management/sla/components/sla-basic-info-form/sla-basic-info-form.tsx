import {
  Form,
  FormInstance,
  Input,
  Skeleton,
} from 'antd';
import { useCreateSla } from '@/features/incident-management/sla/api/add-sla';
import { useUpdateSla } from '@/features/incident-management/sla/api/update-sla';
import validation from '@/utils/validation';
import React, {
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useNotifications } from '@/stores/notifications';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { ServerityListDatas } from '@/features/incident-management/workflow/types';
import detsil from './detailData.json';

type SlaBasicInfoFormProps = {
  // form?: FormInstance;
  onSubmit?: () => void;
  children?: ReactNode;
  defalutData?: any;
  isLoading?: boolean;
  slaData?: ServerityListDatas & any;
  setEdittable?: boolean;
  setErrorState(e: any): void;
  setEditState(e: boolean): void;
};

export interface Root {
  description: string;
  detail: string;
  name: string;
  severityList: severityList[];
}
export interface severityList {
  responseDescription: string;
  responsePeriod: ResponsePeriod;
  severityId: string;
  workDescription: string;
  workPeriod: WorkPeriod;
}

export interface ResponsePeriod {
  days: number;
  hours: number;
  minutes: number;
}

export interface WorkPeriod {
  days: number;
  hours: number;
  minutes: number;
}

export const SlaBasicInfoForm = ({
  onSubmit,
  children,
  isLoading,
  defalutData,
  slaData,
  setEdittable,
  setErrorState,
  setEditState,
}: SlaBasicInfoFormProps) => {
  const router = useRouter();
  const { showNotification } = useNotifications();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const { submit } = useCreateSla({
    onSuccess: (data) => {
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.tags.create'
        ) as string,
      });
      router.push(
        `${router.pathname.split('create')[0]}${
          data?.data?.objectUuid as string
        }`
      );
    },
  });
  const { submit: mutate } = useUpdateSla({
    slaId: defalutData?.objectUuid as string,
    onSuccess: () => {
      setErrorState(undefined);
      setEditState(false);
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.tags.create'
        ) as string,
      });
      router.push(`${router.asPath}`);
    },
  });
  const dataColumns =
    slaData?.data || slaData?.severityList;
  const sortData = dataColumns?.sort(
    (a: { order: number }, b: { order: number }) =>
      (b?.order || 0) - (a?.order || 0)
  );

  const oncreate = (e: any) => {
    const datas = e;
    const test = sortData?.map(
      (data: {
        severityId: string;
        value: string;
        objectUuid: string;
      }) => {
        return {
          responseDescription:
            datas[
              `sla-${data?.value}-description-descriptionResponsTime`
            ] || '',
          responsePeriod: {
            days: datas[
              `sla-${data?.value}-timeLimit-responsTime-day`
            ],
            hours:
              datas[
                `sla-${data?.value}-timeLimit-responsTime-hrs`
              ],
            minutes:
              datas[
                `sla-${data?.value}-timeLimit-responsTime-mins`
              ],
          },
          severityId:
            data?.objectUuid || data?.severityId,
          workDescription:
            datas[
              `sla-${data?.value}-description-descriptionWorkingTime`
            ] || '',
          workPeriod: {
            days: datas[
              `sla-${data?.value}-timeLimit-workingTime-day`
            ],
            hours:
              datas[
                `sla-${data?.value}-timeLimit-workingTime-hrs`
              ],
            minutes:
              datas[
                `sla-${data?.value}-timeLimit-workingTime-mins`
              ],
          },
        };
      }
    );

    if (defalutData) {
      mutate({
        description: datas.description,
        detail: datas.detail,
        name: datas.name,
        severityList: test,
      });
    } else {
      submit({
        description: datas.description,
        detail: datas.detail,
        name: datas.name,
        severityList: test,
      });
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    setErrorState(errorInfo);
  };

  useEffect(() => {
    if (defalutData) {
      form?.setFieldsValue(defalutData);
      sortData?.map(
        (data: {
          severityId: string;
          value: string;
          objectUuid: string;
          time: ['days', 'hrs', 'mins'];
        }) => {
          form?.setFieldsValue({
            [`sla-${data.value}-description-descriptionResponsTime`]:
              defalutData.severityList.find(
                (e: any) => e.value === data.value
              ).responseDescription,
          });
          form?.setFieldsValue({
            [`sla-${data.value}-description-descriptionWorkingTime`]:
              defalutData.severityList.find(
                (e: any) => e.value === data.value
              ).workDescription,
          });
          form?.setFieldsValue({
            [`sla-${data.value}-timeLimit-responsTime-day`]:
              defalutData.severityList.find(
                (e: any) => e.value === data.value
              ).responsePeriod.days,
          });
          form?.setFieldsValue({
            [`sla-${data.value}-timeLimit-responsTime-hrs`]:
              defalutData.severityList.find(
                (e: any) => e.value === data.value
              ).responsePeriod.hours,
          });
          form?.setFieldsValue({
            [`sla-${data.value}-timeLimit-responsTime-mins`]:
              defalutData.severityList.find(
                (e: any) => e.value === data.value
              ).responsePeriod.minutes,
          });
          form?.setFieldsValue({
            [`sla-${data.value}-timeLimit-workingTime-day`]:
              defalutData.severityList.find(
                (e: any) => e.value === data.value
              ).workPeriod.days,
          });
          form?.setFieldsValue({
            [`sla-${data.value}-timeLimit-workingTime-hrs`]:
              defalutData.severityList.find(
                (e: any) => e.value === data.value
              ).workPeriod.hours,
          });
          form?.setFieldsValue({
            [`sla-${data.value}-timeLimit-workingTime-mins`]:
              defalutData.severityList.find(
                (e: any) => e.value === data.value
              ).workPeriod.minutes,
          });
        }
      );
    }
  }, [defalutData]);

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton active />
        </>
      ) : (
        <>
          <Form
            form={form}
            layout="vertical"
            onFinish={(e) => oncreate(e)}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="ชื่อ"
              name="name"
              rules={[
                validation.required('กรุณากรอกชื่อ'),
              ]}
            >
              <Input disabled={!setEdittable} />
            </Form.Item>
            <Form.Item
              label="รายละเอียด"
              name="description"
              rules={[
                validation.required(
                  'กรุณากรอกรายละเอียด'
                ),
              ]}
            >
              <Input.TextArea disabled={!setEdittable} />
            </Form.Item>
            {children}
          </Form>
        </>
      )}
    </>
  );
};
