import ApiPokemon from '$lib/services/api.pokemon.service.js';
import { LocalPokemon } from '$lib/services/local.pokemon.service.js';
import type { ApiNamedResource } from '$lib/types/api-types.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const { slug } = params;
	if (!slug) return redirect(302, '/egg-group');

	const response = await ApiPokemon.getSingleEggGroup(slug);
	if (!response.ok) return redirect(302, '/egg-group');

	const pokemonsInGroup = response.data.pokemon_species.map((poke: ApiNamedResource) => poke.name);
	const groupPokemons = LocalPokemon.getAllPokemons().filter(
		(poke) => pokemonsInGroup.includes(poke.name)
	);

	return {
		metas: {
			title: `Grupo Huevo - ${response.data.name}`,
			description: `Lista de todos los pokémon que pertenecen al grupo huevo ${response.data.name}`,
		},
		eggGroup: response.data,
		pokemons: groupPokemons,
		isThereShiny: groupPokemons.some(p => p.is_shiny),
	};
}