import {
  Col,
  Divider,
  Form,
  FormInstance,
  Row,
  Timeline,
} from 'antd';
import { useEffect, useState } from 'react';

import { useToggle } from '@/hooks';
import { getColLayout } from '@/utils';

import { useGetAliasIndice } from '../../api/get-alias-indice';
import { useListField } from '../../api/list-field';
import { filter } from '../../shared';
import {
  AliasIndice,
  FilterDetail,
  RuleInfo,
} from '../../types';

import { FilterModal } from './filter-modal';
import { RuleCustomizeFormStep1 } from './rule-customize-form-step1';
import { RuleCustomizeFormStep2 } from './rule-customize-form-step2';
import { RuleCustomizeFormStep3 } from './rule-customize-form-step3';
import { RuleCustomizeFormStep4 } from './rule-customize-form-step4';

type RuleCustomizeFormProps = {
  form: FormInstance;
  data?: RuleInfo;
  filters?: Record<string, unknown>;
  onSubmit?: () => void;
  onChangeFilter: (
    filters: Record<string, unknown>
  ) => void;
};

export const RuleCustomizeForm = ({
  form,
  data,
  filters,
  onChangeFilter,
}: RuleCustomizeFormProps) => {
  const toggle = useToggle();
  const [field, setField] = useState<AliasIndice[]>([]);

  const isEditor =
    data?.type === 'STANDARD' ? false : true;

  const [indiceId, setIndiceId] = useState(
    data?.components[0].indices
  );

  const aliasIndice = useGetAliasIndice({
    indiceId: indiceId as string,
    enabled: !!indiceId && data?.type !== 'STANDARD',
  });

  const listField = useListField({
    indiceId: aliasIndice.data?.value as string,
    enable: !!aliasIndice.data?.value,
  });

  const onChangeIndice = (indiceId: string) => {
    setIndiceId(indiceId);
  };

  const equalsCheck = (a: string[], b: string[]) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const onRemoveFilter = (value: FilterDetail) => {
    if (!filters) return;

    const result: FilterDetail[] = [];

    const formValue = filter.getFilterForm(filters) ?? [];
    formValue.map((item) => {
      if (
        item.field === value.field &&
        item.condition === value.condition &&
        (item.value == value.value ||
          equalsCheck(
            item.value as string[],
            value.value as string[]
          ))
      ) {
      } else result.push(item);
    });

    onChangeFilter(
      filter.formatFilterPayload({ filters: result })
    );
  };

  useEffect(() => {
    if (listField.data) {
      setField(
        listField.data.map(({ label, value }) => ({
          label,
          value: label,
          type: value,
        }))
      );
    }
  }, [listField.data]);

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          ...data,
          tags: data?.tags ?? undefined,
          components: [
            {
              ...data?.components[0],
              group_by:
                data?.components[0]?.group_by ??
                undefined,
            },
          ],
        }}
        className="p-3"
      >
        <Row gutter={[16, 16]}>
          <Col className="pl-3" {...getColLayout(16)}>
            <Timeline>
              <Timeline.Item>
                <RuleCustomizeFormStep1
                  form={form}
                  isEditor={isEditor}
                  listField={field}
                  filters={filters}
                  loadingField={listField.isLoading}
                  openFilterModal={toggle.filter}
                  onChangeIndice={onChangeIndice}
                  onRemoveFilter={onRemoveFilter}
                />
                <Divider />
              </Timeline.Item>

              <Timeline.Item color="#FFC542">
                <RuleCustomizeFormStep2
                  data={data}
                  form={form}
                  field={field}
                  loadingField={listField.isLoading}
                  isEditor={isEditor}
                />
                <Divider />
              </Timeline.Item>

              <Timeline.Item color="#04D182">
                <RuleCustomizeFormStep3
                  data={data}
                  form={form}
                  isEditor={isEditor}
                />
                <Divider />
              </Timeline.Item>

              <Timeline.Item color="#FF6B72">
                <RuleCustomizeFormStep4
                  isEditor={isEditor}
                />
              </Timeline.Item>
            </Timeline>
          </Col>
        </Row>
      </Form>

      <FilterModal
        field={field}
        filters={filters}
        isEditor={isEditor}
        open={toggle.openFilter}
        onClose={toggle.filter}
        onChangeFilter={onChangeFilter}
      />
    </>
  );
};
