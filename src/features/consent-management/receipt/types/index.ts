import z from 'zod';

import {
  ReceiptSchema,
  ReceiptResponseSchema,
  ReceiptFormSchema,
  ReceiptPurposeResponseSchema,
  ReceiptMetaSchema,
} from '../schemas';

export type Receipt = z.infer<typeof ReceiptSchema>;

export type ReceiptMeta = z.infer<
  typeof ReceiptMetaSchema
>;

export type ReceiptResponse = z.infer<
  typeof ReceiptResponseSchema
>;

export type ReceiptForm = z.infer<
  typeof ReceiptFormSchema
>;

export type ReceiptPurposeResponse = z.infer<
  typeof ReceiptPurposeResponseSchema
>;
