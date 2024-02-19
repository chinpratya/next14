import { primaryKey } from '@mswjs/data';

export const provinceModel = {
  ProvinceID: primaryKey(Number),
  ProvinceThai: String,
  ProvinceEng: String,
  Region: String,
};

export const addressModels = { provinceModel };
