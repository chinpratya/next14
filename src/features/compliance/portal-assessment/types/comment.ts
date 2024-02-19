import { z } from 'zod';

import {
  CommentSchema,
  CommentIssueSchema,
  CommentResponeSchema,
  FormCommentUnreadResponseSchema,
} from '../schemas/comment';

export type Comment = z.infer<typeof CommentSchema>;
export type CommentRespone = z.infer<
  typeof CommentResponeSchema
>;

export type CommentIssue = z.infer<
  typeof CommentIssueSchema
>;

export type FormCommentUnreadResponse = z.infer<
  typeof FormCommentUnreadResponseSchema
>;
