import { css } from '@emotion/css';
import { useSetState } from '@mantine/hooks';
import {
  Checkbox,
  Col,
  Input,
  Row,
  Typography,
} from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';

import { getColLayout } from '@/utils';
import { Flex } from '@components/flex';

import { UploadButton } from '../../../../../shared';
import { WebformBuilderItem } from '../../../types/webform-builder';

import { WidgetBodyWrapper } from './widget-body-wrapper';
import { WidgetFooter } from './widget-footer';
import { WidgetHeader } from './widget-header';

export type CheckBoxWidgetValue = {
  checked: string[];
  optionValues: {
    [key: string]: string;
  };
};
export const CheckBoxWidget = ({
  title,
  description,
  options,
  verticalAlignment,
  readOnly,
  value: initialValue,
}: WebformBuilderItem) => {
  const [checkboxValue, setCheckboxValue] =
    useSetState<CheckBoxWidgetValue>({
      checked: [],
      optionValues: {},
    });

  const onValidate = () => {
    return new Promise<Record<string, unknown>>(
      (resolve, reject) => {
        if (checkboxValue.checked.length === 0) {
          reject('กรุณาเลือกอย่างน้อย 1 ข้อ');
        }
        Object.entries(checkboxValue.checked).forEach(
          ([, value]) => {
            if (
              _.find(options, {
                title: value,
                isMore: true,
                type: 'input',
              })
            ) {
              if (!checkboxValue.optionValues[value]) {
                reject(`กรุณากรอกข้อมูลในช่อง ${value}`);
              }
            }
            if (
              _.find(options, {
                title: value,
                isMore: true,
                type: 'attachment',
              })
            ) {
              if (!checkboxValue.optionValues[value]) {
                reject(`กรุณาแนบไฟล์ในช่อง ${value}`);
              }
            }
          }
        );

        resolve(checkboxValue);
      }
    );
  };

  useEffect(() => {
    if (initialValue) {
      setCheckboxValue(
        initialValue as CheckBoxWidgetValue
      );
    }
  }, [initialValue, setCheckboxValue]);

  return (
    <>
      <WidgetHeader
        title={title}
        description={description}
      />
      <WidgetBodyWrapper readOnly={readOnly}>
        <div className="mt-4 mb-4">
          <Checkbox.Group
            disabled={readOnly}
            className={css`
              .ant-checkbox-wrapper > span:last-child {
                width: 100%;
              }
            `}
            value={checkboxValue.checked}
            onChange={(checkedValues) => {
              setCheckboxValue({
                checked: checkedValues as string[],
              });
            }}
          >
            <Row>
              {options?.map((option, index: number) => (
                <Col
                  className="mb-4"
                  key={index}
                  {...getColLayout(24)}
                >
                  <Checkbox
                    style={{ width: '100%' }}
                    value={option.title as string}
                  >
                    <Flex
                      alignItems="center"
                      flexDirection={
                        verticalAlignment
                          ? 'column'
                          : 'row'
                      }
                    >
                      <Typography.Text
                        style={{
                          width:
                            verticalAlignment ||
                            !option.isMore
                              ? '100%'
                              : '40%',
                        }}
                      >
                        {option.title as string}
                      </Typography.Text>
                      <div
                        style={{
                          width:
                            verticalAlignment ||
                            !option.isMore
                              ? '100%'
                              : '60%',
                        }}
                        hidden={
                          !option.isMore ||
                          !checkboxValue.checked.includes(
                            option.title as string
                          )
                        }
                      >
                        {option.isMore &&
                          option.type ===
                            'attachment' && (
                            <UploadButton
                              module="portal-assessment-automation"
                              group="portal-webform"
                              label={option.placeholder}
                              disabled={
                                !checkboxValue.checked.includes(
                                  option.title as string
                                ) || readOnly
                              }
                              value={
                                checkboxValue
                                  .optionValues[
                                  option.title as string
                                ]
                              }
                              onChange={(value) => {
                                setCheckboxValue({
                                  optionValues: {
                                    ...checkboxValue.optionValues,
                                    [option.title as string]:
                                      value as string,
                                  },
                                });
                              }}
                            />
                          )}
                        {option.isMore &&
                          option.type === 'input' && (
                            <Input
                              value={
                                checkboxValue
                                  .optionValues[
                                  option.title as string
                                ]
                              }
                              onChange={(e) => {
                                setCheckboxValue({
                                  optionValues: {
                                    ...checkboxValue.optionValues,
                                    [option.title as string]:
                                      e.target.value,
                                  },
                                });
                              }}
                              placeholder={
                                option?.placeholder as string
                              }
                              className={`w-100 ${
                                verticalAlignment
                                  ? 'mt-2'
                                  : ''
                              }`}
                              disabled={
                                !checkboxValue.checked.includes(
                                  option.title as string
                                ) || readOnly
                              }
                            />
                          )}
                      </div>
                    </Flex>
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </div>
      </WidgetBodyWrapper>
      <WidgetFooter
        readonly={readOnly}
        onValidate={onValidate}
      />
    </>
  );
};
