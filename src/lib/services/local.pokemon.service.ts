import pokemons from '$lib/data/pokemon.json';
import { getShinyProbability } from '$lib/utils/general.utils';

export const LocalPokemon = {
    getRandomPokemon: () => {
        const randomIndex = Math.floor(Math.random() * pokemons.length);
        const is_shiny = getShinyProbability();
        return { ...pokemons[randomIndex], is_shiny };
    },
    getRandomPokemonList: (count: number = 0) => {
        const shuffled = pokemons.sort(() => 0.5 - Math.random());
        const selected = count > 0 ? shuffled.slice(0, count) : shuffled;
        return selected.map(p => ({ ...p, is_shiny: getShinyProbability() }));
    },
    getSearchPokemonByName: (name: string) => {
        const filteredPokemons = pokemons.filter(p => p.name.includes(name));
        return filteredPokemons.map(p => ({ ...p, is_shiny: getShinyProbability() }));
    },
    paginate: (array: any[], page: number = 1, pageSize: number = 20) => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        return { 
            list: array.slice(start, end),
            total: array.length, 
            page, 
            limit: pageSize
        };
    }
};