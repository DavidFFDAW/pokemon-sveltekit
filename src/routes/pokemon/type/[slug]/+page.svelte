<script lang="ts">
	import PokeCard from '$lib/components/pokemon/poke-card.svelte';
	import Debug from '$lib/debug.svelte';
	let { data } = $props();
</script>

<header class="page-header">
	<h1>Pokemons del tipo {data.esType}</h1>
	<small>Hay {data.pokemons.length} pokémons</small>
</header>

<!-- <Debug data={data.apiResponse} /> -->

<ul class="poke-list">
	{#each data.pokemons as poke}
		<li>
			<PokeCard pokemon={poke} showTypes={true} />
		</li>
	{/each}
</ul>
