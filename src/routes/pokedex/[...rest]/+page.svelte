<script lang="ts">
	import PokeCard from '$lib/components/pokemon/poke-card.svelte';
	import PokemonTypeFilters from '$lib/components/pokemon/pokemon-type-filters.svelte';
	// import PokedexByTypeVisualizer from '$lib/pokedex-by-type-visualizer.svelte';
	let { data } = $props();
	let currentType: string = $state('all');

	let filtered = $derived(
		data.pokemons.filter((p: any) =>
			currentType === 'all' ? true : p.types.map((t: any) => t.slug).includes(currentType)
		)
	);
</script>

<!-- <PokedexByTypeVisualizer pokedex={data.pokemons} /> -->
<section class="page-region-pokedex">
	<header class="page-header">
		<h1 class="violet uppercase">Pokedex de {data.regionName}</h1>
	</header>

	<PokemonTypeFilters bind:currentType />

	{#if data.pokedexes.length > 1}
		<div class="pokedexes-container">
			<div class="pokedexes-list">
                <small>{filtered.length} pokemons</small>
				{#each data.pokedexes as pokedex}
					<a
						href="{pokedex.url}"
						class="capitalize pokedex-name"
						class:active={pokedex.value === data.subregion}>{pokedex.label}</a
					>
				{/each}
			</div>
		</div>
	{/if}
	<ul class="poke-list">
		{#each filtered as poke}
			<li class="poke-list-item">
				<PokeCard pokemon={poke} showTypes={true} />
			</li>
		{/each}
	</ul>
</section>

<style>
	.page-region-pokedex {
		margin: 0 auto;
		max-width: 1200px;
		padding: 10px 15px 50px 15px;
	}

	.pokedexes-container {
		padding: 0 15px;
	}
	.pokedexes-list {
		display: flex;
        justify-content: flex-end;
        align-items: center;
		flex-wrap: wrap;
		gap: 10px;
	}
	.pokedex-name {
		display: inline-block;
		padding: 6px 20px;
        font-size: 15px;
        border-radius: 50px;
		border: 1px solid #91a119;
		background-color: #fff;
		text-decoration: none;
		color: #333;
        letter-spacing: 0.5px;
	}
    .pokedex-name.active {
        background-color: #91a119;
        border-color: #91a119;
        color: #fff;
    }
	.pokedex-name:hover {
		background-color: #606a16;
        border-color: #606a16;
        color: #fff;
	}
</style>
