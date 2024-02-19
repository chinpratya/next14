import { css } from '@emotion/css';
import { useSetState } from '@mantine/hooks';
import { Radio, Col, Input, Row, Typography } from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';

import { getColLayout } from '@/utils';
import { Flex } from '@components/flex';

import { UploadButton } from '../../../../../shared';
import {
  WebformBuilderCheckBoxOption,
  WebformBuilderItem,
} from '../../../types/webform-builder';

import { WidgetBodyWrapper } from './widget-body-wrapper';
import { WidgetFooter } from './widget-footer';
import { WidgetHeader } from './widget-header';

export type RadioBoxWidgetValue = {
  selected: string;
  optionValues: {
    [key: string]: string;
  };
};

export const RadioBoxWidget = ({
  title,
  description,
  options,
  verticalAlignment,
  readOnly,
  value: initialValue,
}: WebformBuilderItem) => {
  const [radioValue, setRadioValue] =
    useSetState<RadioBoxWidgetValue>({
      selected: '',
      optionValues: {},
    });

  const onValidate = () => {
    return new Promise<Record<string, unknown>>(
      (resolve, reject) => {
        if (!radioValue.selected) {
          reject('กรุณาเลือกอย่างน้อย 1 ข้อ');
        }
        const rules =
          _.find(options, {
            title: radioValue.selected,
          })?.rules ?? [];

        _.forEach(
          rules,
          ({
            regex,
            errorMessage,
          }: {
            regex: string;
            errorMessage: string;
          }) => {
            if (
              !new RegExp(regex).test(
                radioValue.optionValues[
                  radioValue.selected
                ]
              )
            ) {
              reject(errorMessage);
            }
          }
        );

        if (
          _.find(options, {
            title: radioValue.selected,
            isMore: true,
            type: 'input',
          })
        ) {
          if (
            !radioValue.optionValues[radioValue.selected]
          ) {
            reject(
              `กรุณากรอกข้อมูลในช่อง ${radioValue.selected}`
            );
          }
        }
        if (
          _.find(options, {
            title: radioValue.selected,
            isMore: true,
            type: 'attachment',
          })
        ) {
          if (
            !radioValue.optionValues[radioValue.selected]
          ) {
            reject(
              `กรุณาอัพโหลดไฟล์ในช่อง ${radioValue.selected}`
            );
          }
        }
        resolve(radioValue);
      }
    );
  };

  useEffect(() => {
    if (initialValue) {
      setRadioValue(initialValue as RadioBoxWidgetValue);
    }
  }, [initialValue, setRadioValue]);

  return (
    <>
      <WidgetHeader
        title={title}
        description={description}
      />
      <WidgetBodyWrapper readOnly={readOnly}>
        <div className="mt-4 mb-4">
          <Radio.Group
            className={css`
              .ant-radio-wrapper > span:last-child {
                width: 100%;
              }

              width: 100%;
            `}
            disabled={readOnly}
            value={radioValue.selected}
            onChange={(e) => {
              setRadioValue({
                selected: e.target.value,
              });
            }}
          >
            <Row>
              {options?.map(
                (
                  option: WebformBuilderCheckBoxOption
                ) => (
                  <Col
                    className="mb-4"
                    key={option.title}
                    {...getColLayout(24)}
                  >
                    <Radio
                      value={option.title}
                      className="w-100"
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
                          style={
                            verticalAlignment ||
                            !option.isMore
                              ? { width: '100%' }
                              : { width: '40%' }
                          }
                        >
                          {option.title}
                        </Typography.Text>
                        <div
                          style={
                            verticalAlignment ||
                            !option.isMore
                              ? { width: '100%' }
                              : { width: '60%' }
                          }
                          hidden={
                            !option.isMore ||
                            radioValue.selected !==
                              option.title
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
                                  radioValue.selected !==
                                    option.title ||
                                  readOnly
                                }
                                value={
                                  radioValue.optionValues[
                                    option.title
                                  ]
                                }
                                onChange={(value) => {
                                  setRadioValue({
                                    optionValues: {
                                      ...radioValue.optionValues,
                                      [option.title]:
                                        value as string,
                                    },
                                  });
                                }}
                              />
                            )}
                          {option.isMore &&
                            option.type === 'input' && (
                              <Input
                                placeholder={
                                  option.placeholder
                                }
                                className={
                                  verticalAlignment
                                    ? 'w-100 mt-2'
                                    : 'w-100 ml-2'
                                }
                                disabled={
                                  radioValue.selected !==
                                    option.title ||
                                  readOnly
                                }
                                value={
                                  radioValue.optionValues[
                                    option.title
                                  ]
                                }
                                onChange={(e) => {
                                  setRadioValue({
                                    optionValues: {
                                      ...radioValue.optionValues,
                                      [option.title]:
                                        e.target.value,
                                    },
                                  });
                                }}
                              />
                            )}
                        </div>
                      </Flex>
                    </Radio>
                  </Col>
                )
              )}
            </Row>
          </Radio.Group>
        </div>
      </WidgetBodyWrapper>
      <WidgetFooter
        readonly={readOnly}
        onValidate={onValidate}
      />
    </>
  );
};
