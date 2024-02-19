import { css } from '@emotion/css';
import noUiSlider from 'nouislider';
import { useEffect, useRef } from 'react';

import { ANY } from '@/types';

export type RangSliderProps = {
  value?: number[];
  defaultValue?: number[];
  onChange?: (values: number[]) => void;
  min?: number;
  max?: number;
  colors?: string[];
  disable?: boolean;
};

export const RangSlider = ({
  value = [0],
  onChange,
  min = 0,
  max = 100,
  colors,
  disable = false,
}: RangSliderProps) => {
  const sliderContainer = useRef<ANY>(null);

  useEffect(() => {
    if (sliderContainer.current) {
      const slider = noUiSlider.create(
        sliderContainer.current,
        {
          start: value,
          connect: Array.from({
            length: value?.length + 1,
          }).map(() => true),
          step: 1,
          tooltips: true,
          format: {
            to: (value) => Math.floor(value),
            from: (value) => {
              return parseInt(value);
            },
          },
          range: { min: min, max: max },
        }
      );
      if (disable) {
        slider.disable();
      }
      // Updating values if provided by props
      if (value) {
        slider.set(value);
      }

      // Triggering onChange event when values are changed
      slider.on('change', (values) => {
        const changeValues = values?.map(
          (value): number => {
            if (typeof value === 'string') {
              return parseInt(value);
            }
            return value;
          }
        );
        onChange?.(changeValues);
      });

      const connects =
        sliderContainer.current?.querySelectorAll(
          '.noUi-connect'
        );

      if (colors) {
        connects?.forEach(
          (connect: ANY, index: number) => {
            if (connect.style) {
              connect.style.backgroundColor =
                colors?.[index];
            }
          }
        );
      }
    }
    return () => {
      // It's important to remove all reference when component is destroyed to avoid memory leak.
      if (sliderContainer.current) {
        //getting instance and destorying the same
        const slider =
          sliderContainer?.current?.noUiSlider;
        slider?.destroy();
      }
    };

    // eslint-disable-next-line
  }, [max, min, value]);

  return (
    <div
      className={css`
        #slider-round {
          height: 10px;
        }

        #slider-round .noUi-handle {
          ::before,
          ::after {
            display: none;
          }
          cursor: ${disable ? 'not-allowed' : 'pointer'};
          height: 18px;
          width: 18px;
          top: -5px;
          right: -9px; /* half the width */
          border-radius: 9px;
          :hover {
            height: 20px;
            width: 20px;
            border-color: #3e79f7;
          }
        }

        .noUi-tooltip {
          border: 1px solid #e6ebf1;
          min-width: 45px;
          border-radius: 0.625rem;
          // background-color: black;
          // color: white;
        }
      `}
    >
      <div
        className="slider-styled mt-4 mb-4"
        id="slider-round"
        ref={sliderContainer}
      />
    </div>
  );
};
