import { css } from '@emotion/css';
import { Col, Form, FormInstance, Row } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { CYBER_DISABLED_TEXT_COLOR } from '@/config/color';
import {
  bytesToUnit,
  convertBytesToSize,
  getColLayout,
} from '@/utils';

import { IndiceDetail } from '../../types';

import { IndicesInfoDataGeneral } from './indices-info-data-general';
import { IndicesInfoDetail } from './indices-info-detail';
import { IndicesInfoDurationTime } from './indices-info-duration-time';
import { IndicesInfoSetting } from './indices-info-setting';
import { IndicesInfoStorageSize } from './indices-info-storage-size';

export type IndicesInfoProps = {
  form: FormInstance;
  data: IndiceDetail;
};

export const IndicesInfo = ({
  form,
  data,
}: IndicesInfoProps) => {
  const { query } = useRouter();
  const [beat_port, syslog_port] = data.port;

  const onExportPemFile = () => {
    const element = document.createElement('a');
    const file = new Blob([data.certificate], {
      type: 'text/plain;charset=utf-8',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'certificate.pem';
    document.body.appendChild(element);
    element.click();
  };

  useEffect(() => {
    const initailForm = () => {
      const { storage, current_size } = data;

      const [storageValue, storageUnit] =
        bytesToUnit(storage);

      const free = convertBytesToSize(
        storage - current_size
      );

      form.setFieldsValue({
        ...data,
        beat_port,
        syslog_port,
        free,
        use: convertBytesToSize(current_size),
        total: storageValue,
        unit: storageUnit,
      });
    };

    if (data) initailForm();
  }, [beat_port, data, form, syslog_port]);

  return (
    <Form
      layout="vertical"
      form={form}
      className={css`
        .ant-input-disabled,
        .ant-input-number-disabled,
        .ant-select-disabled.ant-select:not(
            .ant-select-customize-input
          )
          .ant-select-selector {
          color: ${CYBER_DISABLED_TEXT_COLOR};
        }
      `}
      disabled={query?.edit !== 'true'}
    >
      <Row gutter={[24, 0]}>
        <Col {...getColLayout(12)}>
          <IndicesInfoDataGeneral />
          <IndicesInfoSetting
            mode={data.mode}
            indice={data}
            onExportPemFile={onExportPemFile}
          />
        </Col>
        <Col {...getColLayout(12)}>
          <IndicesInfoDetail
            createdAt={data?.created_date}
            updatedAt={data?.updated_date}
          />
          <IndicesInfoDurationTime />
          <IndicesInfoStorageSize
            form={form}
            currentSize={data?.current_size ?? 0}
          />
        </Col>
      </Row>
    </Form>
  );
};
