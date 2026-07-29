import ApiPokemon from "$lib/services/api.pokemon.service";
import type { ApiNamedResource } from "$lib/types/api-types";

interface ApiPokeRegion {
    results: ApiNamedResource[];
}

export const load = async () => {
    const regionsResponse = await ApiPokemon.getApiData<ApiPokeRegion>("region?limit=1000");

    return {
        regions: regionsResponse.data.results,
        metas: {
            title: "Regiones de Pokémon",
            description: "Consulta las diferentes regiones del mundo Pokémon y sus respectivas Pokédex."
        },
    };
}