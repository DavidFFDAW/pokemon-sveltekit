<script lang="ts">
	import PokeCard from '$lib/components/pokemon/poke-card.svelte';
	// import PokedexByTypeVisualizer from '$lib/pokedex-by-type-visualizer.svelte';
	export let data;
</script>

<!-- <PokedexByTypeVisualizer pokedex={data.pokemons} /> -->
 <h1>Pokedex de Galar</h1>
 <ul>
    {#each data.pokemons as poke}
        <li>
            <PokeCard pokemon={poke} showTypes={true} />
        </li>
    {/each}
 </ul>

<style>
    ul {
        list-style: none;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 15px;
        padding: 30px 160px;
        align-items: stretch;
    }
    li {
        margin: 0;
        display: block;
    }
</style>