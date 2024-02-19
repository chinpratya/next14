import { css } from '@emotion/css';
import {
  Row,
  Col,
  Form,
  Select,
  Input,
  Switch,
} from 'antd';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

import { useListAgencies } from '@/features/admin';
import { useSearch } from '@/hooks';
import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { Flex } from '@components/flex';
import { SelectPhonePrefix } from '@components/select-phone-prefix';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const DatePicker = dynamic(
  () =>
    import('@/components/share-components/date-picker'),
  { ssr: false }
);

import { useListJobTitle } from '../../../job-title';

export type UserDetailFromInfoProps = {
  showStatus?: boolean;
  isCreate?: boolean;
};

export const UserDetailFromInfo = ({
  showStatus = false,
  isCreate,
}: UserDetailFromInfoProps) => {
  const { t } = useTranslation();
  const { onSearch, debouncedSearch } = useSearch();

  const jobTitle = useListJobTitle({
    search: debouncedSearch,
  });

  const agencies = useListAgencies({
    page_size: 100,
    type_group: 'agencies',
  });

  const jobTitleOptions = jobTitle?.data?.data?.map(
    (item) => ({
      value: item.positionId,
      label: item.name,
    })
  );

  return (
    <Row gutter={[24, 0]}>
      <Col {...getColLayout(12)}>
        <Form.Item
          label={
            <IntlMessage id="admin.userManagement.user.create.firstName" />
          }
          name="first_name"
          // rules={
          //   !isCreate
          //     ? [
          //         validation.required(
          //           t(
          //             'admin.userManagement.user.create.firstNameRequired'
          //           )
          //         ),
          //       ]
          //     : undefined
          // }
        >
          <Input
            placeholder={
              t(
                'admin.userManagement.user.create.firstNamePlaceholder'
              ) as string
            }
          />
        </Form.Item>
      </Col>
      <Col {...getColLayout(12)}>
        <Form.Item
          label={
            <IntlMessage id="admin.userManagement.user.create.lastName" />
          }
          name="last_name"
          // rules={
          //   !isCreate
          //     ? [
          //         validation.required(
          //           t(
          //             'admin.userManagement.user.create.lastNameRequired'
          //           )
          //         ),
          //       ]
          //     : undefined
          // }
        >
          <Input
            placeholder={
              t(
                'admin.userManagement.user.create.lastNamePlaceholder'
              ) as string
            }
          />
        </Form.Item>
      </Col>

      <Col {...getColLayout(12)}>
        <Form.Item
          label={
            <IntlMessage id="admin.userManagement.user.create.firstNameEn" />
          }
          name="first_name_en"
          // rules={
          //   !isCreate
          //     ? [
          //         validation.required(
          //           t(
          //             'admin.userManagement.user.create.firstNameEnRequired'
          //           )
          //         ),
          //       ]
          //     : undefined
          // }
        >
          <Input
            placeholder={
              t(
                'admin.userManagement.user.create.firstNameEnPlaceholder'
              ) as string
            }
          />
        </Form.Item>
      </Col>
      <Col {...getColLayout(12)}>
        <Form.Item
          label={
            <IntlMessage id="admin.userManagement.user.create.lastNameEn" />
          }
          name="last_name_en"
          // rules={
          //   !isCreate
          //     ? [
          //         validation.required(
          //           t(
          //             'admin.userManagement.user.create.lastNameEnRequired'
          //           )
          //         ),
          //       ]
          //     : undefined
          // }
        >
          <Input
            placeholder={
              t(
                'admin.userManagement.user.create.lastNameEnPlaceholder'
              ) as string
            }
          />
        </Form.Item>
      </Col>
      <Col {...getColLayout(12)}>
        <Form.Item
          label={
            <IntlMessage id="admin.userManagement.user.create.email" />
          }
          name="email"
          rules={[
            validation.required(
              t(
                'admin.userManagement.user.create.emailRequired'
              )
            ),
          ]}
        >
          <Input
            placeholder={
              t(
                'admin.userManagement.user.create.emailPlaceholder'
              ) as string
            }
          />
        </Form.Item>
      </Col>
      <Col {...getColLayout(12)}>
        <Form.Item
          label={
            <IntlMessage id="admin.userManagement.user.create.tel" />
          }
          name="phone_number"
          // rules={
          //   !isCreate
          //     ? [
          //         validation.required(
          //           t(
          //             'admin.userManagement.user.create.telRequired'
          //           )
          //         ),
          //       ]
          //     : undefined
          // }
          className={css`
            width: 100%;

            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          `}
        >
          <Input
            addonBefore={
              <Form.Item
                name="phone_prefix"
                noStyle
                // rules={
                //   !isCreate
                //     ? [
                //         validation.required(
                //           'Please select phone prefix'
                //         ),
                //       ]
                //     : undefined
                // }
              >
                <SelectPhonePrefix
                  style={{ width: 100 }}
                />
              </Form.Item>
            }
            type="number"
            className="w-100"
            placeholder={
              t(
                'admin.userManagement.user.create.telPlaceholder'
              ) as string
            }
          />
        </Form.Item>
      </Col>
      <Col {...getColLayout(12)}>
        <Form.Item
          label={
            <IntlMessage id="admin.userManagement.user.create.employeeClassification" />
          }
          name="employee_classification"
          rules={[
            validation.required(
              t(
                'admin.userManagement.user.create.employeeClassificationRequired'
              )
            ),
          ]}
        >
          <Select
            placeholder={
              t(
                'admin.userManagement.user.create.employeeClassificationPlaceholder'
              ) as string
            }
            options={[
              {
                label: (
                  <IntlMessage id="admin.userManagement.user.create.internal" />
                ),
                value: 'internal',
              },
              {
                label: (
                  <IntlMessage id="admin.userManagement.user.create.external" />
                ),
                value: 'external',
              },
            ]}
          />
        </Form.Item>
      </Col>
      {showStatus ? (
        <Col {...getColLayout(12)}>
          <Form.Item
            label={
              <IntlMessage id="admin.userManagement.user.create.status" />
            }
            name="status"
            // rules={[
            //   validation.required(
            //     t(
            //       'admin.userManagement.user.create.statusRequired'
            //     )
            //   ),
            // ]}
          >
            <Select
              options={[
                {
                  label: (
                    <IntlMessage id="admin.userManagement.user.create.status.active" />
                  ),
                  value: 'active',
                },
                {
                  label: (
                    <IntlMessage id="admin.userManagement.user.create.status.inactive" />
                  ),
                  value: 'inactive',
                },
              ]}
            />
          </Form.Item>
        </Col>
      ) : null}

      <Col {...getColLayout(12)}>
        <FallbackError isError={jobTitle?.isError}>
          <Form.Item
            label={
              <IntlMessage id="admin.userManagement.user.create.jobTitle" />
            }
            name="jobId"
            // rules={
            //   !isCreate
            //     ? [
            //         validation.required(
            //           t(
            //             'admin.userManagement.user.create.jobTitleRequired'
            //           )
            //         ),
            //       ]
            //     : undefined
            // }
          >
            <Select
              showSearch
              placeholder={
                t(
                  'admin.userManagement.user.create.jobTitlePlaceholder'
                ) as string
              }
              onSearch={onSearch}
              options={jobTitleOptions ?? []}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </FallbackError>
      </Col>

      <Col {...getColLayout(12)}>
        <Form.Item
          label={
            <IntlMessage id="admin.userManagement.user.create.startDateUse" />
          }
          name="access_start_date"
          // rules={
          //   !isCreate
          //     ? [
          //         validation.required(
          //           t(
          //             'admin.userManagement.user.create.startDateUseRequired'
          //           )
          //         ),
          //       ]
          //     : undefined
          // }
        >
          <DatePicker
            className={css`
              width: 100%;
            `}
            disabledDate={(current) =>
              current.isBefore(
                dayjs().startOf('day').subtract(0, 'day')
              )
            }
          />
        </Form.Item>
      </Col>
      <Col {...getColLayout(12)}>
        <Flex flexDirection="column">
          <Form.Item
            name="is_access_end_date"
            valuePropName="checked"
            label={
              <IntlMessage id="admin.userManagement.user.create.endDateUse" />
            }
            className="mb-2"
          >
            <Switch
              checkedChildren={
                <IntlMessage id="admin.userManagement.user.create.endDateUse.on" />
              }
              unCheckedChildren={
                <IntlMessage id="admin.userManagement.user.create.endDateUse.off" />
              }
            />
          </Form.Item>
          <Form.Item
            shouldUpdate={(prevValues, curValues) =>
              prevValues.is_access_end_date !==
              curValues.is_access_end_date
            }
            noStyle
          >
            {({ getFieldValue }) => {
              const isAccessEndDate = getFieldValue(
                'is_access_end_date'
              );

              return (
                <Form.Item
                  name="access_end_date"
                  // rules={[
                  //   {
                  //     required: isAccessEndDate,
                  //     message: t(
                  //       'admin.userManagement.user.create.endDateUseRequired'
                  //     ),
                  //   },
                  // ]}
                >
                  <DatePicker
                    className="w-100"
                    disabled={!isAccessEndDate}
                    disabledDate={(current) =>
                      current.isBefore(
                        dayjs()
                          .startOf('day')
                          .subtract(-1, 'day')
                      )
                    }
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
        </Flex>
      </Col>

      <Col {...getColLayout(12)}>
        <Form.Item
          label={
            <IntlMessage id="admin.userManagement.user.create.agencies" />
          }
          name="agencies_id"
          // rules={
          //   !isCreate
          //     ? [
          //         validation.required(
          //           t(
          //             'admin.userManagement.user.create.agenciesRequired'
          //           )
          //         ),
          //       ]
          //     : undefined
          // }
        >
          <Select
            options={agencies?.data?.data?.map(
              (item) => ({
                label: item.name,
                value: item.groupId,
              })
            )}
            showSearch={false}
            mode="multiple"
            placeholder={
              t(
                'admin.userManagement.user.create.agenciesPlaceholder'
              ) as string
            }
            loading={agencies.isLoading}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
