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
  // La homepage è ora una pagina Next (src/app/page.tsx).
  // La landing originale resta consultabile come file statico: /hotel-contentmug.html
};

export default nextConfig;
