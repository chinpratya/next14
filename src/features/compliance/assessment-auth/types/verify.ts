import { FormInstance } from 'antd';
import { z } from 'zod';

import {
  VerificationEmailSchema,
  VerificationOtpSchema,
  VerificationRoleSchema,
} from '../schemas/verify';

export type Verify = {
  email: string;
  code: string;
  otp: string | number;
};

export type VerifyProps = {
  form: FormInstance;
  verify: Verify;
  onNext: (values: Verify) => void;
  onPrev: () => void;
};

export type VerificationRole = z.infer<
  typeof VerificationRoleSchema
>;

export type VerificationEmail = z.infer<
  typeof VerificationEmailSchema
>;

export type VerificationOtp = z.infer<
  typeof VerificationOtpSchema
>;
