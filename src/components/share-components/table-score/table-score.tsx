import { css } from '@emotion/css';
import { Typography } from 'antd';
import { useState, useEffect } from 'react';

type rangeScoreType = {
  key: string;
  text: string;
  range: number[];
  color: string;
};

type targetType = {
  x: number;
  y: number;
  text: string;
  color: string;
};

export type TableScoreProps = {
  rangeScore: rangeScoreType[];
  target: targetType;
  xAxis?: number;
  yAxis?: number;
};

export const TableScore = ({
  rangeScore,
  target,
  xAxis = 6,
  yAxis = 6,
}: TableScoreProps) => {
  const [tgList, setTGList] = useState<string[]>([]);

  useEffect(() => {
    const colorIndex = target.x * target.y;
    const colors: string[] = [];
    colors[colorIndex] = `${target.color}`;

    setTGList(colors);
  }, [target]);

  const xArray = Array.from(
    { length: xAxis },
    (v, i) => i
  ).reverse();
  const yArray = Array.from(
    { length: yAxis },
    (v, i) => i
  ).reverse();

  const checkRangeScore = (score: number) => {
    const target =
      rangeScore.filter((item) =>
        item.range.includes(score)
      ) || {};
    return target[0];
  };

  return (
    <>
      <div
        className={css`
          width: 100%;
          height: 310px;
          display: grid;
          grid-template:
            'left-sidebar content right-sidebar' 2fr
            'footer footer footer' 1fr
            / 1fr 3fr 1fr;

          p {
            margin-bottom: 0.2rem;
          }

          .left-container {
            grid-area: left-sidebar;
            align-self: center;
            position: relative;
            top: -50px;
            left: 10px;
          }

          .score-table {
            grid-area: content;
            padding-left: 1rem;
            padding-right: 1rem;
            padding-bottom: 1rem;

            .wrapper-score-table {
              display: flex;

              .column {
                width: calc(
                  (100% - 101px) / ${target.x ?? 5}
                );
              }

              .column.left-index {
                width: 101px;
              }
            }
          }

          .right-container {
            grid-area: right-sidebar;
            align-self: center;
            position: relative;
            top: -50px;
            left: 10px;
          }

          .bottom-container {
            position: relative;
            grid-area: footer;

            .content {
              text-align: center;
            }

            .conditions {
              position: absolute;
              top: 0;
              right: 0;

              .condition {
                margin: 0.25rem;
                display: flex;
                gap: 1rem;
              }
            }
          }
        `}
      >
        <div className="left-container">
          <Typography.Title level={4}>
            ผลกระทบ/ความรุนแรง
          </Typography.Title>
        </div>
        <div className="score-table">
          <div className="wrapper-score-table">
            {xArray.map((X) => {
              return (
                <>
                  <div
                    key={X}
                    className={`column ${
                      X === 0 ? 'left-index' : ''
                    }`}
                  >
                    {yArray.map((Y) => {
                      return (
                        <>
                          {X === xArray.length - 1 ? (
                            xArray.length - 1 !== Y ? (
                              <div
                                key={Y}
                                className={css`
                                  margin: 0.1rem;
                                  height: 42px;
                                  display: flex;
                                  justify-content: center;
                                  align-items: center;
                                  background-color: #c4c4c4;
                                `}
                              >
                                <p>{Y + 1}</p>
                              </div>
                            ) : null
                          ) : Y === 0 ? (
                            <div
                              key={Y}
                              className={css`
                                margin: 0.1rem;
                                height: 42px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background-color: #c4c4c4;
                              `}
                            >
                              <p>{X + 1}</p>
                            </div>
                          ) : (
                            <div
                              key={Y}
                              className={css`
                                margin: 0.1rem;
                                height: 42px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background-color: ${checkRangeScore(
                                  (X + 1) * Y
                                )?.color};
                              `}
                            >
                              {tgList[(X + 1) * Y] ? (
                                <div
                                  className={css`
                                    width: 56px;
                                    background-image: ${tgList[
                                      (X + 1) * Y
                                    ]};
                                    background: ${tgList[
                                      (X + 1) * Y
                                    ]};
                                    text-align: center;
                                    border: 2px solid
                                      ${tgList[
                                        (X + 1) * Y
                                      ]};
                                    border-radius: 38px;
                                    padding: 0.25rem;

                                    p {
                                      font-weight: 600;
                                      color: #ffffff;
                                      margin: 0;
                                    }
                                  `}
                                >
                                  <p>{(X + 1) * Y}</p>
                                </div>
                              ) : (
                                <p>{(X + 1) * Y}</p>
                              )}
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
          <div className="bottom-container">
            <div className="content">
              <p>โอกาสเกิด / ความน่าจะเป็น</p>
              <p>
                อันดับความเสี่ยง = ความน่าจะเป็น x
                ผลที่ตามมา
              </p>
            </div>
          </div>
        </div>
        <div className="right-container">
          <Typography.Title level={4}>
            คะแนนความเสี่ยง
          </Typography.Title>
          {rangeScore.map((item, index) => (
            <p key={index}>
              {item.text} : {item.range[0]} -{' '}
              {item.range[item.range.length - 1]}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};
