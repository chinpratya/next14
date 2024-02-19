import { z } from 'zod';

import {
  SignInSchema,
  AuthenticatedUserSchema,
} from '../schemas';

export type SignIn = z.infer<typeof SignInSchema>;

export type SignInComponentProps = {
  values: SignIn;
  onNext?: (signIn: SignIn) => void;
  onPrev?: () => void;
};

export type AuthenticatedUser = z.infer<
  typeof AuthenticatedUserSchema
>;
