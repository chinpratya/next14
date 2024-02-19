import {
  FilterOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Form,
  FormInstance,
  Input,
  Select,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import validation from '@/utils/validation';

import { Option } from '../../../indices';
import { useListIndice } from '../../../indices/api/list-indice';
import { filter } from '../../shared';
import { AliasIndice, FilterDetail } from '../../types';

import { FilterTagItem } from './filter-tag-item';

type RuleCustomizeFormStep1Props = {
  isEditor: boolean;
  form: FormInstance;
  listField: AliasIndice[];
  loadingField?: boolean;
  filters?: Record<string, unknown>;
  openFilterModal: () => void;
  onChangeIndice: (indiceId: string) => void;
  onRemoveFilter: (filters: FilterDetail) => void;
};

export const RuleCustomizeFormStep1 = ({
  isEditor,
  form,
  listField,
  loadingField,
  filters,
  openFilterModal,
  onChangeIndice,
  onRemoveFilter,
}: RuleCustomizeFormStep1Props) => {
  const { t } = useTranslation();
  const {
    data: listIndice,
    isLoading: isLoadingIndice,
    isError: indiceError,
  } = useListIndice({
    page: 1,
    pageSize: 100,
    responseType: 'lists',
  });

  const [filterForm, setFilterForm] = useState<
    FilterDetail[]
  >([]);

  const indiceValue = Form.useWatch(
    ['components', 0, 'indices'],
    form
  );

  useEffect(() => {
    if (filters) {
      const result = filter.getFilterForm(filters);
      if (result) setFilterForm(result);
    }
  }, [filters]);

  return (
    <FallbackError isError={indiceError}>
      <div className="pl-3">
        <Typography.Title level={3} className="mb-4">
          <IntlMessage id="siem.detectionRuleCreateAndEditRule.stepOne" />
        </Typography.Title>

        <Form.Item
          label={
            <IntlMessage id="siem.detectionRuleCreateAndEditRule.nameRule" />
          }
          name="name"
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
            validation.trim(),
          ]}
        >
          <Input
            readOnly={!isEditor}
            placeholder={
              t('logManagement.placeholder', {
                field: t(
                  'siem.detectionRuleCreateAndEditRule.nameRule'
                ),
              }) as string
            }
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <IntlMessage id="siem.detectionRuleCreateAndEditRule.description" />
          }
        >
          <Input.TextArea
            rows={5}
            readOnly={!isEditor}
            placeholder={
              t('logManagement.placeholder', {
                field: t(
                  'siem.detectionRuleCreateAndEditRule.description'
                ),
              }) as string
            }
          />
        </Form.Item>

        <Form.Item
          name="tags"
          label={
            <Flex align="center">
              <IntlMessage id="siem.detectionRuleCreateAndEditRule.tags" />
              <Tooltip
                title={
                  <IntlMessage id="siem.detectionRuleCreateAndEditRule.tagsTooltip" />
                }
              >
                <QuestionCircleOutlined
                  className={css`
                    margin-left: 5px;
                    font-size: 12px;
                  `}
                />
              </Tooltip>
            </Flex>
          }
        >
          <Select
            mode="tags"
            options={[]}
            disabled={!isEditor}
            placeholder={
              t('logManagement.placeholder', {
                field: t(
                  'siem.detectionRuleCreateAndEditRule.tags'
                ),
              }) as string
            }
          />
        </Form.Item>

        <Form.Item
          label={
            <IntlMessage id="siem.detectionRuleCreateAndEditRule.indices" />
          }
          name={['components', 0, 'indices']}
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
          ]}
        >
          <Select
            loading={isLoadingIndice}
            options={(listIndice?.data as Option[]) ?? []}
            disabled={!isEditor}
            onChange={(value) => onChangeIndice(value)}
            placeholder={
              t('logManagement.selectPlaceholder', {
                field: t(
                  'siem.detectionRuleCreateAndEditRule.indices'
                ),
              }) as string
            }
          />
        </Form.Item>

        <div
          className={css`
            position: relative;
          `}
        >
          <Form.Item
            className="mb-0"
            label={
              <Flex align="center">
                <IntlMessage id="siem.detectionRuleCreateAndEditRule.query" />
                <Tooltip
                  title={
                    <IntlMessage id="siem.detectionRuleCreateAndEditRule.queryTooltip" />
                  }
                >
                  <QuestionCircleOutlined
                    className={css`
                      margin-left: 5px;
                      font-size: 12px;
                    `}
                  />
                </Tooltip>
              </Flex>
            }
            name={['components', 0, 'query']}
          >
            <Input.TextArea
              rows={5}
              readOnly={!isEditor}
              className={css`
                white-space: pre-wrap;
              `}
              placeholder={
                t('logManagement.placeholder', {
                  field: t(
                    'siem.detectionRuleCreateAndEditRule.query'
                  ),
                }) as string
              }
            />
          </Form.Item>

          <FilterOutlined
            className={css`
              position: absolute;
              top: 4px;
              right: 0;
              opacity: ${!indiceValue ? 0.3 : 1};
              pointer-events: ${!indiceValue
                ? 'none'
                : 'unset'};
            `}
            onClick={openFilterModal}
          />
        </div>

        <Flex
          gap="sm"
          className="mb-4 pt-1"
          direction="row"
          align="start"
        >
          <Typography.Text className="flex-shrink-0">
            Filter :
          </Typography.Text>
          <Flex wrap="wrap" rowGap={8}>
            {filterForm.length > 0 ? (
              filterForm.map((item, index) => (
                <FilterTagItem
                  {...item}
                  key={index}
                  onClick={openFilterModal}
                  onDelete={() => onRemoveFilter(item)}
                />
              ))
            ) : (
              <Tag>-</Tag>
            )}
          </Flex>
        </Flex>

        <Form.Item
          label={
            <IntlMessage id="siem.detectionRuleCreateAndEditRule.groupBy" />
          }
          name={['components', 0, 'group_by']}
        >
          <Select
            mode="tags"
            options={listField ?? []}
            disabled={!isEditor || !indiceValue}
            loading={loadingField}
            placeholder={
              t('logManagement.selectPlaceholder', {
                field: t(
                  'siem.detectionRuleCreateAndEditRule.groupBy'
                ),
              }) as string
            }
          />
        </Form.Item>
      </div>
    </FallbackError>
  );
};
