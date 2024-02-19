import { InfoCircleOutlined } from '@ant-design/icons';
import { Flex } from '@mantine/core';
import {
  Form,
  FormInstance,
  Col,
  Typography,
  Switch,
  Select,
  Checkbox,
  Tooltip,
} from 'antd';

import { getColLayout } from '@/utils';

type WorkflowUploadFileAnswerProps = {
  form?: FormInstance;
};

export const WorkflowUploadFileAnswer =
  ({}: WorkflowUploadFileAnswerProps) => {
    return (
      <Col {...getColLayout(24)}>
        <Flex justify="flex-start">
          <Typography
            style={{
              fontSize: '16px',
              fontFamily: 'Roboto',
              marginRight: '10px',
              marginBottom: -10,
            }}
          >
            Only certain file types are allowed.
          </Typography>
          <Form.Item
            name={'only_true'}
            valuePropName="checked"
          >
            <Switch
              style={{
                marginTop: -20,
                marginRight: 5,
              }}
            />
          </Form.Item>
        </Flex>

        <Form.Item
          shouldUpdate={(prevValues, curValues) =>
            prevValues.only_true !== curValues.only_true
          }
          noStyle
        >
          {({ getFieldsValue }) => {
            return (
              <>
                {getFieldsValue().only_true === true && (
                  <Flex
                    direction="row"
                    align="flex-start"
                    gap={30}
                    wrap="wrap"
                    justify="space-between"
                  >
                    <Form.Item name={'document'}>
                      <Checkbox>Document</Checkbox>
                      <Tooltip
                        placement="bottom"
                        title=".doc, .docx, .odt, .rtf, .txt, .tex, .wps, .wpd, .pages"
                      >
                        <InfoCircleOutlined />
                      </Tooltip>
                    </Form.Item>

                    <Form.Item name={'presentation'}>
                      <Checkbox>Presentation</Checkbox>
                      <Tooltip
                        placement="bottom"
                        title=".ppt, .pptx, .pps, .ppsx, .odp, .key, .sda, .sdd"
                      >
                        <InfoCircleOutlined />
                      </Tooltip>
                    </Form.Item>

                    <Form.Item name={'spreadsheet'}>
                      <Checkbox>Spreadsheet</Checkbox>
                      <Tooltip
                        placement="bottom"
                        title=".xls, .xlsx, .ods, .csv, .tsv, .gnumeric, .numbers, .qpw"
                      >
                        <InfoCircleOutlined />
                      </Tooltip>
                    </Form.Item>

                    <Form.Item name={'pdf'}>
                      <Checkbox>PDF</Checkbox>
                      <Tooltip
                        placement="bottom"
                        title=".pdf"
                      >
                        <InfoCircleOutlined />
                      </Tooltip>
                    </Form.Item>

                    <Form.Item name={'image'}>
                      <Checkbox>Image</Checkbox>
                      <Tooltip
                        placement="bottom"
                        title=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff, .eps, .raw, .indd, .ai, .heic, .svg, .psd, .ico"
                      >
                        <InfoCircleOutlined />
                      </Tooltip>
                    </Form.Item>

                    <Form.Item name={'sound'}>
                      <Checkbox>Sound</Checkbox>
                      <Tooltip
                        placement="bottom"
                        title=".mp3, .wav, .aac, .flac, .ogg, .wma, .m4a, .ra, .rm, .midi"
                      >
                        <InfoCircleOutlined />
                      </Tooltip>
                    </Form.Item>
                  </Flex>
                )}
              </>
            );
          }}
        </Form.Item>

        <Flex direction="row" gap={20}>
          <Form.Item
            style={{
              width: '50%',
            }}
            label="Maximun number of files"
            required
          >
            <Select
              placeholder="Responsible Person"
              defaultValue={1}
              options={[
                { label: 1, value: 1 },
                { label: 5, value: 5 },
              ]}
            />
          </Form.Item>

          <Form.Item
            style={{
              width: '50%',
            }}
            label="Max file size"
            required
          >
            <Select
              defaultValue={10000000}
              options={[
                { label: '1 MB', value: 1000000 },
                { label: '10 MB', value: 10000000 },
                { label: '100 MB', value: 100000000 },
              ]}
            />
          </Form.Item>
        </Flex>
      </Col>
    );
  };
