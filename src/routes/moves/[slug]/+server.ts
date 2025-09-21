import { getParsedPokemonMovePool } from '$lib/utils/moves.utils.js';

export const GET = async ({ params }) => {
	const { slug } = params;
    if (!slug) return new Response(JSON.stringify({ error: 'No slug provided' }), { status: 400 });

	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
		const pokeData = await response.json();
		const moves = getParsedPokemonMovePool(pokeData.moves);

		return new Response(JSON.stringify(moves));
	} catch (error) {
        console.log('Error fetching moves:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch moves' }), { status: 500 });
	}
};
