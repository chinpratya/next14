import '@/testing/matchMedia.mock';
import LoginPage from '@/pages/auth/login';
import {
  appRender,
  fireEvent,
  screen,
} from '@/testing/test-utils';

const router = {
  replace: jest.fn(),
  query: {},
};

jest.mock('next/router', () => ({
  useRouter: () => router,
}));

describe('Login Page', () => {
  it('should login the user', async () => {
    const credentials = {
      email: 'c.thanupakon+dev@securitypitch.com',
      password: 'Password02!',
      businessShortName: 'test',
    };

    const { getByRole, getByTestId, getByLabelText } =
      appRender(<LoginPage />);

    fireEvent.change(getByLabelText('Email'), {
      target: { value: credentials.email },
    });
    fireEvent.click(getByTestId(`accept`));
    fireEvent.click(
      getByRole('button', { name: /Continue/i })
    );

    await screen.findByText(/Enter Organization/i);

    fireEvent.change(
      getByLabelText('Enter Organization Short name'),
      {
        target: { value: credentials.businessShortName },
      }
    );
    fireEvent.click(
      getByRole('button', { name: /Continue/i })
    );

    await screen.findByText(/Enter your password/i);

    fireEvent.change(getByLabelText('Password'), {
      target: { value: credentials.password },
    });
    fireEvent.click(
      getByRole('button', { name: /Continue/i })
    );
  });
});
