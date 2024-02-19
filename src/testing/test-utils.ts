import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';

import { AppProvider } from '@/providers/app';

// renders the app within the app provider
export const appRender = (ui: ReactElement) => {
  return render(ui, {
    wrapper: AppProvider,
  });
};

export * from '@testing-library/react';
export { userEvent };
