import { z } from 'zod';

import {
  DataControllerSchema,
  DataControllersSchema,
  DataControllersResponseSchema,
  DataControllerMataSchema,
} from '../schemas';

export type DataController = z.infer<
  typeof DataControllerSchema
>;

export type DataControllers = z.infer<
  typeof DataControllersSchema
>;

export type DataControllersResponse = z.infer<
  typeof DataControllersResponseSchema
>;

export type DataControllerMeta = z.infer<
  typeof DataControllerMataSchema
>;
