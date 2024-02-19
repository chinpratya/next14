export * from './apps';
export * from './navigation';
export * from './echarts';
export * from './response';
export * from './meta';
export * from './request';
export * from './form-builder';
export * from './consent-form';
export * from './upload';

export type ANY = any;

declare global {
  interface Window {
    gdprCookieNotice: any;
  }
}
