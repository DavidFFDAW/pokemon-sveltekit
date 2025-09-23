import pokemon from '$lib/data/games-pokedex/galar.json';

export const load = (async () => {
	return {
		pokemons: pokemon
	};
});