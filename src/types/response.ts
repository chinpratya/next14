export type ResponseBody<T> = {
  code: number;
  message: string;
  data: T;
};

export type CyberFetchLink = {
  next: string;
  prev: string;
};

export type CyberFetchMeta = {
  current_page: number;
  page_size: number;
  total_page: number;
};

export type CyberFetchResponse = {
  link?: CyberFetchLink;
  message: string;
  meta?: CyberFetchMeta;
  status: string;
};
