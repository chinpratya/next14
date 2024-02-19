import { primaryKey, nullable } from '@mswjs/data';
import { v4 as uuid } from 'uuid';

export const dataMappingActivityDPIA = {
  ObjectUUID: primaryKey(uuid),
  dpia: {
    purpose: String,
    reference: String,
    project: String,
    listOfPersonalData: String,
    description: String,
  },
  needForPreparationDpia: {
    purpose: String,
    type: String,
  },
  natureOfDataProcessing: {
    description: String,
    source: String,
    isShare: Boolean,
    shareDetail: String,
    riskProcessing: String,
    fileID: String,
    fileUrl: String,
  },
  processingScope: {
    scope: String,
    isSensitiveData: Boolean,
    sensitiveDataDetail: String,
    storeSensitiveData: String,
    periodStoreSensitiveData: Number,
    impactDataSubject: Number,
    country: String,
  },
  processingDetail: {
    relationshipOfDataSubject: String,
    controlOfDataSubject: String,
    isDataSubjectExpectProcessing: Boolean,
    isWorryProcessing: Boolean,
    isNewProcessing: Boolean,
    levelOfTechForProcessing: String,
    isSocietyWorry: Boolean,
    societyWorryDetail: String,
  },
  purposeOfProcessing: {
    purpose: String,
    impact: String,
    benefit: String,
  },
  opinion: {
    isOtherPeople: Boolean,
    otherPeopleDetail: String,
    isProcessingForResearch: Boolean,
    processingForResearchDetail: String,
    isPlanConsult: Boolean,
  },
  measureApplyLaw: {
    lawBasis: String,
    processingHelpResearchComplete: String,
    isOtherWay: Boolean,
    otherWayDetail: String,
    preventiveMeasures: String,
    maintainDataQuality: String,
    dataOfDataSubject: String,
    carryOutRightsOfDataSubject: String,
    isPersonalDataProcessorControlMeasures: Boolean,
    personalDataProcessorControlMeasuresDetail: String,
    dataTranfer: String,
  },
  lastUpdatedDt: nullable(String),
};

export const dataMappingActivityDPIAInit = {
  ObjectUUID: primaryKey(uuid),
  natureOfDataProcessing: {
    source: String,
    isShare: Boolean,
    shareDetail: String,
  },
  processingScope: {
    isSensitiveData: Boolean,
    sensitiveDataDetail: String,
    periodStoreSensitiveData: Number,
  },
};
