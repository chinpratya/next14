import { z } from 'zod';

import {
  RequestSchema,
  RequestResponseSchema,
  RequestDetailSchema,
  RequestFormSchema,
  RequestActivitySchema,
  RequestActivityResponseSchema,
  RequestTaskSchema,
  RequestTaskResponseSchema,
  RequestVerificationSchema,
  RequestVerificationResponseSchema,
  RequestMetaSchema,
  RequestStatesSchema,
  IdetifyStatusSchema,
  RequestVersionSchema,
  RequestVersionDataSchema,
} from '../schemas';

export type Request = z.infer<typeof RequestSchema>;

export type RequestVersionData = z.infer<
  typeof RequestVersionDataSchema
>;

export type RequestVersion = z.infer<
  typeof RequestVersionSchema
>;

export type IdetifyStatus = z.infer<
  typeof IdetifyStatusSchema
>;

export type RequestStates = z.infer<
  typeof RequestStatesSchema
>;

export type RequestResponse = z.infer<
  typeof RequestResponseSchema
>;

export type RequestDetail = z.infer<
  typeof RequestDetailSchema
>;

export type RequestForm = z.infer<
  typeof RequestFormSchema
>;

export type RequestActivity = z.infer<
  typeof RequestActivitySchema
>;

export type RequestActivityResponse = z.infer<
  typeof RequestActivityResponseSchema
>;

export type RequestTask = z.infer<
  typeof RequestTaskSchema
>;

export type RequestTaskResponse = z.infer<
  typeof RequestTaskResponseSchema
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
