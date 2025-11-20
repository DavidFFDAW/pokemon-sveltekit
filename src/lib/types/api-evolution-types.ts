import type { ApiNamedResource } from "./api-types"

export interface EvolutionResponse {
  baby_trigger_item: any
  chain: EvolutionChain
  id: number
}

export interface EvolutionChain {
  evolution_details: EvolutionDetail[]
  evolves_to: EvolutionChain[]
  is_baby: boolean
  species: ApiNamedResource
}

export interface EvolutionDetail {
	gender: number;
	held_item: ApiNamedResource;
	item: ApiNamedResource;
	known_move: ApiNamedResource;
	known_move_type: ApiNamedResource;
	location: ApiNamedResource;
	min_affection: number;
	min_beauty: number;
	min_happiness: number;
	min_level: number;
	needs_overworld_rain: boolean;
	party_species: ApiNamedResource;
	party_type: ApiNamedResource;
	relative_physical_stats: number;
	time_of_day: string;
	trade_species: ApiNamedResource;
	trigger: ApiNamedResource
	turn_upside_down: boolean
}

export interface ParsedEvolutionItem {
  id: number;
  name: string;
  image: string;
  methods: EvolutionDetail[];
}