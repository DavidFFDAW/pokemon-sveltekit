export const Pokemon = {
	getList: async (limit = 10_000, offset = 0) => {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
		return { response, data: await response.json() }
	}
}
export default Pokemon