import ApiPokemon from '$lib/services/api.pokemon.service';
import { LocalPokemon } from '$lib/services/local.pokemon.service';
import { catchError } from '$lib/utils/general.utils';
import { redirect } from '@sveltejs/kit';

const getPokedexesMap = (pokedexes: any[]) => {
    return new Map(pokedexes.map((p: any) => {
        const label = p.name.toLowerCase().replace(/-/g, ' ');
        return [p.name, { name: p.name, url: p.url, label: label }];
    }));
}

export async function load({ params }) {
    const [region, subregion] = params.rest.split('/');
    const localPokemons = LocalPokemon.getPokemonMap();
    const [regionData, dexError] = await catchError(ApiPokemon.getApiData<any>(`region/${region}`));
    if (dexError) return redirect(307, '/pokemon/list');

    const searchRegion = subregion || region;
    const pokedexes = getPokedexesMap(regionData.data.pokedexes);
    const pokedexUrl = pokedexes.has(searchRegion) ? pokedexes.get(searchRegion)?.url : regionData.data.pokedexes[0]?.url;
    if (!pokedexUrl) return redirect(307, '/pokemon/list');

    const [pokedex, error] = await catchError(ApiPokemon.getApiData<any>(pokedexUrl, true));
    if (error) return redirect(307, '/pokemon/list');

    const pokedexPokemonNames = pokedex.data.pokemon_entries.map((entry: any) => entry.pokemon_species.name);
    const pokemons = pokedexPokemonNames.map((name: string) => localPokemons[name]).filter(Boolean);
    const regionName = regionData.data.names.find((n: any) => n.language.name === 'en')?.name || region;
    const finalPokedexes = Array.from(pokedexes.entries()).map(([key, value]) => ({
        value: key,
        label: value.label,
        url: key === region ? `/pokedex/${region}` : `/pokedex/${region}/${key}`
    }))

    return {
        region,
        regionName,
        subregion: subregion || regionData.data.pokedexes[0]?.name,
        pokemons: pokemons,
        pokedexes: finalPokedexes,
        metas: {
            title: `Pokedex de ${regionName}`,
            description: `Consulta la Pokédex de la región de ${regionName} con ${pokemons.length} Pokémon.`,
        }
    }
}