import { useToggle } from '@mantine/hooks';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Loading } from '@/components/share-components/loading';
import { FallbackError } from '@/components/util-components/fallback-error';

import { useCheckOrganization } from '../../api/check-organization';

import { InitalSystemWrapperModal } from './inital-system-wrapper-modal';

type InitalSystemWrapperProps = {
  children: React.ReactNode;
};

export const InitalSystemWrapper = ({
  children,
}: InitalSystemWrapperProps) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [value, toggle] = useToggle();

  const { data, isLoading, isError } =
    useCheckOrganization();

  useEffect(() => {
    if (data && !data.status) toggle(true);
  }, [data, toggle, router.pathname]);

  return (
    <FallbackError isError={isError}>
      {!data?.status || isLoading ? (
        <Loading cover="content" />
      ) : (
        children
      )}

      <InitalSystemWrapperModal
        open={value}
        form={form}
        onCancel={toggle}
      />
    </FallbackError>
  );
};
