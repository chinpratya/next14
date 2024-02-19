import { z } from 'zod';

export const CommentSchema = z.object({
  ObjectUUID: z.string(),
  message: z.string(),
  createdBy: z.string(),
  createdDt: z.string(),
  updatedBy: z.string().optional(),
  updatedDt: z.string().optional(),
});

export const CommentResponeSchema = z.object({
  code: z.number(),
  message: z.string(),
  count: z.number(),
  statusCode: z.number().optional(),
});

export const CommentIssueSchema = z.object({
  haveIssue: z.boolean(),
  status: z.enum(['issue', 'approved']),
});

export const FormCommentUnreadResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.array(z.string()),
});
