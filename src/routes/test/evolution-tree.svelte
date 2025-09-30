<!-- src/lib/components/EvolutionTree.svelte -->
<script lang="ts">
  import type { EvolutionNode, EvolutionCondition } from "./test.service";
  export let root: EvolutionNode;

  // Convierte los EvolutionCondition a etiquetas legibles
  function describeCondition(d: EvolutionCondition): string {
    const parts: string[] = [];

    // Trigger principal
    if (d.trigger) {
      // normalizamos algunos nombres
      const trigger = d.trigger.replace("-", " ");
      parts.push(trigger);
    }

    // Campos comunes
    if (d.minLevel !== undefined) parts.push(`lvl ${d.minLevel}`);
    if (d.item) parts.push(`item: ${d.item}`);
    if (d.heldItem) parts.push(`held: ${d.heldItem}`);
    if (d.tradeSpecies) parts.push(`trade + ${d.tradeSpecies}`);
    if (d.timeOfDay) parts.push(`${d.timeOfDay}`);
    if (d.gender) parts.push(`${d.gender}`);
    if (d.location) parts.push(`@${d.location}`);
    if (d.knownMove) parts.push(`move: ${d.knownMove}`);
    if (d.knownMoveType) parts.push(`type-move: ${d.knownMoveType}`);
    if (d.minHappiness !== undefined) parts.push(`happiness ≥ ${d.minHappiness}`);
    if (d.minAffection !== undefined) parts.push(`affection ≥ ${d.minAffection}`);
    if (d.minBeauty !== undefined) parts.push(`beauty ≥ ${d.minBeauty}`);
    if (d.needsOverworldRain) parts.push(`overworld rain`);
    if (d.partySpecies) parts.push(`party: ${d.partySpecies}`);
    if (d.partyType) parts.push(`party-type: ${d.partyType}`);
    if (typeof d.relativePhysicalStats === "number") {
      const map: Record<-1 | 0 | 1, string> = { "-1": "Atk<Def", 0: "Atk=Def", 1: "Atk>Def" } as any;
      parts.push(map[d.relativePhysicalStats as -1 | 0 | 1]);
    }
    if (d.turnUpsideDown) parts.push(`console upside-down`);

    return parts.join(" · ");
  }

  // Helpers para "modo lineal"
  function isLinear(node: EvolutionNode): boolean {
    // lineal si todos los niveles tienen a lo sumo 1 hijo
    if (node.evolutions.length > 1) return false;
    if (node.evolutions.length === 0) return true;
    return isLinear(node.evolutions[0].to);
  }

  function linearChain(node: EvolutionNode): EvolutionNode[] {
    const out: EvolutionNode[] = [node];
    let cur = node;
    while (cur.evolutions.length === 1) {
      cur = cur.evolutions[0].to;
      out.push(cur);
    }
    return out;
  }
</script>

<style>
  /* Layout del árbol */
  .tree { --gap: .75rem; }
  .node {
    display: inline-flex; align-items: center; gap: .5rem;
    padding: .35rem .6rem; border: 1px solid #e5e7eb; border-radius: .65rem;
    background: #f9fafb;
  }
  .species {
    font-weight: 600; text-transform: capitalize;
  }
  .baby { font-size: .75rem; color: #6b7280; }

  .children {
    margin-left: 1.25rem; padding-left: 1rem;
    border-left: 2px solid #e5e7eb;
    display: grid; gap: var(--gap);
    margin-top: .5rem;
  }

  .edge {
    display: grid; gap: .35rem;
  }

  .chips {
    display: flex; flex-wrap: wrap; gap: .35rem;
  }
  .chip {
    display: inline-flex; align-items: center;
    padding: .15rem .45rem; font-size: .75rem; border: 1px solid #e5e7eb;
    border-radius: 999px; background: #ffffff;
  }

  /* Línea compacta si no hay ramas: A → B → C */
  .linear {
    display: flex; flex-wrap: wrap; gap: .35rem; align-items: center;
  }
  .arrow { opacity: .6; margin: 0 .2rem; }

  /* Separador entre alternativas (varios details) */
  .alt { font-size: .75rem; color: #6b7280; }
</style>

{#if root.evolutions.length === 1 && isLinear(root)}
  <!-- Representación compacta para cadenas 100% lineales -->
  <div class="linear">
    {#each linearChain(root) as sp, i (sp.speciesName)}
      <span class="node">
        <span class="species">{sp.speciesName}</span>
        {#if sp.isBaby}<span class="baby">(baby)</span>{/if}
      </span>
      {#if i < linearChain(root).length - 1}
        <span class="arrow">→</span>
      {/if}
    {/each}
  </div>
{:else}
  <!-- Representación en árbol (ramas y/o alternativas) -->
  <div class="tree">
    <div class="node">
      <span class="species">{root.speciesName}</span>
      {#if root.isBaby}<span class="baby">(baby)</span>{/if}
    </div>

    {#if root.evolutions.length > 0}
      <div class="children">
        {#each root.evolutions as edge}
          <div class="edge">
            <!-- chips de condiciones, con separadores si hay varias alternativas -->
            {#if edge.details && edge.details.length > 0}
              <div class="chips">
                {#each edge.details as d, idx}
                  <span class="chip">{describeCondition(d)}</span>
                  {#if idx < edge.details.length - 1}
                    <span class="alt">o</span>
                  {/if}
                {/each}
              </div>
            {/if}

            <svelte:self root={edge.to} />
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}
