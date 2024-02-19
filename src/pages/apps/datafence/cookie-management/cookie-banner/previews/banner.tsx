import { useLocalStorage } from '@mantine/hooks';
import _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import {
  previewDefaultSetting,
  previewNecessary,
} from '@/features/cookie-management';

const PreviewBannerPage = () => {
  const router = useRouter();
  const domainId = router.query.domainId as string;

  const [bannerPreview] = useLocalStorage<
    Record<string, unknown>
  >({
    key: 'banner_preview',
    defaultValue: {},
  });

  const gdprCookieNotice = (
    setting: Record<string, unknown>
  ) => {
    if (_.isEmpty(setting)) {
      return;
    }

    try {
      const removeElement =
        window.document.querySelectorAll(
          '.onefence-container'
        );
      removeElement.forEach((element) => {
        element.remove();
      });

      const lang = setting.lang;
      const text = _.get(setting, `text.${lang}`, {});

      const payload = {
        language: lang,
        last_update: '2024-01-18T07:08:09Z',
        domainID: '71613940-9fba-11ee-91d5-569900a2f753',
        cookies: [
          {
            Category: 'unclassified',
            Description: '-',
            Name: '_ga_LJ94BVJCV5',
            Expiry: 'session',
            source: 'unknow source',
          },
        ],
        category: [
          {
            cetegory_label: 'Strictly Necessary Cookies',
            background: '#2AC3ED',
            cetegory_name: 'necessary',
            description:
              'These cookies are required to ensure the website can work properly.  They cannot be disabled.',
            necessary: true,
          },
        ],
        setting: {
          limit_scan: 10,
          created_at: '2021-05-10 19:51:08',
          user_key:
            '010d608f95e9efb266dafd8f95eda72565afd4a104025c1e961658bd445da175',
          url: 'securitypitch.com',
          Type: 'domain',
          name: 'Security Pitch',
          updated_at: '2021-10-04 10:48:53',
          user_id: null,
          ObjectType: null,
          ObjectID: null,
          key: 'efda7169618cdab3d72f1bad610bd657bd1f232b8a4dbc80bbce35a6d3ebf260',
          ...previewDefaultSetting,
          ...setting,
          text,
        },
        data: previewNecessary,
      };

      const cookieNotice = new window.gdprCookieNotice(
        payload
      );
      cookieNotice.init();
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const setting = bannerPreview[domainId] as Record<
      string,
      unknown
    >;
    gdprCookieNotice(setting);
  }, [domainId, bannerPreview]);

  return (
    <>
      <Head>
        <title>Cookie Banner Preview</title>
        <script
          async
          src="https://cdn.onefence.co/onefence.banner.consent.min.js"
        ></script>
      </Head>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#CCD6E0',
        }}
      />
    </>
  );
};

export default PreviewBannerPage;
