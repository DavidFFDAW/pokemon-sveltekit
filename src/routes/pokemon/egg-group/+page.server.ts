import ApiPokemon from "$lib/services/api.pokemon.service";
import { redirect } from "@sveltejs/kit";

export async function load() {
	const response = await ApiPokemon.getEggGroups();
	if (!response.ok) return redirect(302, '/');

	return {
		metas: {
			title: 'Grupos Huevo',
			description: 'Lista de todos los grupos huevo de Pokémon',
		},
		eggGroups: response.data.results
	};
}