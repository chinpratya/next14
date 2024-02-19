import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const dataMappingOldQueryKeys =
  createQueryKeyStore({
    dataElement: {
      all: null,
      detail: (id: string) => [id],
    },
    dataSet: {
      all: null,
      detail: (serviceId: string, dataSetId: string) => [
        'service',
        serviceId,
        'data-set',
        dataSetId,
      ],
      legalBase: (
        serviceId: string,
        dataSetId: string
      ) => [
        'service',
        serviceId,
        'data-set',
        dataSetId,
        'legal',
      ],
      detailLegalBase: (
        serviceId: string,
        dataSetId: string,
        legalId: string
      ) => [
        'service',
        serviceId,
        'data-set',
        dataSetId,
        'legal',
        legalId,
      ],
      dataElement: (
        serviceId: string,
        dataSetId: string
      ) => [
        'service',
        serviceId,
        'data-set',
        dataSetId,
        'dataElement',
      ],
    },
    baseLegal: {
      all: null,
      detail: (
        serviceId: string,
        dataSetId: string,
        legalId: string
      ) => [
        'service',
        serviceId,
        'data-set',
        dataSetId,
        'legal',
        legalId,
      ],
    },
    purpose: {
      all: null,
    },
    controlMeasuresStorehouse: {
      all: null,
      meta: null,
      detail: (id: string) => [id],
    },
    devices: {
      all: null,
      detail: (id: string) => [id],
    },
    systemAndServices: {
      all: null,
      detail: (id: string) => [id],
      detailRights: (serviceId: string) => [serviceId],
      address: (serviceId: string) => [serviceId],
      detailAddress: (
        serviceId: string,
        addressId: string
      ) => [serviceId, addressId],
      detailResponsible: (serviceId: string) => [
        serviceId,
      ],
      responsibleById: (
        serviceId: string,
        responsibleId: string
      ) => [serviceId, responsibleId],
      datasets: (serviceId: string) => [serviceId],
      dataset: (serviceId: string, dataSetId: string) => [
        serviceId,
        dataSetId,
      ],
      datasetTypes: (serviceId: string) => [serviceId],
      detailDataSet: (serviceId: string) => [serviceId],
      legalBase: (
        serviceId: string,
        dataSetId: string
      ) => [serviceId, 'data-set', dataSetId, 'legal'],
      legalBaseById: (
        serviceId: string,
        dataSetId: string,
        legalId: string
      ) => [
        serviceId,
        'data-set',
        dataSetId,
        'legal',
        legalId,
      ],
      storages: (serviceId: string) => [serviceId],
      storage: (serviceId: string, storageId: string) => [
        serviceId,
        'storage',
        storageId,
      ],
      detailStorageDetail: (
        serviceId: string,
        storageId: string
      ) => [serviceId, storageId],
    },
    lifecycle: {
      all: null,
      detail: (lifecycleId: string) => [lifecycleId],
    },
    optionTypeData: {
      all: (optionType: string) => [optionType],
    },
    internationalLaw: {
      all: null,
      detail: (internationalLawId: string) => [
        internationalLawId,
      ],
    },
    country: {
      all: null,
      detail: (countryId: string) => [countryId],
    },
    activity: {
      all: null,
      detail: (activityId: string) => [activityId],
      detailDataSet: (activityId: string) => [activityId],
      detailOrganization: (activityId: string) => [
        activityId,
      ],
    },
    legaMeta: {
      all: (serviceId: string, dataSetId: string) => [
        'service',
        serviceId,
        'data-set',
        dataSetId,
        'lega-meta',
      ],
    },
  });
