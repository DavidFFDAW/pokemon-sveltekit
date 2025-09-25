import pokemons from '$lib/data/pokemon.json';
import { PokeTypes } from '$lib/constant/types.js';
import { getShinyProbability } from '$lib/utils/general.utils.js';
import { getParsedPokemonMovePool } from '$lib/utils/moves.utils.js';
import { getTypeEffectiveness } from '$lib/utils/types.utils.js';

const getPokemon = async (name: string) => {
	const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
	if (!pokemonResponse.ok) throw new Error('Pokemon not found');
	const pokemonData = await pokemonResponse.json();

	const pokemonSpeciesResponse = await fetch(pokemonData.species.url);
	if (!pokemonSpeciesResponse.ok) throw new Error('Pokemon species not found');
	const pokemonSpeciesData = await pokemonSpeciesResponse.json();

	const pokemonEvolutionResponse = await fetch(pokemonSpeciesData.evolution_chain.url);
	if (!pokemonEvolutionResponse.ok) throw new Error('Pokemon evolution not found');

	return {
		pokemon: pokemonData,
		specie: pokemonSpeciesData,
		evolution: await pokemonEvolutionResponse.json()
	}
}

export const load = async ({ params }) => {
	const pokemon = params.slug;
	if (!pokemon) throw new Error('Pokemon not found');

	const { pokemon: pokemonData, specie, evolution } = await getPokemon(pokemon);
	const genus = specie.genera.find((g: any) => g.language.name === 'es');
	const varietyNames = specie.varieties.map((v: any) => v.pokemon.name);
	const varieties = specie.varieties.length > 1 ? pokemons.filter(p => varietyNames.includes(p.name)) : [];

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
		varieties,
		pokemon: pokemonData,
		shiny: getShinyProbability(),
		types: types,
		typeRelations: getTypeEffectiveness(types.map((t: any) => t.slug)),
		parsed_moves: getParsedPokemonMovePool(pokemonData.moves),
		evolution,
		metas: {
			title: speciesName.charAt(0).toUpperCase() + speciesName.slice(1),
			description: genus ? `Página de detalle del pokémon ${speciesName}, el ${genus.genus}` : `Página de detalle del pokémon ${speciesName}`,
			image: pokemonData.sprites.other['home'].front_default || '/favicon.png',
			favicon: pokemonData.sprites.front_default || '/favicon.png',
		}
	};
};
