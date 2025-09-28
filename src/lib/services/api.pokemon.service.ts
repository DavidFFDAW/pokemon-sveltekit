import type { ApiListingResponse, ApiNamedResource } from "$lib/types/api-types";
import { HttpService } from "./http.service";

export const POKEAPI = 'https://pokeapi.co/api/v2/';

export const ApiPokemon = {
	getList: async (limit = 10_000, offset = 0) => {
		const response = await fetch(`${POKEAPI}pokemon?limit=${limit}&offset=${offset}`);
		return { response, data: await response.json() }
	},
	get: async (endpoint: string) => {
		const response = await fetch(`${POKEAPI}pokemon/${endpoint}`);
		return { response, data: await response.json() }
	},
	getEggGroups: () => {
		return HttpService.get<ApiListingResponse<ApiNamedResource>>(`${POKEAPI}egg-group`);
	},
	getSingleEggGroup: async (slug: string) => {
		return HttpService.get<any>(`${POKEAPI}egg-group/${slug}`);
	},
	getPokedexByRegion: async (slug: string) => {
		return HttpService.get<any>(`${POKEAPI}pokedex/${slug}`);
	}
}
export default ApiPokemon