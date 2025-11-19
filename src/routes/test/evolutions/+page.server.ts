import { getEvolutionRoutesForSpecie } from "$lib/services/evolution.service"

export async function load() { 
	return {
		evolutions: await getEvolutionRoutesForSpecie('bulbasaur')
	};
}