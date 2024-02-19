import { css } from '@emotion/css';
import { useMediaQuery } from '@mantine/hooks';
import { Cascader } from 'antd';
import _ from 'lodash';
import React, { useEffect } from 'react';

import { useConsentBuilderStore } from '@/stores/consent-builder';

export const TranslateSelectForm = () => {
  const {
    defaultFormItems,
    selectedTranslateContentId,
    onChangeSelectedTranslateContent,
  } = useConsentBuilderStore();

  const isMobile = useMediaQuery('(max-width: 990px)');

  useEffect(() => {
    if (!selectedTranslateContentId) {
      const initialValue: string[] = [
        _.get(defaultFormItems, '[0].id', ''),
        _.get(defaultFormItems, '[0].sections[0].id', ''),
        _.get(
          defaultFormItems,
          '[0].sections[0].components[0].name',
          ''
        ),
      ];

      if (
        initialValue?.filter((item) => item !== '')
          .length === 3
      ) {
        onChangeSelectedTranslateContent?.(initialValue);
      }
    }
  }, [
    defaultFormItems,
    onChangeSelectedTranslateContent,
    selectedTranslateContentId,
  ]);

  const getComponentChildrenLabel = (
    component: Record<string, unknown>
  ) => {
    if (component?.type === 'label') {
      return 'Label';
    }
    return (
      component.label ?? component.name ?? component.id
    );
  };

  const TRANSLATED_TYPES = [
    'label',
    'purpose',
    'field',
    'identifier',
  ];

  const getSectionLabel = (
    section: Record<string, unknown>
  ) => {
    const name = section?.name as string;
    if (_.isEmpty(name?.replaceAll(' ', '').trim())) {
      return 'ไม่มีชื่อ';
    }
    return name;
  };

  const options = defaultFormItems?.map((form) => {
    const children = form?.sections
      ?.filter((section) =>
        section.components?.some((component) =>
          TRANSLATED_TYPES.includes(
            component?.type as string
          )
        )
      )
      .map((section) => ({
        value: section.id,
        label: getSectionLabel(section),
        children: section?.components
          ?.filter((component) =>
            TRANSLATED_TYPES.includes(
              component?.type as string
            )
          )
          ?.map((component) => ({
            value:
              component.purposeID ??
              component.name ??
              component.id,
            label: getComponentChildrenLabel(component),
          })),
      }));

    return {
      value: form.id,
      label: form?.name
        ? form.name
        : 'แบบฟอร์มขอความยินยอม',
      children,
    };
  });

  const dropdownRender = (menu: React.ReactNode) => (
    <div
      className={css`
        .ant-cascader-menu
          > li.ant-cascader-menu-item
          > .ant-cascader-menu-item-content {
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}
    >
      {menu}
    </div>
  );

  return (
    <Cascader
      style={{
        maxWidth: 450,
      }}
      value={selectedTranslateContentId as string[]}
      onChange={(value) => {
        onChangeSelectedTranslateContent(
          value as string[]
        );
      }}
      className={isMobile ? 'w-100' : 'w-50'}
      placeholder="กรุณาเลือก"
      options={options}
      dropdownRender={dropdownRender}
    />
  );
};
