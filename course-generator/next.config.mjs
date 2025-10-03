// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images:{
//         domains:['img.clerk.com']
//     }
// };
//
// export default nextConfig;
//

/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["img.clerk.com"],
	},
	serverExternalPackages: ["@clerk/backend"],
};

export default nextConfig;
