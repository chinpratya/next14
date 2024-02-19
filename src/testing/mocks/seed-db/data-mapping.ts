import { testData } from '../../test-data';
import { db } from '../db';

export const dataMappingSeedDb = () => {
  testData?.dataMapping.activity.list.forEach((item) =>
    db.dataMappingActivity.create(item)
  );
  db.dataMappingActivityLawfulBasis.create(
    testData?.dataMapping.activity.lawfulBasis
  );
  testData?.dataMapping.activity.basis.basisData.forEach(
    (item) => db.dataMappingActivityBasis.create(item)
  );
  testData?.dataMapping.activity.basis.purpose.list.forEach(
    (item) =>
      db.dataMappingActivityBasisPurpose.create(item)
  );
  testData?.dataMapping.activity.basis.purpose.dataCategory.forEach(
    (item) =>
      db.dataMappingActivityBasisPurposeDataCategory.create(
        item
      )
  );
  testData?.dataMapping.dataCategories.listDataCategories.forEach(
    (item) => db.dataMappingDataCategories.create(item)
  );
  testData.dataMapping.elements.list.forEach((item) =>
    db.dataMappingDataElement.create(item)
  );
  testData.dataMapping.elements.meta.forEach((item) =>
    db.dataMappingDataElementMeta.create(item)
  );
  testData.dataMapping.purpose.list.forEach((item) =>
    db.dataMappingPurpose.create(item)
  );
  testData.dataMapping.dataProcessor.list.forEach(
    (item) => db.dataMappingDataProcessor.create(item)
  );
  testData.dataMapping.group.list.forEach((item) =>
    db.dataMappingGroup.create(item)
  );
  testData.dataMapping.group.meta.forEach((item) =>
    db.dataMappingGroupMeta.create(item)
  );
  testData.dataMapping.purpose.listPurposeHistiory.forEach(
    (item) => db.dataMappingPurposeHistory.create(item)
  );
  testData.dataMapping.dataCategories.listDataElements.forEach(
    (item) =>
      db.dataMappingDataElementOfCategories.create(item)
  );
  testData.dataMapping.asset.list.forEach((item) =>
    db.dataMappingAsset.create(item)
  );
  testData.dataMapping.asset.listAdmin.forEach((item) =>
    db.dataMappingAssetResponsible.create(item)
  );
  db.dataMappingActivityCollect.create(
    testData.dataMapping.activity.collect.collectData
  );
  testData.dataMapping.activity.collect.purpose.forEach(
    (item) =>
      db.dataMappingActivityCollectPurpose.create({
        ...item,
        // legalBasis: [],
      })
  );
  testData.dataMapping.activity.collect.channels.forEach(
    (item) =>
      db.dataMappingActivityCollectChannel.create(item)
  );
  testData.dataMapping.activity.collect.dataRetention.forEach(
    (item) =>
      db.dataMappingActivityCollectDataRetention.create(
        item
      )
  );
  testData.dataMapping.activity.actor.forEach((item) =>
    db.dataMappingActivityActor.create(item)
  );
  testData.dataMapping.activity.listPurpose.forEach(
    (item) =>
      db.dataMappingActivityUseAndPublishPurpose.create(
        item
      )
  );
  testData.dataMapping.activity.usage.data.forEach(
    (item) => db.dataMappingActivityUsage.create(item)
  );

  testData.dataMapping.activity.usage.purpose.forEach(
    (item) =>
      db.dataMappingActivityUsagePurpose.create({
        ...item,
        legalBasis: [],
      })
  );
  testData.dataMapping.activity.usage.people.forEach(
    (item) =>
      db.dataMappingActivityUsagePeople.create(item)
  );
  db.dataMappingActivityDPIA.create(
    testData.dataMapping.activity.dpia.data
  );
  db.dataMappingActivityDPIAInit.create(
    testData.dataMapping.activity.dpia.init
  );
  testData?.dataMapping.ropa.list.forEach((item) =>
    db.dataMappingRopa.create(item)
  );
  testData?.dataMapping.dataLifecycle.list.forEach(
    (item) => db.dataMappingDataLifecycle.create(item)
  );
};
