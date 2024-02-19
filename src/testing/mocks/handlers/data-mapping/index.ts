import { dataMappingActivityHandlers } from './activity';
import { dataMappingAssetHandlers } from './asset';
import { dataMappingDashboardHandlers } from './dashboard';
import { dataMappingDataCategoriesHandlers } from './data-categories';
import { dataMappingDataElementHandlers } from './data-element';
import { dataMappingDataLifecycleHandlers } from './data-lifecycle';
import { dataMappingDataProcessorHandlers } from './data-processor';
import { dataMappingGroupHandlers } from './group';
import { dataMappingPurposeHandlers } from './purpose';
import { dataMappingDataRopaHandlers } from './ropa';

export const dataMappingHandlers = [
  ...dataMappingActivityHandlers,
  ...dataMappingAssetHandlers,
  ...dataMappingDataCategoriesHandlers,
  ...dataMappingDataElementHandlers,
  ...dataMappingDataLifecycleHandlers,
  ...dataMappingDataProcessorHandlers,
  ...dataMappingGroupHandlers,
  ...dataMappingPurposeHandlers,
  ...dataMappingDataRopaHandlers,
  ...dataMappingDashboardHandlers,
];
