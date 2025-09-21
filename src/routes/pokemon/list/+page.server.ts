import { LocalPokemon } from '$lib/services/local.pokemon.service.js';

export const load = async ({ url }) => {
    const p: string = '';
    const POKEMON_PER_PAGE = 20;
	const searchName = url.searchParams.get('search')?.toLowerCase().trim();
	const baseList = searchName
		? LocalPokemon.getSearchPokemonByName(searchName)
		: LocalPokemon.getRandomPokemonList();
	
	const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pokeList = LocalPokemon.paginate(baseList, page, POKEMON_PER_PAGE);
	
	return {
		pokemons: pokeList,
		search: {
			hasSearch: url.searchParams.has('name'),
			name: searchName ? searchName.toLowerCase() : null
		},
		metas: {
			title: searchName ? `Busqueda ${searchName}` : 'Listado',
		}
	};
};
