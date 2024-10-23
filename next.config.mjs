/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        //domains: ['placehold.co', 'plus.unsplash.com', 'images.unsplash.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'www.cm-oliveiradohospital.pt',
            },
            {
                protocol: 'https',
                hostname: 'content.wepik.com',
            },

        ],
    }
};

export default nextConfig;
