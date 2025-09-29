import { PokeTypes } from '$lib/constant/types.js';
import ApiPokemon from '$lib/services/api.pokemon.service';
import { LocalPokemon } from '$lib/services/local.pokemon.service.js';
import { catchError } from '$lib/utils/general.utils.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const { slug } = params;
    const [typeResponse, error] = await catchError(ApiPokemon.getTypeBySlug(slug));
    if (error) {
        console.error('Error fetching type data:', error);
        return redirect(302, '/pokemon');
    }

    const localPokemonDatas = LocalPokemon.getAllPokemons();
    const typePokemonNames = typeResponse.data.pokemon.map((p: any) => p.pokemon.name);
    const typePokemons = localPokemonDatas.filter(p => typePokemonNames.includes(p.name));
    const esType = PokeTypes[slug] || slug;

    return {
        esType,
        pokemons: typePokemons,
        apiResponse : typeResponse,
        metas: {
            title: `Tipo ${esType}`,
            description: `Lista de pokémons do tipo ${esType}`
        }
    };
}