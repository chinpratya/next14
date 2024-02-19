import {
  BarChart,
  // The series option types are defined with the SeriesOption suffix
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
  RadarChart,
  RadarSeriesOption,
} from 'echarts/charts';
import {
  TitleComponent,
  // The component option types are defined with the ComponentOption suffix
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // Dataset
  DatasetComponent,
  DatasetComponentOption,
  // Built-in transform (filter, sort)
  TransformComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import {
  LabelLayout,
  UniversalTransition,
} from 'echarts/features';
import {
  CanvasRenderer,
  SVGRenderer,
} from 'echarts/renderers';

// Create an Option type with only the required components and charts via ComposeOption
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | RadarSeriesOption
>;

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  RadarChart,
  LabelLayout,
  UniversalTransition,
  SVGRenderer,
  CanvasRenderer,
]);

export const echartsCore = echarts;
