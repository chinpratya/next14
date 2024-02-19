import { useCounter, useSetState } from '@mantine/hooks';

import { Loading } from '@components/loading';

import {
  SignIn,
  SignInComponentProps,
} from '../../types';

import { LoginAccount } from './login-account';
import { LoginOrganization } from './login-organization';
import { LoginPassword } from './login-password';

type RenderPage = SignInComponentProps & {
  page: number;
};

const renderLoginFlow = ({
  page,
  values,
  onNext,
  onPrev,
}: RenderPage) => {
  switch (page) {
    case 0:
      return (
        <LoginAccount values={values} onNext={onNext} />
      );
    case 1:
      return (
        <LoginOrganization
          values={values}
          onNext={onNext}
          onPrev={onPrev}
        />
      );
    case 2:
      return (
        <LoginPassword
          values={values}
          onNext={onNext}
          onPrev={onPrev}
        />
      );
    default:
      return <Loading cover="page" />;
  }
};

export const LoginFlow = () => {
  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: 2,
  });
  const [signIn, setSignIn] = useSetState({} as SignIn);

  const onNext = (values = {} as SignIn) => {
    setSignIn(values);
    pageHandler.increment();
  };

  const onPrev = pageHandler.decrement;

  return renderLoginFlow({
    page,
    values: signIn,
    onNext,
    onPrev,
  });
};
