import z from 'zod';

import {
  TransactionSchema,
  TransactionResponseSchema,
  TransactionDetailSchema,
  TransactionPurposeSchema,
  TransactionMetaSchema,
} from '../schemas';

export type Transaction = z.infer<
  typeof TransactionSchema
>;

export type TransactionResponse = z.infer<
  typeof TransactionResponseSchema
>;

export type TransactionDetail = z.infer<
  typeof TransactionDetailSchema
>;

export type TransactionDetailPurpose = z.infer<
  typeof TransactionPurposeSchema
>;

export type TransactionMeta = z.infer<
  typeof TransactionMetaSchema
>;
