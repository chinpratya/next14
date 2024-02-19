import { testData } from '../../test-data';
import { db } from '../db';

export const optionSeedDb = () => {
  testData?.option?.type.list?.forEach((item) =>
    db.optionType.create(item)
  );
};
