const data = {
  ObjectUUID: 'aca7759b-9670-480f-8d38-a92025201af9',
  dpia: {
    purpose: 'testing',
    reference: 'testing',
    project: 'testing',
    listOfPersonalData: 'testing',
    description: 'testing',
  },
  needForPreparationDpia: {
    purpose: 'testing',
    type: 'testing',
  },
  natureOfDataProcessing: {
    description: 'testing',
    source: 'testing',
    isShare: true,
    shareDetail: 'testing',
    riskProcessing: 'testing',
    fileID: '138a66ab-c678-4efe-87ff-dfc007fff1c4',
    fileUrl:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  processingScope: {
    scope: 'test',
    isSensitiveData: true,
    sensitiveDataDetail: 'test',
    storeSensitiveData: 'test',
    periodStoreSensitiveData: 2,
    impactDataSubject: 1,
    country: 'test',
  },
  processingDetail: {
    relationshipOfDataSubject: 'test',
    controlOfDataSubject: 'test',
    isDataSubjectExpectProcessing: true,
    isWorryProcessing: true,
    isNewProcessing: true,
    levelOfTechForProcessing: 'test',
    isSocietyWorry: true,
    societyWorryDetail: 'test',
  },
  purposeOfProcessing: {
    purpose: 'test',
    impact: 'test',
    benefit: 'test',
  },
  opinion: {
    isOtherPeople: true,
    otherPeopleDetail: 'test',
    isProcessingForResearch: true,
    processingForResearchDetail: 'test',
    isPlanConsult: true,
  },
  measureApplyLaw: {
    lawBasis: 'test',
    processingHelpResearchComplete: 'test',
    isOtherWay: true,
    otherWayDetail: 'test',
    preventiveMeasures: 'test',
    maintainDataQuality: 'test',
    dataOfDataSubject: 'test',
    carryOutRightsOfDataSubject: 'test',
    isPersonalDataProcessorControlMeasures: true,
    personalDataProcessorControlMeasuresDetail: 'test',
    dataTranfer: 'test',
  },
  lastUpdatedDt: '',
};

const init = {
  natureOfDataProcessing: {
    source: 'testingInit',
    isShare: true,
    shareDetail: 'testingInit',
  },
  processingScope: {
    isSensitiveData: true,
    sensitiveDataDetail: 'testInit',
    periodStoreSensitiveData: 22,
  },
};
export const dpia = {
  data,
  init,
};
