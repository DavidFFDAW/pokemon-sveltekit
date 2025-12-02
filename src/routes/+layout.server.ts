export interface Breadcrumb {
	name: string;
	slug: string;
	path: string;
}

const getRouteSlug = (routeId: string | null) => {
	if (!routeId) return 'home';
	if (routeId === '/') return 'home';
	return routeId.replace(/\+/g, '').replace(/\//g, '-').replace(/\[|\]/g, '').replace(/^-+|-+$/g, '').toLowerCase();
}

const get_breadcrumbs = (routeId: string | null) => {
	if (!routeId || routeId === '/') return [{ name: 'Home', slug: 'home', path: '/' }];
	return routeId.split('/').filter(Boolean).reduce((acc, segment, index, arr) => {
		const name = segment.replace(/\+/g, '').replace(/\[|\]/g, '') || 'home';
		const slug = name.toLowerCase();
		const path = '/' + arr.slice(0, index + 1).join('/');
		acc = [...acc, { name, slug, path }];
		return acc;
	}, [] as Breadcrumb[]);
};


export const load = async ({ url, request, route }) => {
	const userAgent = request.headers.get('user-agent') || '';
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
	const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
	const canonical = url.href.split('?')[0].split('#')[0].toLowerCase();
	

	return {
		layout: {
			path: url.pathname,
			origin: url.origin,
			canonical: canonical,
			route: getRouteSlug(route.id),
			breadcrumbs: get_breadcrumbs(route.id),
			user_agent: userAgent,
			is_mobile: isMobile,
			is_bot: isBot
		}
	};
};