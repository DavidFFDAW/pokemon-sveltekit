<script lang="ts">
	import PokeCard from '$lib/components/pokemon/poke-card.svelte';
	import PokemonTypeFilters from '$lib/components/pokemon/pokemon-type-filters.svelte';

	let currentType: string = 'all';
	export let data;

	$: filtered = data.pokemons.filter((p) =>
		currentType === 'all' ? true : p.types.map((t) => t.slug).includes(currentType)
	);
</script>

<section class="page-galar-dex">
	<header class="page-header">
		<h1>Pokedex de Paldea</h1>
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