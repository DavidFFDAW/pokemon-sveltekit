import { LocalPokemon } from '$lib/services/local.pokemon.service';

export function load() {
	const pokemons = LocalPokemon.getAllPokemons();
    pokemons[0].is_shiny = true; // For testing purposes, make the first Pokemon shiny

	return {
        pokemons,
		metas: {
			title: 'Movimientos',
			description: 'Listado de movimientos de Pokémon'
		}
	};
}
