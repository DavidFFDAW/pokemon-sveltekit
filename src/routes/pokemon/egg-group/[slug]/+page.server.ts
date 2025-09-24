import ApiPokemon from '$lib/services/api.pokemon.service.js';
import { LocalPokemon } from '$lib/services/local.pokemon.service.js';
import type { ApiNamedResource } from '$lib/types/api-types.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const { slug } = params;
	if (!slug) return redirect(302, '/egg-group');

	const apiEggGroup = await ApiPokemon.getEggGroup(slug);
	if (!apiEggGroup.response.ok) return redirect(302, '/egg-group');

	const pokemonsInGroup = apiEggGroup.data.pokemon_species.map((poke: ApiNamedResource) => poke.name);
	const groupPokemons = LocalPokemon.getAllPokemons().filter(
		(poke) => pokemonsInGroup.includes(poke.name)
	);
	return {
		eggGroup: apiEggGroup.data,
		pokemons: groupPokemons
	};
}