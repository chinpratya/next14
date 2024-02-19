export const APP_NAME = 'Onefence';
export const API_MOCKING =
  process.env.NEXT_PUBLIC_API_MOCKING === 'true';

export const APP_EXTERNAL_URL = process.env
  .NEXT_PUBLIC_APP_EXTERNAL_URL as string;

export const IS_MSW_DEVTOOLS_ENABLED =
  process.env.NEXT_PUBLIC_IS_MSW_DEVTOOLS_ENABLED ===
  'true';

export const IS_DEVELOPMENT =
  process.env.NODE_ENV === 'development';
export const IS_TEST = process.env.NODE_ENV === 'test';
export const IS_PRODUCTION =
  process.env.NODE_ENV === 'production';

export const IS_BROWSER = typeof window !== 'undefined';
export const IS_SERVER = typeof window === 'undefined';

// api:
export const API_URL = process.env
  .NEXT_PUBLIC_API_URL as string;

export const API_ENDPOINT_ORGANIZATION_BASE_URL = `${API_URL}/organization`;

export const API_ENDPOINT_AUTH_BASE_URL = process.env
  .NEXT_PUBLIC_API_ENDPOINT_AUTH_BASE_URL as string;

export const API_ENDPOINT_DATA_MAPPING_BASE_URL =
  process.env
    .NEXT_PUBLIC_API_ENDPOINT_DATA_MAPPING_BASE_URL;

// API CyberFence:
export const API_ENDPOINT_CYBERFENCE_BASE_URL = process
  .env
  .NEXT_PUBLIC_API_ENDPOINT_CYBERFENCE_BASE_URL as string;

export const RECAPTCHA_SITE_KEY =
  '6LcXYt0aAAAAAJvi18TlTjVKOvprixo14KypYGov';
