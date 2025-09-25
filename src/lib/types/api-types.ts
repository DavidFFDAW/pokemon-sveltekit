export interface ApiListingResponse<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

export interface ApiNamedResource {
	name: string;
	url: string;
}

export interface ApiPokemonResponse {
	abilities: Ability[];
	base_experience: number;
	cries: Cries;
	forms: ApiNamedResource[];
	game_indices: Index[];
	height: number;
	held_items: any[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: ApiPokeMoves[];
	name: string;
	order: number;
	past_abilities: PastAbility[];
	past_types: PastType[];
	species: ApiNamedResource;
	sprites: ApiPokeSprites;
	stats: ApiPokeStats[];
	types: ApiPokeType[];
	weight: number;
}

export interface ApiPokeStats {
	base_stat: number;
	effort: number;
	stat: ApiNamedResource;
}

export interface Ability {
	ability: ApiNamedResource;
	is_hidden: boolean;
	slot: number;
}

export interface Cries {
	latest: string;
	legacy: string;
}

export interface Index {
	game_index: number;
	version: ApiNamedResource;
}

export interface ApiPokeMoves {
	move: ApiNamedResource;
	version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
	level_learned_at: number;
	move_learn_method: ApiNamedResource;
	version_group: ApiNamedResource;
	order?: number;
}

export interface PastAbility {
	abilities: ApiNamedResource[];
	generation: ApiNamedResource;
}

export interface PastType {
	generation: ApiNamedResource;
	types: ApiPokeType[];
}

export interface ApiPokeType {
	slot: number;
	type: ApiNamedResource;
}

export interface ApiPokeSprites {
	back_default: string;
	back_female: string | null;
	back_shiny: string;
	back_shiny_female: string | null;
	front_default: string;
	front_female: string | null;
	front_shiny: string;
	front_shiny_female: string | null;
	other: Other;
}

export interface Other {
	dream_world: {
		front_default: string;
		front_female: string | null;
	};
	home: {
		front_default: string;
		front_female: string | null;
		front_shiny: string;
		front_shiny_female: string | null;
	};
	'official-artwork': {
		front_default: string;
		front_shiny: string;
	};
	showdown: {
		back_default: string;
		back_female: any;
		back_shiny: string;
		back_shiny_female: any;
		front_default: string;
		front_female: any;
		front_shiny: string;
		front_shiny_female: any;
	};
}

export interface ApiMoveResponse {
  accuracy: number
  contest_combos: ContestCombos
  contest_effect: ContestEffect
  contest_type: ApiNamedResource
  damage_class: ApiNamedResource
  effect_chance: any
  effect_changes: any[]
  effect_entries: EffectEntry[]
  flavor_text_entries: FlavorTextEntry[]
  generation: ApiNamedResource
  id: number
  learned_by_pokemon: ApiNamedResource[]
  machines: any[]
  meta: Meta
  name: string
  names: Name[]
  past_values: PastValue[]
  power: number
  pp: number
  priority: number
  stat_changes: any[]
  super_contest_effect: SuperContestEffect
  target: ApiNamedResource
  type: ApiNamedResource
}

export interface ContestCombos {
  normal: ApiNormalOrSuper
  super: ApiNormalOrSuper
}

export interface ApiNormalOrSuper {
  use_after: ApiNamedResource[]
  use_before: ApiNamedResource[]
}

export interface ContestEffect {
  url: string
}


export interface EffectEntry {
  effect: string
  language: ApiNamedResource
  short_effect: string
}

export interface FlavorTextEntry {
  flavor_text: string
  language: ApiNamedResource
  version_group: ApiNamedResource
}

export interface Meta {
  ailment: ApiNamedResource;
  ailment_chance: number;
  category: ApiNamedResource;
  crit_rate: number;
  drain: number;
  flinch_chance: number;
  healing: number;
  max_hits: any;
  max_turns: any;
  min_hits: any;
  min_turns: any;
  stat_chance: number;
}

export interface Name {
  language: ApiNamedResource;
  name: string;
}

export interface PastValue {
  accuracy?: number
  effect_chance: any
  effect_entries: any[]
  power: number
  pp: any
  type: any
  version_group: ApiNamedResource
}

export interface SuperContestEffect {
  url: string
}