import moves from '$lib/data/moves.json';
import type { ApiPokeMoves } from '$lib/types/api-types';
import type { ParsedPokemonMove } from '$lib/types/types';

export const getMoveDetails = (move: string) => {
	const base = {
		name: '',
		type: '',
		power: '',
		attackType: '',
		pp: '',
		accuracy: '',
		effect: '',
	};
	if (!move) return base;
    const foundMove = Object.entries(moves).find(([key]) => key.toLowerCase() === move.toLowerCase())?.[1];
	if (foundMove) return foundMove;
	return base;
}

export const getParsedPokemonMovePool = (pokemonMovePool: ApiPokeMoves[]) => {
	const versions = Array.from(pokemonMovePool.reduce((acc, move) => {
		const { version_group_details } = move;

		version_group_details.forEach((detail) => {
			acc.add(detail.version_group.name);
		});

		return acc;
	}, new Set()));

	const parsedMovePool = pokemonMovePool
		.reduce((acc: ParsedPokemonMove[], move) => {
			const { version_group_details } = move;

			version_group_details.forEach((detail) => {
				acc.push({
					move: move.move.name,
					moveData: getMoveDetails(move.move.name),
					version: detail.version_group.name,
					level_learned_at: detail.level_learned_at,
					level_learning_method:
						detail.move_learn_method.name,
				});
			});

			return acc;
		}, [])
		.sort((a: any, b: any) => a.level_learned_at - b.level_learned_at)
		.sort((a: any, b: any) =>
			a.level_learning_method.localeCompare(
				b.level_learning_method
			)
	);

	return { versions, parsedMovePool };
};
