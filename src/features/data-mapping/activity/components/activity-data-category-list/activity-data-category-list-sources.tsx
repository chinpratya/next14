import { Checkbox, Select } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Loading } from '@components/loading';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetActivityMeta } from '../../api/get-activity-meta';
import { useGetDataCategoryOfActivity } from '../../api/get-data-category-of-activity';
import { useUpdateDataCategoryOfActivity } from '../../api/update-data-category-of-activity';

export type ActivityDataCategoryListSourcesProps = {
  activityId: string;
  dataCategoryId: string;
};

export type ActivityDataCategoryListSourcesCheckboxProps =
  {
    isLoading: boolean;
    isError: boolean;
    onSubmit: (sourceID: string[]) => void;
    sourceID: string[];
  };

export const ActivityDataCategoryListSourcesCheckbox = ({
  isLoading,
  sourceID,
  onSubmit,
  isError,
}: ActivityDataCategoryListSourcesCheckboxProps) => {
  const meta = useGetActivityMeta({});

  const categorySources =
    meta?.data?.categorySource ?? [];

  const options = categorySources.map((source) => ({
    label: source.name,
    value: source.ObjectUUID,
  }));

  if (isLoading || meta.isLoading) {
    return (
      <div className="p-2">
        <Loading />
      </div>
    );
  }

  const handleChange = (
    checkedValue: CheckboxValueType[]
  ) => {
    onSubmit(checkedValue as string[]);
  };

  return (
    <FallbackError isError={isError || meta.isError}>
      <div className="p-2">
        <Checkbox.Group
          value={sourceID}
          options={options}
          onChange={handleChange}
        />
      </div>
    </FallbackError>
  );
};

const dropdownRender = (
  props: ActivityDataCategoryListSourcesCheckboxProps
) => (
  <ActivityDataCategoryListSourcesCheckbox {...props} />
);

export const ActivityDataCategoryListSources = (
  props: ActivityDataCategoryListSourcesProps
) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string[]>([]);
  const meta = useGetActivityMeta({});
  const dataCategoryOfActivity =
    useGetDataCategoryOfActivity({
      activityId: props.activityId,
      dataCategoryId: props.dataCategoryId,
    });

  const { activityId, dataCategoryId } = props;

  const { submit, isLoading } =
    useUpdateDataCategoryOfActivity({
      activityId,
      dataCategoryId,
    });

  useEffect(() => {
    if (
      value.length === 0 &&
      dataCategoryOfActivity.data
    ) {
      setValue(
        dataCategoryOfActivity.data.sourceID as string[]
      );
    }
  }, [value, dataCategoryOfActivity]);

  const deleteCategorySource = (e: string) => {
    const key = value.filter((value) => value !== e);
    setValue(key);
    submit(key);
  };

  return (
    <Select
      loading={
        meta.isLoading ||
        dataCategoryOfActivity.isLoading ||
        isLoading
      }
      disabled={
        isLoading || dataCategoryOfActivity.isLoading
      }
      mode="multiple"
      className="w-100"
      placeholder={
        t(
          'dataMapping.activity.dataCategory.sourceInformationPlaceholder'
        ) as string
      }
      dropdownRender={() =>
        dropdownRender({
          onSubmit: submit,
          sourceID:
            (dataCategoryOfActivity.data
              ?.sourceID as string[]) ?? [],
          isLoading: dataCategoryOfActivity.isLoading,
          isError: dataCategoryOfActivity.isError,
        })
      }
      value={dataCategoryOfActivity.data?.sourceID}
      onDeselect={deleteCategorySource}
      options={meta?.data?.categorySource.map(
        (source) => ({
          label: source.name,
          value: source.ObjectUUID,
        })
      )}
    />
  );
};
