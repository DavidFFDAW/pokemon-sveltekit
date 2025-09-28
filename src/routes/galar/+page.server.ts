import pokemon from '$lib/data/games-pokedex/galar.json';
import ApiPokemon from '$lib/services/api.pokemon.service';
import { LocalPokemon } from '$lib/services/local.pokemon.service';
import { catchError } from '$lib/utils/general.utils';
import { redirect } from '@sveltejs/kit';

export async function load() {
    const localPokemons = LocalPokemon.getAllPokemons();
    const [pokedex, error] = await catchError(ApiPokemon.getPokedexByRegion('galar'));
    if (error) return redirect(307, '/pokemon/list');

    const pokedexPokemonNames = pokedex.data.pokemon_entries.map((entry: any) => entry.pokemon_species.name);
    const pokemons = localPokemons.filter(p => pokedexPokemonNames.includes(p.name));

	return {
		pokemons: pokemons,
        metas: {
            title: `Galar - ${pokemon.length} Pokémon`,
            description: `Consulta la Pokédex de la región de Galar con ${pokemon.length} Pokémon.`,
            image: 'https://i.blogs.es/832fa3/72542663_2645889782116067_7387619726538571776_o/840_560.jpeg',
            favicon: 'https://swordshield.pokemon.com/assets/img/articles/pokemon_galar_zigzagoon_hover.png',
        }
	};
}