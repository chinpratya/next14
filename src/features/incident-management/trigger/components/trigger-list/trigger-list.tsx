import {
  Button,
  Card,
  Select,
  Skeleton,
  Space,
  // Tag,
  // Typography,
} from 'antd';
import { usePagination } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { FallbackError } from '@utilComponents/fallback-error';
import { useGetRuleList } from '@/features/incident-management/trigger/api/get-rule-list';
import { useGetListCategory } from '@/features/incident-management/trigger/api/get-list-category';
import { TriggerCardList } from '@/features/incident-management/trigger/components/trigger-card-list';
import { useEffect, useState } from 'react';
import { css } from '@emotion/css';

export const TriggerList = () => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  // const { showNotification } = useNotifications();
  const [name, setName] = useState<string>('');
  const [subCate, setSubCate] = useState<any>('');
  const [statusFilter, setStatusFilter] =
    useState<boolean>(false);
  const [subCateValue, setSubCateValue] =
    useState<any>('');
  const [filterData, setFilterData] = useState({
    name: '',
    categoryIds: '',
    subCategoryIds: '',
  });
  const handleApply = () => {
    setStatusFilter(true);
  };

  const handleReset = () => {
    setStatusFilter(false);
    setSubCateValue('');
    setSubCate('');
    setName('');
  };
  const { data, isLoading } = useGetRuleList({
    page,
    pageSize,
    name: filterData.name || '',
    categoryIds: filterData.categoryIds || '',
    subCategoryIds: filterData.subCategoryIds || '',
  });
  const { data: categoryList } = useGetListCategory({});

  const handleCategoryChange = (data: string[]) => {
    setSubCate(data.join(','));
  };
  const handleSubCategoryChange = (data: string[]) => {
    setSubCateValue(data.join(','));
  };
  const incidentCategory = () => {
    const dataOptions = categoryList?.data.map(
      (data: {
        objectUuid: string;
        displayName: string;
      }) => {
        return {
          value: data.objectUuid,
          label: data.displayName,
        };
      }
    );

    return dataOptions;
  };
  const subCategoryOptions = (subCates: string) => {
    // const resultString = subCates
    //   .map((item) => `${item}`)
    //   .join(',');
    const filteredData = categoryList?.data.filter(
      (item: any) => subCates.includes(item.objectUuid)
    );

    const subCategory = filteredData?.map((e: any) => {
      if (e?.subCategory) {
        return e?.subCategory.map((subData: any) => {
          return {
            value: subData.objectUuid,
            label: subData.displayName,
          };
        });
      } else return [];
    });
    const test = []?.concat(...(subCategory || []));
    // console.log(test);
    return test;
  };

  useEffect(() => {
    if (statusFilter === true) {
      setFilterData({
        name: name || '',
        categoryIds: subCate || '',
        subCategoryIds: subCateValue || '',
      });
    } else {
      setSubCateValue('');
      setSubCate('');
      setName('');
      setFilterData({
        name: '',
        categoryIds: '',
        subCategoryIds: '',
      });
    }
  }, [statusFilter]);
  return (
    <FallbackError isError={false}>
      <Card
        className={css`
          .ant-card-extra {
            margin: 0px;
            width: 100%;
          }
        `}
        extra={
          <Flex justifyContent={'between'}>
            <div>
              <InputSearch
                className="mr-1"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Search Rule Name"
                style={{
                  width: '20%',
                }}
                value={name}
              />

              <Select
                mode="multiple"
                allowClear
                className="mr-1"
                style={{
                  minWidth: '220px',
                  width: '320px',
                  maxWidth: '400px',
                  height: '30px',
                  maxHeight: '40px',
                }}
                placeholder="Incident Category"
                onChange={handleCategoryChange}
                options={incidentCategory()}
                value={subCate
                  ?.split(',')
                  .filter((item: string) => item !== '')}
              />

              <Select
                mode="tags"
                allowClear
                className="mr-1"
                style={{
                  minWidth: '220px',
                  width: '320px',
                  maxWidth: '400px',
                  height: '30px',
                  maxHeight: '40px',
                }}
                placeholder="Incident Sub-Category"
                disabled={subCate.length === 0}
                onChange={handleSubCategoryChange}
                options={subCategoryOptions(subCate)}
                value={subCateValue
                  ?.split(',')
                  .filter((item: string) => item !== '')}
              />
            </div>

            <div>
              <Button
                type="primary"
                onClick={handleApply}
              >
                Apply
              </Button>

              <Button
                onClick={handleReset}
                danger
                style={{
                  marginLeft: '10px',
                }}
              >
                Reset
              </Button>
            </div>
          </Flex>
        }
      >
        {isLoading ? (
          <>
            <Skeleton />
          </>
        ) : (
          <>
            <TriggerCardList data={data?.data} />
          </>
        )}

        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
    </FallbackError>
  );
};
