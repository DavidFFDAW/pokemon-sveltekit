import paldeaDex from '$lib/data/games-pokedex/paldea.json';
import { LocalPokemon } from '$lib/services/local.pokemon.service';
// import ApiPokemon from '$lib/services/api.pokemon.service';
// import { catchError } from '$lib/utils/general.utils';
// import { redirect } from '@sveltejs/kit';
// import ApiPokemon from '$lib/services/api.pokemon.service';
// import { LocalPokemon } from '$lib/services/local.pokemon.service';
// import { catchError } from '$lib/utils/general.utils';
// import { redirect } from '@sveltejs/kit';

export const load = (async () => {
	const localPokemons = LocalPokemon.getAllPokemons();
	const pokemons = paldeaDex.map(pokemon => {
		return localPokemons.find(p => p.species === pokemon.name.toLowerCase());
	}).filter(Boolean)

	console.log(pokemons);
	
	

	
	return {
		pokemons: pokemons,
		metas: {
			title: 'Paldea',
			description: 'Consulta la Pokédex de Paldea (solo el juego base).',
		}
	};
});