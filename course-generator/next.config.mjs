/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['img.clerk.com'],
	},
	experimental: {
		serverComponentsExternalPackages: [
			'@clerk/shared',
		],
	},
}

export default nextConfig
