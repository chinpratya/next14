import Axios from 'axios';

import { API_URL } from '@/config/constants';
import { authStore } from '@/stores/auth';
import { notificationsStore } from '@/stores/notifications';

export const apiClient = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    lang: 'th',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const { access_token } = authStore.getState();

    if (
      access_token &&
      config.headers.Authorization !== null
    ) {
      config.headers.Authorization = access_token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error(`error`, error);

    const message =
      error?.response?.data?.error?.message ??
      error?.response?.data?.errorMessage ??
      error?.response?.data?.message ??
      error?.response?.data?.Message ??
      error?.message ??
      error?.response?.data?.errorCode ??
      '';

    if (message === 'Network Error') {
      return Promise.reject(error);
    }

    if (
      message.toLowerCase().includes('token') ||
      message.toLowerCase().includes('expired') ||
      message.toLowerCase().includes('auth')
    ) {
      authStore.getState().logout();
      localStorage.removeItem('auth');
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }

    if (
      error?.response?.status === 404 ||
      message.toLowerCase().includes('permission') ||
      !message
    ) {
      return Promise.reject(error);
    }

    notificationsStore.getState().showNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  }
);
