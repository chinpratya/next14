import { Card, Image } from 'antd';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import { Flex } from '@components/flex';

export const ConsentBuilderLogo = () => {
  const { formSetting } = useConsentBuilderStore();

  const logo = formSetting?.form?.headerLogo as string;

  if (!logo) {
    return null;
  }

  return (
    <Card>
      <Flex justifyContent="center" alignItems="center">
        <Image
          src={logo}
          alt="consent form logo"
          style={{
            height: 75,
          }}
          preview={false}
        />
      </Flex>
    </Card>
  );
};
