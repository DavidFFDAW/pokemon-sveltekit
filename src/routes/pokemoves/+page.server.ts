import { LocalPokemon } from '$lib/services/local.pokemon.service';

export function load() {
	const pokemons = LocalPokemon.getAllPokemons();

	return {
        pokemons,
		metas: {
			title: 'Movimientos',
			description: 'Listado de movimientos de Pokémon'
		}
	};
}
