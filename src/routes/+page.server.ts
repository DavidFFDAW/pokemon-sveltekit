import { LocalPokemon } from "$lib/services/local.pokemon.service";

export async function load() {
	const randomPokemon = LocalPokemon.getRandomPokemon();
	return { 
        random_pokemon: randomPokemon,
        metas: {
            image: randomPokemon?.image,
        }
    };
}