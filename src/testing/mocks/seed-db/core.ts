import { testData } from '../../test-data';
import { db } from '../db';

export const coreSeedDb = () => {
  testData.core.coreNotify.listTable.forEach((item) =>
    db.coreNotify.create(item)
  );
};
