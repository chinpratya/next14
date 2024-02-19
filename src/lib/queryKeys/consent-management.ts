import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const consentManagementQueryKeys =
  createQueryKeyStore({
    purpose: {
      all: null,
      meta: null,
      detail: (purposeId: string) => [purposeId],
    },
    activity: {
      all: null,
      purpose: (activityId: string) => [activityId],
      purposeDetail: (
        activityId: string,
        purposeId: string
      ) => [activityId, purposeId],
      preview: (activityId: string) => [activityId],
    },
    receipt: {
      all: null,
      meta: null,
      detail: (receiptId: string) => [receiptId],
      form: (receiptId: string) => [receiptId],
      purposes: (receiptId: string) => [receiptId],
    },
    collectionPoint: {
      all: null,
      meta: null,
      setting: (collectionPointId: string) => [
        collectionPointId,
      ],
      detail: (collectionPointId: string) => [
        collectionPointId,
      ],
      sdk: (collectionPointId: string) => [
        collectionPointId,
      ],
      element: (collectionPointId: string) => [
        collectionPointId,
      ],
      purpose: (collectionPointId: string) => [
        collectionPointId,
      ],
      history: (collectionPointId: string) => [
        collectionPointId,
      ],
      preview: (collectionPointId: string) => [
        collectionPointId,
      ],
      policy: null,
      languages: (collectionPointId: string) => [
        collectionPointId,
      ],
      language: (
        collectionPointId: string,
        languageId: string
      ) => [collectionPointId, languageId],
    },
    preference: {
      activities: (preferenceId: string) => [
        preferenceId,
      ],
      history: (collectionPointId: string) => [
        collectionPointId,
      ],
    },
    preferenceCenters: {
      all: null,
      detail: (preferenceId: string) => [preferenceId],
      preview: (preferenceId: string) => [preferenceId],
    },
    transaction: {
      all: null,
      meta: null,
      detail: (transactionId: string) => [transactionId],
      purpose: (transactionId: string) => [transactionId],
    },
    dashboard: {
      all: null,
      source: null,
      activity: null,
      accept: null,
      cookie: null,
      activityGroup: null,
      policy: null,
    },
  });
