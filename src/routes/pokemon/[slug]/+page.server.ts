import { PokeTypes } from '$lib/constant/types.js';
import type { ApiPokemonResponse } from '$lib/types/api-types.js';
import type { PokeStats } from '$lib/types/types.js';
import { getShinyProbability } from '$lib/utils/general.utils.js';
import { getParsedPokemonMovePool } from '$lib/utils/moves.utils.js';
import { getTypeEffectiveness } from '$lib/utils/types.utils.js';

const typeColorDictionary: Record<
	string,
	{ backgroundColor: string; borderColor: string; pointBackgroundColor: string }
> = {
	psychic: {
		backgroundColor: 'rgba(255, 99, 132, 0.2)',
		borderColor: 'rgba(255, 99, 132, 1)',
		pointBackgroundColor: 'rgba(255, 99, 132, 1)'
	},
	rock: {
		backgroundColor: 'rgba(255, 159, 64, 0.2)',
		borderColor: 'rgba(255, 159, 64, 1)',
		pointBackgroundColor: 'rgba(255, 159, 64, 1)'
	},
	normal: {
		backgroundColor: 'rgba(168, 168, 120, 0.2)',
		borderColor: 'rgba(168, 168, 120, 1)',
		pointBackgroundColor: 'rgba(168, 168, 120, 1)'
	},
	fire: {
		backgroundColor: 'rgba(240, 128, 48, 0.2)',
		borderColor: 'rgba(240, 128, 48, 1)',
		pointBackgroundColor: 'rgba(240, 128, 48, 1)'
	},
	water: {
		backgroundColor: 'rgba(104, 144, 240, 0.2)',
		borderColor: 'rgba(104, 144, 240, 1)',
		pointBackgroundColor: 'rgba(104, 144, 240, 1)'
	},
	electric: {
		backgroundColor: 'rgba(248, 208, 48, 0.2)',
		borderColor: 'rgba(248, 208, 48, 1)',
		pointBackgroundColor: 'rgba(248, 208, 48, 1)'
	},
	grass: {
		backgroundColor: 'rgba(120, 200, 80, 0.2)',
		borderColor: 'rgba(120, 200, 80, 1)',
		pointBackgroundColor: 'rgba(120, 200, 80, 1)'
	},
	ice: {
		backgroundColor: 'rgba(152, 216, 216, 0.2)',
		borderColor: 'rgba(152, 216, 216, 1)',
		pointBackgroundColor: 'rgba(152, 216, 216, 1)'
	},
	fighting: {
		backgroundColor: 'rgba(192, 48, 40, 0.2)',
		borderColor: 'rgba(192, 48, 40, 1)',
		pointBackgroundColor: 'rgba(192, 48, 40, 1)'
	},
	poison: {
		backgroundColor: 'rgba(160, 64, 160, 0.2)',
		borderColor: 'rgba(160, 64, 160, 1)',
		pointBackgroundColor: 'rgba(160, 64, 160, 1)'
	},
	ground: {
		backgroundColor: 'rgba(224, 192, 104, 0.2)',
		borderColor: 'rgba(224, 192, 104, 1)',
		pointBackgroundColor: 'rgba(224, 192, 104, 1)'
	},
	flying: {
		backgroundColor: 'rgba(168, 144, 240, 0.2)',
		borderColor: 'rgba(168, 144, 240, 1)',
		pointBackgroundColor: 'rgba(168, 144, 240, 1)'
	},
	bug: {
		backgroundColor: 'rgba(168, 184, 32, 0.2)',
		borderColor: 'rgba(168, 184, 32, 1)',
		pointBackgroundColor: 'rgba(168, 184, 32, 1)'
	},
	ghost: {
		backgroundColor: 'rgba(112, 88, 152, 0.2)',
		borderColor: 'rgba(112, 88, 152, 1)',
		pointBackgroundColor: 'rgba(112, 88, 152, 1)'
	},
	dragon: {
		backgroundColor: 'rgba(112, 56, 248, 0.2)',
		borderColor: 'rgba(112, 56, 248, 1)',
		pointBackgroundColor: 'rgba(112, 56, 248, 1)'
	},
	dark: {
		backgroundColor: 'rgba(112, 88, 72, 0.2)',
		borderColor: 'rgba(112, 88, 72, 1)',
		pointBackgroundColor: 'rgba(112, 88, 72, 1)'
	},
	steel: {
		backgroundColor: 'rgba(184, 184, 208, 0.2)',
		borderColor: 'rgba(184, 184, 208, 1)',
		pointBackgroundColor: 'rgba(184, 184, 208, 1)'
	},
	fairy: {
		backgroundColor: 'rgba(238, 153, 172, 0.2)',
		borderColor: 'rgba(238, 153, 172, 1)',
		pointBackgroundColor: 'rgba(238, 153, 172, 1)'
	}
};

export const load = async ({ params }) => {
	const pokemon = params.slug;
	if (!pokemon) throw new Error('Pokemon not found');

	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	if (!response.ok) throw new Error('Pokemon not found');

	const pokemonData = await response.json() as ApiPokemonResponse;
	const specie = await fetch(pokemonData.species.url).then(res => res.json());
	const pokeType = pokemonData.types[0].type.name;
	const colors = typeColorDictionary[pokeType] || typeColorDictionary['normal'];
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
		colors,
		specie,
		pokemon: pokemonData,
		shiny: getShinyProbability(),
		types: types,
		typeRelations: getTypeEffectiveness(types.map(t => t.slug)),
		parsed_moves: getParsedPokemonMovePool(pokemonData.moves),
		metas: {
			title: speciesName.charAt(0).toUpperCase() + speciesName.slice(1),
			description: genus ? `${genus.genus} Pokémon` : 'Pokémon information',
			image: pokemonData.sprites.other['home'].front_default || '/favicon.png',
			favicon: pokemonData.sprites.front_default || '/favicon.png',
		}
	};
};
