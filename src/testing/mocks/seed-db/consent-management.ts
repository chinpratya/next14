import { testData } from '../../test-data';
import { db } from '../db';

export const consentManagementSeedDb = () => {
  testData?.consentManagement.purpose.list.forEach(
    (item) => db.dataMappingPurpose.create(item)
  );
  testData?.consentManagement.receipt.forEach((item) =>
    db.consentManagementReceipt.create(item)
  );
  testData?.consentManagement.activity.list.forEach(
    (item) => db.dataMappingActivity.create(item)
  );
  testData?.consentManagement.activity.purpose.forEach(
    (item) =>
      db.consentManagementActivityPurpose.create(item)
  );
  testData?.consentManagement.collectionPoint.list.forEach(
    (item) =>
      db.consentManagementCollectionPoint.create({
        ...item,
        form: JSON.stringify(
          testData?.consentManagement.collectionPoint
            .preview
        ),
      })
  );
  testData?.consentManagement.preferenceCenters.list.forEach(
    (item) =>
      db.consentManagementPreferenceCenters.create({
        ...item,
        form: JSON.stringify(
          testData?.consentManagement.preferenceCenters
            .preview
        ),
      })
  );
  db.consentManagementCollectionPointElement.create(
    testData?.consentManagement.collectionPoint.element
  );
  db.consentManagementCollectionPointPrivacyNotice.create(
    testData?.consentManagement.collectionPoint
      .privacyNotice
  );
  testData?.consentManagement.collectionPoint.history.forEach(
    (item) =>
      db.consentManagementCollectionPointHistory.create(
        item
      )
  );
  testData?.consentManagement.transaction.list.forEach(
    (item) => db.consentManagementTransaction.create(item)
  );
  testData?.consentManagement.dashboard.accept.forEach(
    (item) =>
      db.consentManagementDashboardAccept.create(item)
  );
};
