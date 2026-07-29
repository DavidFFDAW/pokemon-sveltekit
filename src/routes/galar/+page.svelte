<script lang="ts">
	import PokeCard from '$lib/components/pokemon/poke-card.svelte';
	import PokemonTypeFilters from '$lib/components/pokemon/pokemon-type-filters.svelte';
	// import PokedexByTypeVisualizer from '$lib/pokedex-by-type-visualizer.svelte';
	let { data } = $props();
	let currentType: string = $state('all');

	let filtered = $derived(data.pokemons.filter((p: any) =>
		currentType === 'all' ? true : p.types.map((t: any) => t.slug).includes(currentType)
	));

    $inspect(filtered);
</script>

<!-- <PokedexByTypeVisualizer pokedex={data.pokemons} /> -->
<section class="page-galar-dex">
	<header class="page-header">
		<h1 class="violet uppercase">Pokedex de Galar</h1>
	</header>

	<PokemonTypeFilters bind:currentType />

	<ul class="poke-list">
		{#each filtered as poke}
			<li class="poke-list-item">
				<PokeCard pokemon={poke} showTypes={true} />
			</li>
		{/each}
	</ul>
</section>

<style>
	.page-galar-dex {
		padding: 5px 15px;
	}
</style>
