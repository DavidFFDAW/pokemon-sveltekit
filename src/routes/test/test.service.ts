// src/lib/poke/fetchEvolutionTree.ts
export type EvolutionDetailRaw = {
  trigger: { name: string; url: string };
  min_level: number | null;
  item: { name: string; url: string } | null;
  held_item: { name: string; url: string } | null;
  known_move: { name: string; url: string } | null;
  known_move_type: { name: string; url: string } | null;
  location: { name: string; url: string } | null;
  gender: number | null; // 1=female,2=male (PokeAPI)
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  needs_overworld_rain: boolean;
  party_species: { name: string; url: string } | null;
  party_type: { name: string; url: string } | null;
  relative_physical_stats: number | null; // -1 <, 0 =, 1 >
  time_of_day: string; // "day" | "night" | ""
  trade_species: { name: string; url: string } | null;
  turn_upside_down: boolean;
};

export type ChainLinkRaw = {
  is_baby: boolean;
  species: { name: string; url: string };
  evolves_to: ChainLinkRaw[];
  evolution_details: EvolutionDetailRaw[];
};

export type EvolutionChainRaw = {
  id: number;
  chain: ChainLinkRaw;
};

export type EvolutionCondition = {
  trigger: string;             // "level-up" | "use-item" | "trade" ...
  minLevel?: number;
  item?: string;
  heldItem?: string;
  knownMove?: string;
  knownMoveType?: string;
  location?: string;
  gender?: "male" | "female";
  minAffection?: number;
  minBeauty?: number;
  minHappiness?: number;
  needsOverworldRain?: boolean;
  partySpecies?: string;
  partyType?: string;
  relativePhysicalStats?: -1 | 0 | 1;
  timeOfDay?: string;          // "" | "day" | "night"
  tradeSpecies?: string;
  turnUpsideDown?: boolean;
};

export type EvolutionNode = {
  speciesId: number;
  speciesName: string;
  isBaby: boolean;
  evolutions: Array<{
    to: EvolutionNode;
    details: EvolutionCondition[]; // varios métodos alternativos
  }>;
};

const API = "https://pokeapi.co/api/v2";

function idFromUrl(url: string): number {
  const parts = url.replace(/\/+$/, "").split("/");
  return Number(parts[parts.length - 1]);
}

function simplifyDetail(d: EvolutionDetailRaw): EvolutionCondition {
  const gender = d.gender === 1 ? "female" : d.gender === 2 ? "male" : undefined;
  return {
    trigger: d.trigger?.name ?? "",
    minLevel: d.min_level ?? undefined,
    item: d.item?.name ?? undefined,
    heldItem: d.held_item?.name ?? undefined,
    knownMove: d.known_move?.name ?? undefined,
    knownMoveType: d.known_move_type?.name ?? undefined,
    location: d.location?.name ?? undefined,
    gender,
    minAffection: d.min_affection ?? undefined,
    minBeauty: d.min_beauty ?? undefined,
    minHappiness: d.min_happiness ?? undefined,
    needsOverworldRain: d.needs_overworld_rain || undefined,
    partySpecies: d.party_species?.name ?? undefined,
    partyType: d.party_type?.name ?? undefined,
    relativePhysicalStats: (d.relative_physical_stats ?? undefined) as -1 | 0 | 1 | undefined,
    timeOfDay: d.time_of_day || undefined,
    tradeSpecies: d.trade_species?.name ?? undefined,
    turnUpsideDown: d.turn_upside_down || undefined,
  };
}

function mapChain(link: ChainLinkRaw): EvolutionNode {
  const node: EvolutionNode = {
    speciesId: idFromUrl(link.species.url),
    speciesName: link.species.name,
    isBaby: link.is_baby,
    evolutions: [],
  };

  for (const child of link.evolves_to) {
    node.evolutions.push({
      to: mapChain(child),
      details: (child.evolution_details ?? []).map(simplifyDetail),
    });
  }
  return node;
}

export async function fetchEvolutionTree(
  speciesNameOrId: string | number
): Promise<EvolutionNode> {
  const speciesRes = await fetch(`${API}/pokemon-species/${speciesNameOrId}`);
  if (!speciesRes.ok) {
    throw new Error(`No se pudo obtener species '${speciesNameOrId}': ${speciesRes.status}`);
  }
  const speciesJson = await speciesRes.json();
  const chainUrl: string | undefined = speciesJson?.evolution_chain?.url;

  if (!chainUrl) {
    return {
      speciesId: idFromUrl(speciesJson.url),
      speciesName: speciesJson.name,
      isBaby: !!speciesJson.is_baby,
      evolutions: [],
    };
  }

  const chainRes = await fetch(chainUrl);
  if (!chainRes.ok) {
    throw new Error(`No se pudo obtener evolution_chain para '${speciesNameOrId}': ${chainRes.status}`);
  }
  const chainJson = (await chainRes.json()) as EvolutionChainRaw;
  return mapChain(chainJson.chain);
}