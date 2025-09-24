<script lang="ts">
	import PokeCard from '$lib/components/pokemon/poke-card.svelte';
	import Debug from '$lib/debug.svelte';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>

<section class="egg-group-page single-egg-group-page">
	<h1>Egg Group: {data.eggGroup.name}</h1>
	<p>Pokémon in this egg group:</p>
	<ul>
		{#each data.pokemons as pokemon}
			<li>
				<PokeCard {pokemon} />
			</li>
		{/each}
	</ul>
</section>

<style>
	.egg-group-page.single-egg-group-page {
		padding: 12px;
	}
	.egg-group-page.single-egg-group-page ul {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 12px;
	}
</style>