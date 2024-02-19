import { useStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import { AuthenticatedUser } from '../../features/auth/types';

type orgProps = {
  organizationName: string;
  organizationId: string;
};
const initialState = {
  access_token: '',
  refresh_token: '',
  token_type: '',
} as AuthenticatedUser;

export type AuthStore = AuthenticatedUser & {
  authenticate: (auth: AuthenticatedUser) => void;
  setUser: (email: string) => void;
  setOrg: (org: orgProps) => void;
  logout: (fn?: () => void) => void;
  expiresIn: number;
  savedAt: number;
  permissions?: Record<string, string[]>;
  accessModule?: string[];
  refreshToken: (refreshToken: {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_expires_in: number;
  }) => void;
};

export const authStore = createStore<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      expiresIn: 0,
      savedAt: Date.now(),
      authenticate: (auth) => {
        localStorage.setItem(
          'auth',
          JSON.stringify(auth)
        );
        set({
          ...auth,
          expiresIn: Date.now() + auth.expires_in * 1000,
          savedAt: Date.now(),
        });
      },
      setUser: (email: string) => {
        localStorage.setItem(
          'email',
          JSON.stringify(email)
        );
        set({
          email,
        });
      },
      setOrg: (org: orgProps) => {
        localStorage.setItem(
          'organization',
          JSON.stringify(org)
        );
        set({
          organizationName: org.organizationName,
          organizationId: org.organizationId,
        });
      },
      logout: (fn) => {
        localStorage.removeItem('auth');
        localStorage.removeItem('organization');
        localStorage.removeItem('email');
        localStorage.removeItem('accessModule');
        set(initialState);
        fn?.();
      },
      refreshToken: (refreshToken) => {
        set({
          ...refreshToken,
          expiresIn:
            Date.now() + refreshToken.expires_in * 1000,
          savedAt: Date.now(),
        });
      },
    }),
    {
      name: 'auth',
    }
  )
);

export const useAuth = () => useStore(authStore);
