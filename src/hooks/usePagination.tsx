import { Pagination as AntdPagination } from 'antd';
import type { PaginationProps } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Pagination = ({
  total,
  current = 0,
  pageSize = 10,
  showSizeChanger = true,
  onChange,
  ...props
}: PaginationProps) => {
  useEffect(() => {
    const minSize = current * pageSize - pageSize;
    if (total && minSize > total) {
      onChange?.(1, pageSize);
    }
  }, [current, onChange, pageSize, total]);

  if (!total) return null;
  if (total < 1) return null;
  return (
    <AntdPagination
      className="mt-4 text-right"
      total={total ?? 1}
      current={current ?? 1}
      pageSizeOptions={[10, 20, 30]}
      showSizeChanger={showSizeChanger}
      pageSize={pageSize}
      onChange={onChange}
      {...props}
    />
  );
};
export type UsePagination = {
  id?: string;
  saveToSessionStorage?: boolean;
  pageSize?: number;
};
export const usePagination = ({
  id,
  saveToSessionStorage = false,
  ...props
}: UsePagination = {}) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    props?.pageSize ?? 10
  );

  const onPaginationChange = (
    page: number,
    pageSize?: number
  ) => {
    if (saveToSessionStorage) {
      sessionStorage.setItem(
        router.pathname + id,
        String(page)
      );
    }
    setPage(page);
    setPageSize(pageSize ?? 10);
  };

  useEffect(() => {
    const page = Number(
      sessionStorage.getItem(router.pathname + id)
    );
    if (page) {
      setPage(page);
    }
  }, [id, router.pathname]);

  return {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  };
};
