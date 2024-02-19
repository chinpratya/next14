import _ from 'lodash';

import { WebformBuilderItem } from '../../share';

export const calculateAssessmentScore = (
  webformBuilders: Array<WebformBuilderItem>
): Array<WebformBuilderItem> => {
  try {
    const newWebformBuilders = webformBuilders.map(
      (webformBuilder): WebformBuilderItem => {
        if (!webformBuilder.children) {
          return webformBuilder;
        }

        const children = [] as WebformBuilderItem[];
        const originalChildren = [
          ...webformBuilder.children,
        ];

        originalChildren?.reverse()?.forEach((child) => {
          // 6.2 && // 6.3
          if (
            child.key ===
              '7cbd6e18-2654-4cd1-9106-12512f0d50c5' ||
            child.key ===
              '01c798b4-b1d3-41a1-b2f8-80c715ad4f8b'
          ) {
            const newChild = {
              ...child,
              score: {
                result: 0,
              },
            };
            const root = _.find(
              originalChildren,
              (item) =>
                item.key ===
                'd7f1c8ec-d1ee-47a1-9d4d-3a9f651008ad'
            );

            if (!root?.value || !child.value) {
              children.push(newChild);
              return;
            }

            const rootValue = _.get(
              root,
              'value.textValues.[0]',
              0
            );
            const childValue = _.get(
              child,
              'value.textValues.[0]',
              0
            );
            const percentage =
              (parseInt(String(childValue)) /
                parseInt(String(rootValue))) *
              100;

            if (
              percentage >= 5 &&
              child.key ===
                '7cbd6e18-2654-4cd1-9106-12512f0d50c5'
            ) {
              newChild['score']['result'] = 2;
            }
            if (
              percentage >= 5 &&
              child.key ===
                '01c798b4-b1d3-41a1-b2f8-80c715ad4f8b'
            ) {
              newChild['score']['result'] = 1;
            }

            children.push(newChild);
            return;
          }

          if (child.scores && child.value) {
            const newChild = {
              ...child,
              score: {
                result: 0,
              },
            };

            if (child.widget === 'check-box') {
              const checkboxScores = _.get(
                child,
                'scores',
                []
              )?.map((score) => score?.value) as number[];
              const checkedValues = _.get(
                child,
                'value.checked',
                []
              ) as string[];

              checkedValues?.forEach((checkedValue) => {
                const optionIndex = _.findIndex(
                  child.options,
                  (option) =>
                    option?.title === checkedValue
                );
                if (optionIndex !== -1) {
                  newChild['score']['result'] +=
                    checkboxScores[optionIndex] ?? 0;
                }
              });
              children.push(newChild);
              return;
            }

            if (child.widget === 'radio-box') {
              const valueSelectedIndex =
                child.options?.findIndex(
                  (option) =>
                    option.title ===
                      child.value?.selected ?? ''
                ) ?? (-1 as number);
              if (valueSelectedIndex === -1) {
                return;
              }
              const score =
                child.scores[valueSelectedIndex];
              if (score?.dependOn) {
                const dependItem = children.find(
                  (item) => item.key === score?.dependOn
                );
                newChild['score']['result'] = dependItem
                  ?.score?.result as number;
                children.push(newChild);
                return;
              }
              newChild['score']['result'] =
                (score?.value as number) ?? 0;
              children.push(newChild);
              return;
            }
            if (child.widget === 'short-text') {
              const textValues = [
                ...((child.value
                  ?.textValues as Array<string>) ?? []),
              ];
              let scoreResult = 0 as number;
              textValues.forEach(
                (textValue, valueIndex) => {
                  const score = child.scores?.find(
                    (item, index) => index === valueIndex
                  );
                  if (score?.value) {
                    scoreResult += score?.value as number;
                  }
                }
              );
              newChild['score']['result'] = scoreResult;
              children.push(newChild);
              return;
            }
            if (child.widget === 'matrix') {
              let scoreResult = 0 as number;
              if (child?.scores) {
                child?.columns?.forEach((column) => {
                  const score = child.scores?.find(
                    (item) => item?.key === column?.key
                  );
                  child?.rows?.forEach((row) => {
                    const value = _.get(
                      child,
                      `value.selected.${row?.key}%${column?.key}`
                    );
                    const valueIndex = _.findIndex(
                      column?.children,
                      (item) => item?.key === value
                    );
                    if (valueIndex !== -1) {
                      const result = _.get(
                        score,
                        `children.[${valueIndex}].value`,
                        0
                      ) as number;
                      scoreResult += result;
                    }
                  });
                });
              }
              newChild['score']['result'] = scoreResult;
              children.push(newChild);
              return;
            }

            children.push(child);
            return;
          } else {
            children.push(child);
            return;
          }
        });

        return {
          ...webformBuilder,
          children: children?.reverse(),
        };
      }
    );

    return newWebformBuilders;
  } catch (error) {
    console.error(
      'this error for calculate assessment score.',
      error
    );
    return webformBuilders;
  }
};
