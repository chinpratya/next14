import { css } from '@emotion/css';
import { useToggle } from '@mantine/hooks';
import { Card, Divider, Empty } from 'antd';
import { useEffect } from 'react';

import { SideSettingLayout } from '@/layouts';
import { Segmented } from '@components/segmented';

import { useAaWebformStore } from '../../../stores/use-aa-webform-store';
import { WebformBuilder } from '../../webform-builder';

import { ContentDesign } from './content-design';
import { ContentQuestion } from './content-question';

const SegmentedQuestionOption = {
  label: 'คำถาม',
  value: 'question',
};

const SegmentedDesignOption = {
  label: 'ออกแบบ',
  value: 'design',
};

export const WebformCustomizingMainContent = () => {
  const [collapsed, toggleCollapsed] = useToggle();
  const { selectedWebformBuilder } = useAaWebformStore();
  const [toggle, setToggle] = useToggle([
    'question',
    'design',
  ]);

  useEffect(() => {
    if (
      selectedWebformBuilder?.widget !== 'statement' &&
      toggle === 'design'
    ) {
      setToggle('question');
    }
  }, [selectedWebformBuilder, toggle, setToggle]);

  return (
    <SideSettingLayout
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
      contentRender={() => (
        <Card
          className={css`
            margin-bottom: 0;

            .ant-card-body {
              padding: 48px 48px 24px 96px;
              min-height: calc(100vh - 230px);
            }
          `}
        >
          {selectedWebformBuilder ? (
            <WebformBuilder />
          ) : (
            <Empty
              className="mb-4"
              style={{ marginLeft: -74 }}
            />
          )}
        </Card>
      )}
      sideWidth={450}
      hideSide={!selectedWebformBuilder}
      sideRender={() => (
        <div className="p-4">
          <Segmented
            value={toggle}
            defaultValue="question"
            options={
              selectedWebformBuilder?.widget ===
              'statement'
                ? [
                    SegmentedQuestionOption,
                    SegmentedDesignOption,
                  ]
                : [
                    SegmentedQuestionOption,
                    {
                      ...SegmentedDesignOption,
                      disabled: true,
                    },
                  ]
            }
            onChange={() => {
              setToggle();
            }}
          />
          <Divider />
          {toggle === 'question' ? (
            <ContentQuestion />
          ) : (
            <ContentDesign />
          )}
        </div>
      )}
    />
  );
};
