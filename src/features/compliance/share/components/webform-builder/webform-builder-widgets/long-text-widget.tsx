import { UploadOutlined } from '@ant-design/icons';
import { useSetState } from '@mantine/hooks';
import { Button, Col, Input, Row } from 'antd';
import { useEffect } from 'react';

import { getColLayout } from '@/utils';

import {
  WebformBuilderLongTextOption,
  WebformBuilderItem,
} from '../../../types/webform-builder';

import { WidgetBodyWrapper } from './widget-body-wrapper';
import { WidgetFooter } from './widget-footer';
import { WidgetHeader } from './widget-header';

export type LongTextWidgetValues = {
  textValues: string[];
};

export const LongTextWidget = ({
  title,
  description,
  options,
  readOnly,
  value: initialValue,
}: WebformBuilderItem) => {
  const [longTextValues, setLongTextValues] =
    useSetState<LongTextWidgetValues>({
      textValues: [],
    });

  const onValidate = () => {
    return new Promise<Record<string, unknown>>(
      (resolve, reject) => {
        options?.forEach((option, index) => {
          if (!longTextValues.textValues[index]) {
            reject(`กรุณากรอกข้อมูล`);
          }
        });

        resolve(longTextValues);
      }
    );
  };

  useEffect(() => {
    if (initialValue) {
      setLongTextValues(initialValue);
    }
  }, [initialValue, setLongTextValues]);

  return (
    <>
      <WidgetHeader
        title={title}
        description={description}
      />
      <WidgetBodyWrapper readOnly={readOnly}>
        <div className="mt-4 mb-4">
          {options?.map(
            (
              option: WebformBuilderLongTextOption,
              index: number
            ) => (
              <Row
                key={index}
                justify="space-between"
                className="mb-2"
                gutter={16}
              >
                <Col {...getColLayout(24)}>
                  <Input.TextArea
                    disabled={readOnly}
                    value={
                      longTextValues.textValues?.[index]
                    }
                    autoSize={{ minRows: 3, maxRows: 10 }}
                    onChange={(e) =>
                      setLongTextValues({
                        textValues: [
                          ...longTextValues.textValues.slice(
                            0,
                            index
                          ),
                          e.target.value,
                          ...longTextValues.textValues.slice(
                            index + 1
                          ),
                        ],
                      })
                    }
                    placeholder={option.placeholder}
                    className="w-100"
                  />
                </Col>
                <Col {...getColLayout(4)}>
                  <Button
                    disabled={readOnly}
                    hidden={!option?.attachment}
                    icon={<UploadOutlined />}
                    block
                  >
                    แนบไฟล์
                  </Button>
                </Col>
              </Row>
            )
          )}
        </div>
      </WidgetBodyWrapper>
      <WidgetFooter
        readonly={readOnly}
        onValidate={onValidate}
      />
    </>
  );
};
