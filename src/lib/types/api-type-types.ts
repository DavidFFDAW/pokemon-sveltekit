import type { ApiNamedResource } from "./api-types"

export interface ApiTypeResponse {
  damage_relations: ApiDamageRelations
  game_indices: ApiIndex[]
  generation: ApiNamedResource
  id: number
  move_damage_class: ApiNamedResource
  moves: ApiNamedResource[]
  name: string
  names: ApiName[]
  past_damage_relations: ApiPastDamageRelation[]
  pokemon: ApiPokemon[]
  sprites: any
}

export interface ApiDamageRelations {
  double_damage_from: ApiNamedResource[]
  double_damage_to: ApiNamedResource[]
  half_damage_from: ApiNamedResource[]
  half_damage_to: ApiNamedResource[]
  no_damage_from: ApiNamedResource[]
  no_damage_to: ApiNamedResource[]
}

export interface ApiIndex {
  game_index: number
  generation: ApiNamedResource
}

export interface ApiName {
  language: ApiNamedResource
  name: string
}

export interface ApiPastDamageRelation {
  damage_relations: ApiDamageRelations
  generation: ApiNamedResource
}

export interface ApiPokemon {
  pokemon: ApiNamedResource
  slot: number
}

