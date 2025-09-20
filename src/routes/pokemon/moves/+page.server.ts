import type { ParsedPokemonMove, PokeMove } from '$lib/types/types.js';
import { getMoveDetails } from '$lib/utils/moves.utils.js';

export const load = async ({ url }) => {
	const search = url.searchParams.get('pokemon');
	if (!search) return { moves: [], versions: [], pokemon: '' };

	const parsedSearch = search.trim().toLowerCase().replace(/ /g, '-');
	const movesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${parsedSearch}`);
	if (!movesResponse.ok) return { moves: [], versions: [], pokemon: '' };
	
	const movesResponseContent = await movesResponse.json();
	const pokemonMovePool = movesResponseContent.moves;	

	const versions = Array.from(pokemonMovePool.reduce((accumulator: Set<string>, move: { version_group_details: { version_group: { name: string; }; }[]; }) => {
		const { version_group_details } = move;

		version_group_details.forEach((detail: { version_group: { name: string; }; }) => {
			accumulator.add(detail.version_group.name);
		});

		return accumulator;
	}, new Set()));

	const parsedMovePool = pokemonMovePool.reduce((acc: ParsedPokemonMove[], move: { move: { name: string; }; version_group_details: { version_group: { name: string; }; level_learned_at: number; move_learn_method: { name: string; }; }[]; }) => {
		const { version_group_details } = move;

		version_group_details.forEach((detail: { version_group: { name: string; }; level_learned_at: number; move_learn_method: { name: string; }; }) => {
			acc.push({
				move: move.move.name,
				moveData: getMoveDetails(move.move.name) as PokeMove,
				version: detail.version_group.name,
				level_learned_at: detail.level_learned_at,
				level_learning_method: detail.move_learn_method.name,
			});
		});

		return acc;
	}, [])
		.sort((a: ParsedPokemonMove, b: ParsedPokemonMove) => a.level_learned_at - b.level_learned_at)
		.sort((a: ParsedPokemonMove, b: ParsedPokemonMove) => a.level_learning_method.localeCompare(b.level_learning_method));

	return { moves: parsedMovePool, versions, pokemon: parsedSearch };
};
