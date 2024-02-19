import { useCounter, useSetState } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Loading } from '@components/loading';

import { SignupSchema } from '../../schemas';
import {
  Signup,
  SignupComponentProps,
} from '../../types';

import { SignupAccount } from './signup-account';
import { SignupBusiness } from './signup-business';
import { SignupCongratulations } from './signup-congratulations';
import { SignupEmail } from './signup-email';
import { SignupSlug } from './signup-slug';

type RenderPage = SignupComponentProps & {
  page: number;
};

const renderPage = ({
  page,
  values,
  onNext,
  onPrev,
}: RenderPage) => {
  switch (page) {
    case 1:
      return (
        <SignupEmail values={values} onNext={onNext} />
      );
    case 2:
      return (
        <SignupBusiness
          values={values}
          onNext={onNext}
          onPrev={onPrev}
        />
      );
    case 3:
      return (
        <SignupSlug
          values={values}
          onNext={onNext}
          onPrev={onPrev}
        />
      );
    case 4:
      return (
        <SignupAccount
          values={values}
          onPrev={onPrev}
          onNext={onNext}
        />
      );
    case 5:
      return (
        <SignupCongratulations
          values={values}
          onPrev={onPrev}
        />
      );
    default:
      return <Loading cover="page" />;
  }
};

const initialSignupState: Signup = {
  user: {
    email: '',
    password: '',
    attributes: {
      first_name: '',
      last_name: '',
      phone_number: '',
    },
  },
  tenant: {
    organization_name: '',
    organization_attributes: {
      organization_type: '',
      organization_employee_size: '',
      organization_short_name: '',
    },
  },
};

export const SignupFlow = () => {
  const router = useRouter();

  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: 5,
  });
  const [signup, setSignup] = useSetState<Signup>(
    initialSignupState
  );

  const onNext = (values = {} as Signup) => {
    const nextValues = { ...signup, ...values };
    if (values?.user) {
      nextValues.user = {
        ...signup.user,
        ...values.user,
      };
    }
    if (values?.user?.attributes) {
      nextValues.user.attributes = {
        ...signup.user.attributes,
        ...values.user.attributes,
      };
    }
    if (values?.tenant) {
      nextValues.tenant = {
        ...signup.tenant,
        ...values.tenant,
      };
    }
    if (values?.tenant?.organization_attributes) {
      nextValues.tenant.organization_attributes = {
        ...signup.tenant.organization_attributes,
        ...values.tenant.organization_attributes,
      };
    }

    setSignup(nextValues);
    pageHandler.increment();
  };

  const onPrev = pageHandler.decrement;

  useEffect(() => {
    const query = router.query;
    if (page === 0) {
      try {
        SignupSchema.parse(query);
        setSignup(query);
        pageHandler.set(5);
      } catch (error) {
        pageHandler.set(1);
      }
    }
  }, [page, pageHandler, router.query, setSignup]);

  return renderPage({
    page,
    values: signup,
    onNext,
    onPrev,
  });
};
