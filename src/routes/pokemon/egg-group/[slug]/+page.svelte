<script lang="ts">
	import PokeCard from '$lib/components/pokemon/poke-card.svelte';
    let { data } = $props();
</script>

<section class="grid egg-group-page single-egg-group-page responsive">
	<h1>Grupo huevo: {data.eggGroup.name}</h1>
	<p>Pokemons en este grupo huevo: {data.pokemons.length}</p>

	<ul>
		{#each data.pokemons as pokemon}
			<li>
				<PokeCard {pokemon} />
			</li>
		{/each}
	</ul>

	{#if data.isThereShiny}
		<div class="shiny-notif-container">
			<p class="badge shiny-badge">¡Hay algún pokemon shiny!</p>
		</div>
	{/if}
</section>

<style>
	.egg-group-page.single-egg-group-page {
		padding: 0 12px;
	}
	.egg-group-page.single-egg-group-page ul {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 12px;
	}
	.egg-group-page.single-egg-group-page ul li {
		display: block;
	}

	.shiny-notif-container {
		position: fixed;
		bottom: 12px;
		right: 12px;
		z-index: 1000;
	}
	.shiny-notif-container .badge.shiny-badge {
		background-color: rgba(205, 69, 69, 0.926);
		color: #fff;
		padding: 8px 16px;
		border-radius: 12px;
		font-weight: 600;
		font-size: 0.8rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
</style>