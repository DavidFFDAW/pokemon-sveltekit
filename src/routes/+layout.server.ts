export const load = async ({ url, request }) => {
	const userAgent = request.headers.get('user-agent') || '';
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
	const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
    const canonical = url.href.split('?')[0].split('#')[0].toLowerCase();

	return {
		layout: {
			path: url.pathname,
			origin: url.origin,
			canonical: canonical,
			user_agent: userAgent,
			is_mobile: isMobile,
			is_bot: isBot
		}
	};
};