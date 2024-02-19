import { z } from 'zod';

import {
  SignupSchema,
  SignupMetaSchema,
} from '../schemas';

export type Signup = z.infer<typeof SignupSchema>;

export type SignupMeta = z.infer<typeof SignupMetaSchema>;

export type SignupComponentProps = {
  values: Signup;
  onNext?: (signup: Signup) => void;
  onPrev?: () => void;
};
