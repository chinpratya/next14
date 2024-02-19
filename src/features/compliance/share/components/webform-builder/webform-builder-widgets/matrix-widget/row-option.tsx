import { Input, Radio, Typography } from 'antd';
import _ from 'lodash';

import { UploadButton } from '../../../../../../shared';
import { WebformBuilderMatrixRow } from '../../../../types/webform-builder';

export type RowOptionProps = {
  readOnly?: boolean;
  row: WebformBuilderMatrixRow;
  rowIndex: number;
  value?: Record<string, unknown>;
  onChange?: (value: Record<string, unknown>) => void;
};

export const RowOption = ({
  readOnly,
  row,
  value,
  onChange,
}: RowOptionProps) => {
  const onChangeRowValues = (
    index: number,
    optionValue: string
  ) => {
    const rowValues = _.get(
      value,
      'rowValues',
      []
    ) as string[];
    rowValues[index] = optionValue;
    onChange?.({
      ...value,
      rowValues,
    });
  };

  return (
    <>
      <Typography.Text>{row?.title}</Typography.Text>
      {row?.options?.map((option, optionIndex) => {
        const optionValue = _.get(value, [
          'rowValues',
          optionIndex,
        ]) as string;

        return (
          <div key={optionIndex} className="mt-1">
            {option?.type === 'input' && (
              <Input
                disabled={readOnly}
                placeholder={option?.placeholder}
                size="small"
                value={optionValue}
                onChange={(e) => {
                  onChangeRowValues(
                    optionIndex,
                    e.target.value
                  );
                }}
              />
            )}
            {option?.type === 'radio' && (
              <Radio.Group
                disabled={readOnly}
                value={optionValue}
                onChange={(e) => {
                  onChangeRowValues(
                    optionIndex,
                    e.target.value
                  );
                }}
              >
                {option?.options?.map(
                  (radioOption, radioOptionIndex) => (
                    <div
                      key={radioOptionIndex}
                      className="d-flex align-items-center mt-1"
                    >
                      <Radio
                        value={
                          radioOption?.label ??
                          radioOptionIndex
                        }
                      >
                        <>
                          {_?.get(
                            radioOption,
                            'label',
                            ''
                          )}
                          {_?.get(
                            radioOption,
                            'isMore',
                            ''
                          ) === true &&
                            _.get(radioOption, 'type') ===
                              'attachment' && (
                              <UploadButton
                                module="portal-assessment-automation"
                                group="portal-attachment"
                                className="ml-1"
                                disabled={
                                  optionValue !==
                                    radioOption?.label ||
                                  readOnly
                                }
                                label={
                                  _.get(
                                    radioOption,
                                    'uploadButtonText',
                                    ''
                                  ) as string
                                }
                              />
                            )}
                        </>
                      </Radio>
                    </div>
                  )
                )}
              </Radio.Group>
            )}
          </div>
        );
      })}
    </>
  );
};
