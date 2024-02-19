import { Select, Tree, SelectProps } from 'antd';
import type { DataNode } from 'antd/es/tree';
import React from 'react';

export type SelectDropdownTreeProps = {
  treeData: DataNode[];
  onChange?: (key: React.Key[]) => void;
  value?: React.Key[];
};

export const SelectDropdownTree = ({
  treeData,
  onChange,
  value,
}: SelectDropdownTreeProps) => {
  const onCheck = (checkedKeys: React.Key[]) => {
    onChange?.(checkedKeys);
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
    // console.log(`selected`, value);
    onChange?.(value);
  };

  return (
    <>
      <Select
        mode={'tags'}
        value={value}
        options={options}
        onChange={handleChange}
        dropdownRender={() => (
          <>
            <Tree
              multiple
              // checkStrictly
              autoExpandParent
              selectable
              className="my-3"
              checkable
              treeData={treeData}
              onCheck={(e) => onCheck(e as React.Key[])}
            />
          </>
        )}
      />
    </>
  );
};
