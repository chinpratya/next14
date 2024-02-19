import {
  dataMappingActivity,
  dataMappingActivityActor,
  dataMappingActivityCollect,
  dataMappingActivityLawfulBasis,
  dataMappingActivityBasis,
  dataMappingActivityBasisPurpose,
  dataMappingActivityBasisPurposeDataCategory,
  dataMappingActivityCollectPurpose,
  dataMappingActivityCollectChannel,
  dataMappingActivityCollectDataRetention,
  dataMappingActivityDataCategory,
  dataMappingActivityPreview,
  dataMappingActivityDisclosureActor,
  dataMappingActivityUseAndPublishPurpose,
  dataMappingActivityUsage,
  dataMappingActivityUsagePurpose,
  dataMappingActivityUsagePeople,
} from './activity';
import {
  dataMappingAsset,
  dataMappingAssetResponsible,
} from './asset';
import {
  dataMappingDataCategories,
  dataMappingDataElementOfCategories,
} from './data-categories';
import {
  dataMappingDataElement,
  dataMappingDataElementMeta,
} from './data-element';
import { dataMappingDataLifecycle } from './data-lifecycle';
import { dataMappingDataProcessor } from './data-processor';
import {
  dataMappingActivityDPIA,
  dataMappingActivityDPIAInit,
} from './dpia';
import {
  dataMappingGroup,
  dataMappingGroupMeta,
} from './group';
import {
  dataMappingPurpose,
  dataMappingPurposeHistory,
} from './purpose';
import { dataMappingRopa } from './ropa';

export const dataMappingModels = {
  dataMappingActivity,
  dataMappingActivityActor,
  dataMappingActivityCollect,
  dataMappingActivityDataCategory,
  dataMappingActivityDisclosureActor,
  dataMappingDataCategories,
  dataMappingDataElement,
  dataMappingDataElementMeta,
  dataMappingPurpose,
  dataMappingDataLifecycle,
  dataMappingDataProcessor,
  dataMappingGroup,
  dataMappingGroupMeta,
  dataMappingPurposeHistory,
  dataMappingDataElementOfCategories,
  dataMappingAsset,
  dataMappingAssetResponsible,
  dataMappingActivityLawfulBasis,
  dataMappingActivityBasis,
  dataMappingActivityBasisPurpose,
  dataMappingActivityBasisPurposeDataCategory,
  dataMappingActivityCollectPurpose,
  dataMappingActivityCollectChannel,
  dataMappingActivityCollectDataRetention,
  dataMappingActivityPreview,
  dataMappingActivityUseAndPublishPurpose,
  dataMappingActivityUsage,
  dataMappingActivityUsagePurpose,
  dataMappingActivityUsagePeople,
  dataMappingActivityDPIA,
  dataMappingRopa,
  dataMappingActivityDPIAInit,
};
