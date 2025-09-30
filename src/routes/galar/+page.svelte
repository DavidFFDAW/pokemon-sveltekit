<script lang="ts">
	import PokeCard from '$lib/components/pokemon/poke-card.svelte';
	import { PokeTypes } from '$lib/constant/types';
	// import PokedexByTypeVisualizer from '$lib/pokedex-by-type-visualizer.svelte';
	let currentType: string = 'all';
	export let data;

	$: filtered = data.pokemons.filter((p) =>
		currentType === 'all' ? true : p.types.map((t) => t.slug).includes(currentType)
	);
</script>

<!-- <PokedexByTypeVisualizer pokedex={data.pokemons} /> -->
<section class="page-galar-dex">
	<header class="page-header">
		<h1>Pokedex de Galar</h1>
	</header>

	<nav class="poke-nav">
		<label class="poke-nav-item relative">
			<input type="radio" value="all" name="type" class="app-radio" bind:group={currentType} />
			<div class="poke-type type-normal type normal poke-nav-item-inner capitalize">
				<span>Todos</span>
			</div>
		</label>

		{#each Object.entries(PokeTypes) as [key, text]}
			<label class="poke-nav-item relative">
				<input type="radio" value={key} name="type" class="app-radio" bind:group={currentType} />
				<div class="poke-type type {key} poke-nav-item-inner capitalize">
					<img class="icon-key" src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/{key}.svg" alt="{text}" />
					<span>{text}</span>
				</div>
			</label>
		{/each}
	</nav>

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
	.poke-nav {
		max-width: 1000px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		align-items: center;
		gap: 10px;
	}
	.poke-nav .poke-nav-item input.app-radio + .poke-nav-item-inner {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		opacity: .6;
	}
	.poke-nav .poke-nav-item input.app-radio + .poke-nav-item-inner img.icon-key {
		position: relative;
		display: block;
		max-width: 10px;
		height: auto;
		object-fit: contain;
		padding: 6px;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 50%;
	}
	.poke-nav .poke-nav-item input.app-radio + .poke-nav-item-inner img.icon-key::after
	.poke-nav .poke-nav-item input.app-radio + .poke-nav-item-inner span {
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.poke-nav .poke-nav-item input.app-radio:checked + .poke-nav-item-inner {
		opacity: 1;
	}
</style>
