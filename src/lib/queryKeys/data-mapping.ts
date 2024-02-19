import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const dataMappingQueryKeys = createQueryKeyStore({
  activity: {
    all: null,
    meta: null,
    actors: (activityId: string, actorType: string) => [
      activityId,
      actorType,
    ],
    dataProcessor: (position: string) => [position],
    dataCategory: (activityId: string) => [activityId],
    dataCategoryDetail: (
      activityId: string,
      dataCategoryId: string
    ) => [activityId, dataCategoryId],
    detail: (activityId: string) => [activityId],
    detailDataSet: (activityId: string) => [activityId],
    detailOrganization: (activityId: string) => [
      activityId,
    ],
    collect: (activityId: string) => [activityId],
    collectMeta: (activityId: string) => [activityId],
    lawfulBasis: (activityId: string) => [activityId],
    basis: (activityId: string, basisId: string) => [
      activityId,
      basisId,
    ],
    basisPurpose: (
      activityId: string,
      basisId: string
    ) => [activityId, basisId],
    basisPurposeDataCategory: (
      activityId: string,
      basisId: string,
      purposeId: string
    ) => [activityId, basisId, purposeId],
    purpose: (activityId: string) => [activityId],
    collectPurpose: (activityId: string) => [activityId],
    collectAccess: (activityId: string) => [activityId],
    collectAccessDetail: (
      activityId: string,
      accessId?: string
    ) => [activityId, accessId],
    usage: (activityId: string) => [activityId],
    usagePurpose: (activityId: string) => [activityId],
    usageRelatedPerson: (activityId: string) => [
      activityId,
    ],
    dpia: (activityId: string) => [activityId],
    dpiaInit: (activityId: string) => [activityId],
    channel: (activityId: string) => [activityId],
    dataRetention: (activityId: string) => [activityId],
    disclosure: (activityId: string) => [activityId],
    disclosureActors: (activityId: string) => [
      activityId,
    ],
    disclosurePurpose: (activityId: string) => [
      activityId,
    ],
    disclosurePurposeDetail: (activityId: string) => [
      activityId,
    ],
    disclosurePurposeDestination: (
      activityId: string,
      purposeId: string
    ) => [activityId, purposeId],
    disclosurePurposeDestinationMeasure: (
      activityId: string,
      purposeId: string,
      destinationId: string
    ) => [activityId, purposeId, destinationId],
    preview: (activityId: string) => [activityId],
    consent: (activityId: string) => [activityId],
    dsar: (activityId: string) => [activityId],
  },
  dataCategories: {
    all: null,
    meta: null,
    detail: (dataCategoriesId: string) => [
      dataCategoriesId,
    ],
    dataElement: (dataCategoriesId: string) => [
      dataCategoriesId,
    ],
    assessment: (dataCategoriesId: string) => [
      dataCategoriesId,
    ],
    assessmentDetail: (
      dataCategoriesId: string,
      assessmentId: string
    ) => [dataCategoriesId, assessmentId],
  },
  dataController: {
    all: null,
    detail: (dataControllerId: string) => [
      dataControllerId,
    ],
    meta: null,
  },
  organization: {
    all: null,
    detail: (organizationId: string | undefined) => [
      organizationId ?? '',
    ],
  },
  dataLifecycle: {
    all: null,
    meta: null,
    detail: (dataLifecycleId: string) => [
      dataLifecycleId,
    ],
    cycle: (dataLifecycleId: string) => [dataLifecycleId],
    cycleDetail: (dataLifecycleId: string) => [
      dataLifecycleId,
    ],
  },
  dataElement: {
    all: null,
    meta: null,
    detail: (dataElementId: string) => [dataElementId],
  },
  purpose: {
    all: null,
    detail: (purposeId: string) => [purposeId],
    history: (purposeId: string) => [purposeId],
  },
  group: {
    all: null,
    meta: null,
    detail: (groupId: string) => [groupId],
  },
  asset: {
    all: null,
    detail: (assetId: string) => [assetId],
  },
  assetResponsible: {
    all: (assetId: string) => [assetId],
  },
  ropa: {
    all: null,
    detail: (ropaId: string) => [ropaId],
  },
  tags: {
    all: null,
    detail: (tagsId: string | undefined) => [
      tagsId ?? '',
    ],
  },
  dashbaord: {
    count: null,
    classification: null,
    dataElement: null,
    lawfulBasis: null,
    rights: null,
    consent: null,
    dsar: null,
    thirdParty: null,
    thirdPartyMap: null,
  },
});
