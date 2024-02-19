import { z } from 'zod';

export const EntitySchema = z.object({
  ObjectID: z.string().optional(),
  ObjectType: z.string().optional(),
  ObjectUUID: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  created_dt: z.string().optional(),
  created_by: z.string().optional(),
  updated_dt: z.string().optional(),
  updated_by: z.string().optional(),
  createdDt: z.string().optional(),
  createdBy: z.string().optional(),
  updatedDt: z.string().optional(),
  updatedBy: z.string().optional(),
});

export const ResponseSchema = z.object({
  code: z.number().optional(),
  message: z.string().optional(),
  status: z.number().optional(),
  statusCode: z.number().optional(),
  currentPage: z.number().optional(),
  currentRecord: z.number().optional(),
  totalPage: z.number().optional(),
  totalRecord: z.number().optional(),
});

export const ResponseCyberFenceSchema = z.object({
  code: z.number().optional(),
  message: z.string().optional(),
  status: z.string().optional(),
  meta: z
    .object({
      current_page: z.number().optional(),
      page_size: z.number().optional(),
      total_page: z.number().optional(),
      currentPage: z.number().optional(),
      pageSize: z.number().optional(),
      totalPage: z.number().optional(),
    })
    .optional(),
  link: z
    .object({
      next: z.string().optional(),
      prev: z.string().optional(),
    })
    .optional(),
});
