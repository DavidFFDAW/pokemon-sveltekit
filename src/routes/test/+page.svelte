<script lang="ts">
	import EvolutionTree from "./evolution-tree.svelte";

  
  export let data: {
    eevee: import("./test.service").EvolutionNode;
    lotad: import("./test.service").EvolutionNode;
    ralts: import("./test.service").EvolutionNode;
  };
</script>

<style>
  .wrapper { display: grid; gap: 2rem; }
  .card {
    border: 1px solid #e5e7eb; border-radius: 1rem; padding: 1rem 1.25rem;
    background: white; box-shadow: 0 1px 3px rgba(0,0,0,.06);
  }
  h2 { margin: 0 0 .25rem 0; font-size: 1.25rem; }
  p.subtitle { margin: 0 0 1rem 0; color: #6b7280; }
</style>

<div class="wrapper">
  <section class="card">
    <h2>Eevee — árbol multirrama</h2>
    <p class="subtitle">Muchas evoluciones alternativas por ítems/condiciones.</p>
    <EvolutionTree root={data.eevee} />
  </section>

  <section class="card">
    <h2>Lotad — línea lineal</h2>
    <p class="subtitle">Cadena normal con 2 pasos.</p>
    <EvolutionTree root={data.lotad} />
  </section>

  <section class="card">
    <h2>Ralts — mixto</h2>
    <p class="subtitle">Línea lineal con bifurcación (Gardevoir / Gallade).</p>
    <EvolutionTree root={data.ralts} />
  </section>
</div>
