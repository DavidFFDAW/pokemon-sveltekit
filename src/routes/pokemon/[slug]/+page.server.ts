import { PokeTypes } from '$lib/constant/types.js';
import type { ApiPokemonResponse } from '$lib/types/api-types.js';
import { getShinyProbability } from '$lib/utils/general.utils.js';
import { getParsedPokemonMovePool } from '$lib/utils/moves.utils.js';
import { getTypeEffectiveness } from '$lib/utils/types.utils.js';

export const load = async ({ params }) => {
	const pokemon = params.slug;
	if (!pokemon) throw new Error('Pokemon not found');

	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	if (!response.ok) throw new Error('Pokemon not found');

	const pokemonData = await response.json() as ApiPokemonResponse;
	const specie = await fetch(pokemonData.species.url).then(res => res.json());

	const evoChain = await fetch(specie.evolution_chain.url).then(res => res.json());
	const genus = specie.genera.find((g: any) => g.language.name === 'es');

	// Obtener las estadísticas
	const stats = pokemonData.stats.reduce((carry: { [key: string]: number }, stat: any) => {
		carry[stat.stat.name.toLowerCase()] = stat.base_stat;
		return carry;
	}, {});
	stats['total'] = pokemonData.stats.reduce((sum: number, stat: any) => sum + stat.base_stat, 0);

	const labels = pokemonData.stats.map((stat: any) => stat.stat.name.toUpperCase());
	const speciesName = pokemonData.species.name;
	const types = pokemonData.types.map((t: any) => ({
		slug: t.type.name,
		name: PokeTypes[t.type.name] || t.type.name
	}));

	return {
		stats,
		labels,
		genus,
		specie,
		pokemon: pokemonData,
		shiny: getShinyProbability(),
		types: types,
		typeRelations: getTypeEffectiveness(types.map(t => t.slug)),
		parsed_moves: getParsedPokemonMovePool(pokemonData.moves),
		evoChain,
		metas: {
			title: speciesName.charAt(0).toUpperCase() + speciesName.slice(1),
			description: genus ? `${genus.genus}` : 'Pokémon information',
			image: pokemonData.sprites.other['home'].front_default || '/favicon.png',
			favicon: pokemonData.sprites.front_default || '/favicon.png',
		}
	};
};
