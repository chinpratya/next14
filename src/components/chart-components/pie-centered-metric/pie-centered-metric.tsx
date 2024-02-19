import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { ANY } from '@/types';

export type PieCenteredMetricProps = {
  dataWithArc: ANY;
  centerX: number;
  centerY: number;
  innerRadius: number;
};

export const commonProperties = {
  textAnchor: 'middle',
  dominantBaseline: 'central',
  style: {
    fontSize: '1.2rem',
    fontWeight: '500',
  },
};

const hideLabel = 80;
const hideValue = 50;

export const PieCenteredMetric = ({
  dataWithArc,
  centerX,
  centerY,
  innerRadius,
}: PieCenteredMetricProps) => {
  const { t } = useTranslation();

  let total = 0;
  dataWithArc.forEach((datum: { value: number }) => {
    total += datum.value;
  });

  const totalY =
    innerRadius > hideLabel ? centerY + 15 : centerY;

  if (innerRadius < hideValue) return null;

  return (
    <>
      {innerRadius > hideLabel ? (
        <text
          {...commonProperties}
          x={centerX}
          y={centerY - 15}
        >
          {t(tokens.common.chart.total)}
        </text>
      ) : null}
      <text {...commonProperties} x={centerX} y={totalY}>
        {total}
      </text>
    </>
  );
};
