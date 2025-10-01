// import paldeaDex from '$lib/data/games-pokedex/paldea.json';
import ApiPokemon from '$lib/services/api.pokemon.service';
import { LocalPokemon } from '$lib/services/local.pokemon.service';
import { catchError } from '$lib/utils/general.utils';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
	const localPokemons = LocalPokemon.getAllPokemons();
	const [pokedex, error] = await catchError(ApiPokemon.getPokedexByRegion('paldea'));
	if (error) return redirect(307, '/pokemon/list');

	const pokedexPokemonNames = pokedex.data.pokemon_entries.map((entry: any) => entry.pokemon_species.name);
	const pokemons = localPokemons.filter(p => pokedexPokemonNames.includes(p.name));
	
	return {
		pokemons: pokemons,
		metas: {
			title: 'Paldea',
			description: 'Consulta la Pokédex de Paldea (solo el juego base).',
		}
	};
});