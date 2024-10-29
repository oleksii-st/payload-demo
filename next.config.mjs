import { withPayload } from '@payloadcms/next/withPayload';

const url = new URL(process.env.NEXT_PUBLIC_SITEMAP_URL || "http://localhost:3000");

const protocol = url.protocol.substring(0, url.protocol.length - 1);

const config = {
  images: {
    deviceSizes: [360, 393, 414, 575, 767, 991, 1199, 1440, 1600, 1920],
    imageSizes: [130, 170, 200, 260, 360, 393, 414, 575, 767, 991, 1199, 1440, 1600, 1920, 180, 197, 207, 288, 384, 340, 496, 600, 720, 800, 960],
    remotePatterns: [
      {
        protocol: protocol,
        hostname: url.hostname,
        port: url.port,
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    reactCompiler: true,
  },
};

export default withPayload(config);
