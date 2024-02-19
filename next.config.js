const withBundleAnalyzer =
  require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'file-management-public.s3.amazonaws.com',
      'via.placeholder.com',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
