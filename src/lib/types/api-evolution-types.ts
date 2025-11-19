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
  base_form_id: any
  gender: any
  held_item: any
  item: any
  known_move: any
  known_move_type: any
  location: any
  min_affection: any
  min_beauty: any
  min_happiness: any
  min_level: number
  needs_overworld_rain: boolean
  party_species: any
  party_type: any
  region_id: any
  relative_physical_stats: any
  time_of_day: string
  trade_species: any
  trigger: ApiNamedResource
  turn_upside_down: boolean
}

export interface ParsedEvolutionItem {
  id: number;
  name: string;
  image: string;
  methods: EvolutionDetail[];
}