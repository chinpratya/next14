import Head from 'next/head';

export type SeoProps = {
  title?: string;
};

export const Seo = ({
  title = 'Security & Privacy Combined',
}: SeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:locale" content="en_TH" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="OneFence | Security & Privacy Combined"
      />
      <meta
        property="og:description"
        content="Founded under Security Pitch, OneFence is the solution to your security and privacy.  Its first service is PDPA KiT, the service to help website owners to comply with Thailand's Personal Data Protection Act 2562 B.E. (2019)."
      />
      <meta
        property="og:url"
        content="https://app.onefence.co"
      />
      <meta
        property="og:site_name”"
        content="onefence.co"
      />
      <meta property="og:image" content="/img/logo.png" />
    </Head>
  );
};
