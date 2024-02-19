import { z } from 'zod';

import {
  RequestSchema,
  RequestResponseSchema,
  RequestDetailSchema,
  RequestFormSchema,
  RequestTaskSchema,
  RequestVerificationSchema,
  RequestVerificationResponseSchema,
  RequestMetaSchema,
  RequestVersionSchema,
  RequestVersionDataSchema,
  RequestRiskMatrixSchema,
} from '../schemas';

export type Request = z.infer<typeof RequestSchema>;

export type RequestResponse = z.infer<
  typeof RequestResponseSchema
>;

export type RequestDetail = z.infer<
  typeof RequestDetailSchema
>;

export type RequestVersionData = z.infer<
  typeof RequestVersionDataSchema
>;

export type RequestVersion = z.infer<
  typeof RequestVersionSchema
>;

export type RequestForm = z.infer<
  typeof RequestFormSchema
>;

export type RequestTask = z.infer<
  typeof RequestTaskSchema
>;

export type RequestVerification = z.infer<
  typeof RequestVerificationSchema
>;

export type RequestVerificationResponse = z.infer<
  typeof RequestVerificationResponseSchema
>;

export type RequestMeta = z.infer<
  typeof RequestMetaSchema
>;

export type RequestRiskMatrixType = z.infer<
  typeof RequestRiskMatrixSchema
>;
