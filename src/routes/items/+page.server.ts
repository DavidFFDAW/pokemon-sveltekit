import items from '$lib/data/items.json';
const ITEMS_PER_PAGE = 15;

export function load({ url }) {
    const searchParams = url.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);

    const offset = (page - 1) * ITEMS_PER_PAGE;
    const pokeitems = Object.values(items);

    return {
        page,
        perPage: ITEMS_PER_PAGE,
        items: pokeitems.length,
        total: Math.ceil(pokeitems.length / ITEMS_PER_PAGE),
        pokeitems: pokeitems.slice(offset, offset + ITEMS_PER_PAGE),
        hasNextPage: offset + ITEMS_PER_PAGE < pokeitems.length
    };
}