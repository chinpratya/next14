import { css } from '@emotion/css';
import { Slider } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import { useEffect, useState } from 'react';

export type RiskSliderProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const color = ['#04d182', '#ffc542', '#f50'];
const marksValue = ['high', 'equal', 'low'];
const marks: SliderMarks = {
  0: 'สูง',
  1: 'เทียบเท่า',
  2: 'ต่ำ',
};

export const RiskSlider = ({
  value,
  onChange,
}: RiskSliderProps) => {
  const [sliderValue, setSliderValue] = useState<
    number | null
  >(null);

  const onSliderChange = (value: number) => {
    setSliderValue(value);
  };

  useEffect(() => {
    if (!sliderValue && value !== undefined) {
      const initIndex = value ? value : 'equal';
      const index = marksValue.indexOf(initIndex);
      setSliderValue(index);
    }
  }, [value, sliderValue, onChange]);

  useEffect(() => {
    if (sliderValue !== null && onChange) {
      onChange(marksValue[sliderValue]);
    }
  }, [sliderValue, onChange]);

  return (
    <div
      className={css`
        padding: 0 8px;
      `}
    >
      <Slider
        onChange={onSliderChange}
        value={sliderValue ?? 0}
        marks={marks}
        max={2}
        min={0}
        tooltip={{ open: false }}
        className={css`
        width: 100%;
        margin: 20px 0;

        .ant-slider-track,
        .ant-slider-handle, .ant-slider-track:hover {
          background: ${color[sliderValue ?? 0]};
          border: 2px solid ${color[sliderValue ?? 0]};
        }
      }
      `}
      />
    </div>
  );
};
