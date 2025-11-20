import type { EvolutionChain, EvolutionDetail, EvolutionResponse } from '$lib/types/api-evolution-types';

export interface EvolutionNode {
	speciesId: number;
	speciesName: string;
	isBaby: boolean;
	evolutions: EvolutionEdge[];
}

export interface EvolutionEdge {
	to: EvolutionNode;
	details: any[];
}

export interface EvolutionRouteItem {
	id: number;
	name: string;
	image: string;
	methods: any[];
}

export interface EvolutionChainRaw {
	id: number;
	chain: EvolutionChain;
}
export type EvolutionRoute = EvolutionRouteItem[];

function spriteUrlFromId(id: number): string {
	// Puedes cambiar a otro set de sprites si quieres
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function idFromUrl(url: string): number {
	const parts = url.replace(/\/+$/, '').split('/');
	const last = parts[parts.length - 1];
	return Number(last);
}

function mapChain(link: EvolutionChain): EvolutionNode {
	const node: EvolutionNode = {
		speciesId: idFromUrl(link.species.url),
		speciesName: link.species.name,
		isBaby: link.is_baby,
		evolutions: []
	};

	for (const child of link.evolves_to) {
		node.evolutions.push({
			to: mapChain(child),
			details: child.evolution_details ?? []
		});
	}

	return node;
}

export async function fetchEvolutionTreeBySpecies(
	speciesNameOrId: string | number,
	fetchFn: typeof fetch = fetch
): Promise<EvolutionNode> {
	// 1) species -> evolution_chain
	const API = 'https://pokeapi.co/api/v2';
	const speciesRes = await fetchFn(`${API}/pokemon-species/${speciesNameOrId}`);
	if (!speciesRes.ok) {
		throw new Error(`No se pudo obtener species '${speciesNameOrId}': ${speciesRes.status}`);
	}

	const speciesJson = await speciesRes.json();
	const chainUrl: string | undefined = speciesJson?.evolution_chain?.url;

	// Pokémon sin cadena de evolución (no evoluciona)
	if (!chainUrl) {
		return {
			speciesId: idFromUrl(speciesJson.url),
			speciesName: speciesJson.name,
			isBaby: !!speciesJson.is_baby,
			evolutions: []
		};
	}

	// 2) evolution_chain -> árbol
	const chainRes = await fetchFn(chainUrl);
	if (!chainRes.ok) {
		throw new Error(
			`No se pudo obtener evolution_chain para '${speciesNameOrId}': ${chainRes.status}`
		);
	}

	const chainJson = (await chainRes.json()) as EvolutionChainRaw;
	return mapChain(chainJson.chain);
}

export function transformEvolutionChain(response: EvolutionResponse): EvolutionRoute[] {
	const partials = mapChain(response.chain);
	return buildEvolutionRoutesFromTree(partials);
}

export function buildEvolutionRoutesFromTree(root: EvolutionNode): EvolutionRoute[] {
	const routes: EvolutionRoute[] = [];

	function dfs(
		node: EvolutionNode,
		accNodes: EvolutionNode[],
		accMethods: EvolutionDetail[][]
	): void {
		if (!node.evolutions || node.evolutions.length === 0) {
			const route: EvolutionRoute = accNodes.map((n, idx) => {
				const details = idx === 0 ? [] : (accMethods[idx - 1] ?? []);
				return {
					id: n.speciesId,
					name: n.speciesName,
					image: spriteUrlFromId(n.speciesId),
					methods: details
				};
			});
			routes.push(route);
			return;
		}

		for (const edge of node.evolutions) {
			dfs(edge.to, [...accNodes, edge.to], [...accMethods, edge.details ?? []]);
		}
	}

	dfs(root, [root], []);
	return routes;
}

export async function getEvolutionRoutesForSpecie(
	speciesNameOrId: string | number,
	fetchFn: typeof fetch = fetch
): Promise<EvolutionRoute[]> {
	const tree = await fetchEvolutionTreeBySpecies(speciesNameOrId, fetchFn);
	return buildEvolutionRoutesFromTree(tree);
}

function describeEvolutionMethod(m: EvolutionDetail) {
	const parts: string[] = [];

  // --- TRIGGER PRINCIPAL ---
  switch (m.trigger.name) {
    case "level-up":
      if (m.min_level) parts.push(`Nivel ${m.min_level}`);
      else parts.push("+Nivel");
      break;

    case "use-item":
      parts.push(`Usar ${m.item.name ?? "desconocido"}`);
      break;

    case "trade":
      if (m.trade_species) parts.push(`Intercambio con ${m.trade_species.name}`);
      else parts.push("Intercambio");
      break;

    default:
      parts.push(
        m.trigger.name
          ? m.trigger.name.replace(/-/g, " ")
          : "Método evolutivo desconocido"
      );
      break;
  }

  // --- DETALLES ADICIONALES ---
  const extras: string[] = [];
  if (m.time_of_day) extras.push(`${m.time_of_day}`);
  if (m.gender) extras.push(`${m.gender === 1 ? "♀" : "♂"}`);
  if (m.location) extras.push(`Lugar: ${m.location.name}`);

  if (m.min_happiness) extras.push(`Amistad ≥ ${m.min_happiness}`);
  if (m.min_affection) extras.push(`Afecto ≥ ${m.min_affection}`);
  if (m.min_beauty) extras.push(`Belleza ≥ ${m.min_beauty}`);

  if (m.held_item) extras.push(`con objeto ${m.held_item.name}`);
  if (m.known_move) extras.push(`con movimiento: ${m.known_move.name}`);
  if (m.known_move_type) extras.push(`movimiento de tipo: ${m.known_move_type.name}`);

  if (m.needs_overworld_rain) extras.push("con lluvia");

  if (m.party_species) extras.push(`Con ${m.party_species.name} en el equipo`);
  if (m.party_type) extras.push(`Con un tipo ${m.party_type.name} en el equipo`);

  if (typeof m.relative_physical_stats === "number") {
    const stat =
      m.relative_physical_stats === 1
        ? "Atk > Def"
        : m.relative_physical_stats === -1
        ? "Atk < Def"
        : "Atk = Def";
    extras.push(stat);
  }
  if (m.turn_upside_down) extras.push("Consola boca abajo");

  // Añadimos extras entre paréntesis
  if (extras.length > 0) {
    parts.push(`(${extras.join(", ")})`);
  }

  return parts.join(" ");
}

export const EvolutionService = {
	fetchEvolutionTreeBySpecies,
	transformEvolutionChain,
	buildEvolutionRoutesFromTree,
	getEvolutionRoutesForSpecie,
	describeEvolutionMethod,
};