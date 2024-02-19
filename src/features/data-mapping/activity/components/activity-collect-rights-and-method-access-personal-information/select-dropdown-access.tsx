import { css } from '@emotion/css';
import { Select, Tree, SelectProps } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React, { useState, useEffect } from 'react';

import { useSearch } from '@/hooks';

import { useGetActivityCollectMeta } from '../../api/get-activity-collect-meta';

export type SelectDropdownAccessProps = {
  activityId: string;
  onChange?: (key: Record<string, unknown>[]) => void;
  value?: Record<string, unknown>[];
};

export const SelectDropdownAccess = ({
  activityId,
  onChange,
  value,
}: SelectDropdownAccessProps) => {
  const { debouncedSearch, search, onSearch } =
    useSearch();

  const [selectedKeys, setSelectedKeys] = useState<
    React.Key[]
  >([]);
  const [dataSelected, setDataSelected] = useState<
    Record<string, unknown>[]
  >([]);

  const { data } = useGetActivityCollectMeta({
    activityId,
    search: debouncedSearch,
  });

  const treeData =
    data?.map((v) => {
      return {
        title: `${v?.purposeName} (${v?.basisName})`,
        key: v?.purposeID,
        children:
          v?.dataCategory?.map((child) => {
            return {
              title: child?.dataCategoryName,
              key: child?.dataCategoryID,
              children:
                child?.dataElements?.map((e) => {
                  return {
                    title: e?.dataElementName,
                    key: e?.dataElementID,
                  };
                }) || [],
            };
          }) || [],
      };
    }) || [];

  useEffect(() => {
    if (
      value &&
      selectedKeys.length == 0 &&
      dataSelected.length == 0
    ) {
      const convertedArray: string[] = [];

      value.forEach((item) => {
        convertedArray.push(item.dataElementID as string);
      });

      setSelectedKeys(convertedArray);
      setDataSelected(value);
    }
  }, [value, selectedKeys, dataSelected]);

  const getParentKey = (
    key: React.Key,
    tree: DataNode[]
  ): string => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (
          node.children.some((item) => item.key === key)
        ) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey as string;
  };

  const onCheck: TreeProps['onCheck'] = (
    checkedKeys,
    info
  ) => {
    const parentKey = getParentKey(
      info.node.key as React.Key,
      treeData as DataNode[]
    );

    const rootKey = getParentKey(
      parentKey as React.Key,
      treeData as DataNode[]
    );
    if (info.checked) {
      if (rootKey && parentKey) {
        setDataSelected([
          ...dataSelected,
          {
            purposeID: rootKey,
            dataCategoryID: parentKey,
            dataElementID: info.node.key,
          },
        ]);
        onChange?.([
          ...dataSelected,
          {
            purposeID: rootKey,
            dataCategoryID: parentKey,
            dataElementID: info.node.key,
          },
        ]);
      } else if (!rootKey && parentKey) {
        const element =
          info.checkedNodes?.filter((child) => {
            if (!child.children) {
              return child.key;
            }
          }) ?? [];
        const dataElement =
          element.map((child) => child.key) ?? [];
        const keyselected = dataSelected.map(
          (key) => key.dataElementID
        );
        const newSelectKey = dataElement.filter(
          (v) => !keyselected.includes(v)
        );

        const value = newSelectKey.map((v) => {
          return {
            purposeID: parentKey,
            dataCategoryID: info.node.key,
            dataElementID: v,
          };
        });
        setDataSelected([...dataSelected, ...value]);
        onChange?.([...dataSelected, ...value]);
      } else {
        const dataCategory = info.node.children
          ? info.node.children.map((v) => {
              return {
                purposeID: info.node.key,
                dataCategoryID: v,
                dataElementID: v.children
                  ? v.children
                  : [],
              };
            })
          : [];

        const value: Record<string, unknown>[] = [];
        dataCategory.map((v) => {
          v.dataElementID.forEach((e) => {
            value.push({
              purposeID: v.purposeID,
              dataCategoryID: v.dataCategoryID.key,
              dataElementID: e.key,
            });
          });
        });
        const keyselected = dataSelected.map(
          (key) => key.purposeID
        );
        const newSelectKey = value.filter(
          (v) => !keyselected.includes(v.purposeID)
        );

        setDataSelected([
          ...dataSelected,
          ...newSelectKey,
        ]);
        onChange?.([...dataSelected, ...newSelectKey]);
      }
    } else {
      if (rootKey && parentKey) {
        const newKey = dataSelected.filter(
          (v) => v.dataElementID !== info.node.key
        );

        setDataSelected(newKey);
        onChange?.(newKey);
      } else if (!rootKey && parentKey) {
        const newKey = dataSelected.filter(
          (v) => v.dataCategoryID !== info.node.key
        );

        setDataSelected(newKey);
        onChange?.(newKey);
      } else {
        const newKey = dataSelected.filter(
          (v) => v.purposeID !== info.node.key
        );

        setDataSelected(newKey);
        onChange?.(newKey);
      }
    }

    setSelectedKeys(checkedKeys as React.Key[]);
  };

  const options: SelectProps['options'] = [];
  const childrenToOptions = (data: DataNode) => {
    options.push({
      label: data.title as string,
      value: data.key,
    });
    if (data.children && data.children?.length > 0) {
      data.children.map((child) =>
        childrenToOptions(child)
      );
    }
  };
  treeData.map((tree) => {
    options.push({
      label: tree.title as string,
      value: tree.key,
    });
    if (tree.children && tree.children?.length > 0) {
      tree.children.map((child) =>
        childrenToOptions(child)
      );
    }
    return;
  });

  const handleChange = (value: React.Key[]) => {
    setSelectedKeys(value);
  };

  const onDeselect = (value: React.Key) => {
    const newData = dataSelected.filter(
      (data) => value !== data.dataElementID
    );
    onChange?.(newData);
  };

  return (
    <>
      <Select
        mode="tags"
        showSearch
        searchValue={search}
        autoClearSearchValue
        onSearch={onSearch}
        value={selectedKeys}
        options={options}
        onChange={handleChange}
        onDeselect={onDeselect}
        dropdownRender={() => (
          <>
            <Tree
              defaultExpandAll
              multiple
              selectable
              className={css`
                width: 100%;
                max-height: 400px;
                overflow: auto;
              `}
              checkable
              treeData={treeData}
              onCheck={onCheck}
              autoExpandParent={true}
              checkedKeys={selectedKeys as string[]}
            />
          </>
        )}
      />
    </>
  );
};
