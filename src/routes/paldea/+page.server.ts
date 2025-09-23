import paldeaDex from '$lib/data/games-pokedex/paldea.json';

export const load = (async () => {
	return {
		pokemons: paldeaDex
	};
});