import { ResponsiveBar } from '@nivo/bar';
import { BarDatum } from '@nivo/bar/dist/types';

export type IChartSettingMargin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type IBarchartProps = {
  data: BarDatum[];
  keys: string[];
  colors?: string[];
  indexBy: string;
  layout?: 'horizontal' | 'vertical';
  margin?: IChartSettingMargin;
  axisBottom?: Record<string, unknown>;
};

export const BarChart = ({
  data,
  keys,
  indexBy,
  colors,
  layout = 'vertical',
  margin = {
    top: 10,
    right: 0,
    bottom: 30,
    left: 30,
  },
  ...props
}: IBarchartProps) => {
  return (
    <>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={margin}
        layout={layout}
        colorBy="id"
        padding={0.4}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#ffffff"
        colors={colors}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: -90,
          legend: null,
          format: (v) => {
            return v?.length > 10 ? (
              <tspan>
                {v.substring(0, 9) + '...'}
                <title>{v}</title>
              </tspan>
            ) : (
              v
            );
          },
        }}
        // tooltip={CustomBarChartTooltip}
        {...props}
      />
    </>
  );
};
