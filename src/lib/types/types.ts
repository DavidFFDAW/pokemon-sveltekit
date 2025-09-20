export interface PokeMove {
	name: string;
	type: string;
	power: string;
	attackType: string;
	pp: string;
	accuracy: string;
	effect: string;
}

export interface ParsedPokemonMove {
	move: string;
	moveData: PokeMove;
	version: string;
	level_learned_at: number;
	level_learning_method: string;
}

export interface PokeStats {
	hp: number;
	attack: number;
	defense: number;
	"special-attack": number;
	"special-defense": number;
	speed: number;
	total: number;
}