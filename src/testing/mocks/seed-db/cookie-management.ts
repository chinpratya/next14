import { v4 as uuid } from 'uuid';

import { testData } from '../../test-data';
import { db } from '../db';

export const cookieManagementSeedDb = () => {
  testData?.cookieManagement?.domain?.list?.forEach(
    (item) => {
      const category = testData.cookieManagement.category;

      db.cookieManagementDomain.create({
        ...item,
        setting: JSON.stringify(
          testData?.cookieManagement?.domain?.setting
        ),
      });

      db.cookieManagementCategory.create({
        id: uuid(),
        domainID: item.domainID,
        cookies: JSON.stringify(category.cookies),
        category: JSON.stringify(category.category),
      });
    }
  );
};
