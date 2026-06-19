/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // gli upload immagini passano dai Server Actions: alziamo il limite del body
    serverActions: { bodySizeLimit: '10mb' },
  },
  images: {
    // immagini servite localmente da /public/uploads o remote (placeholder)
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  async rewrites() {
    return {
      // La homepage serve la landing originale "Hotel ContentMug" (file statico self-contained).
      beforeFiles: [{ source: '/', destination: '/hotel-contentmug.html' }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
