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
	getEggGroup: async (slug: string) => {
		const response = await fetch(`${POKEAPI}egg-group/${slug}`);
		return { response, data: await response.json() }
	}
}
export default ApiPokemon