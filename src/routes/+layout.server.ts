export const load = async ({ url, request }) => {
	const userAgent = request.headers.get('user-agent') || '';
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
	const isBot = /bot|crawler|spider|crawling/i.test(userAgent);


	return {
		layout: {
			path: url.pathname,
			origin: url.origin,
			canonical: url.href,
			user_agent: userAgent,
			is_mobile: isMobile,
			is_bot: isBot
		}
	};
};