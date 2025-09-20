<script>
	import SearchInput from "$lib/components/search/search-input.svelte";
	export let data;
</script>

<div class="poke-home">
	<div class="poke-animated-container">
		<img
			class="charizard-animation"
			src="{data.random_pokemon.image}"
			alt="{data.random_pokemon.name}"
			draggable="false"
			loading="lazy"
		/>
	</div>

	<div class="poke-home-content">
			<h1 class="tcenter">¡Bienvenido a la Pokedex!</h1>
			<p class="tcenter">
				Haz una búsqueda o pulsa sobre uno de los enlaces para ver informaciones.
			</p>

			<SearchInput />

			<div class="poke-home-actions">
				<a href="/pokemon/types" class="poke-button tcenter">Ver tipos</a>
				<a href="/pokemon/moves" class="poke-button tcenter">Ver movimientos</a>
			</div>
	</div>
</div>

<style>
	.poke-home-actions {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 25px;
		gap: 10px;
	}
	.poke-home-actions > a {
		display: block;
		flex: 1;
		padding: 10px 20px;
		background-color: var(--red);
		color: #fff;
		text-decoration: none;
		border-radius: 5px;
		text-align: center;
		border-radius: 50px;
	}
	.tcenter {
		text-align: center;
	}
	.poke-home {
		display: flex;
		justify-content: space-between;
		position: relative;
		height: 100vh;
		background-color: #f0f0f0;
		overflow: hidden;
	}
	.poke-animated-container {
		position: relative;
		width: 50%;
		padding: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--red);
	}
	.poke-animated-container::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: calc(100% + 20px);
		transform: skew(8deg);
		background-color: var(--red);
		transform-origin: top left;
		z-index: 1;
	}
	.charizard-animation {
		width: 100%;
		min-width: 500px;
		object-fit: cover;
		height: auto;
		max-width: 300px;
		z-index: 2;
	}

	.poke-home-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		padding: 30px 15px;
		padding-right: 80px;
	}

	@media screen and (max-width: 600px) {
		.poke-home {
			justify-content: flex-start;
			align-items: flex-start;
			flex-direction: column;
		}
		.poke-animated-container {
			width: 100%;
			height: 50%;
			padding: 10px;
		}
		.poke-animated-container::after {
			width: calc(100% + 50px);
			height: 100%;
			transform: rotate(5deg);
			transform-origin: top left;
			z-index: 0;
		}
		.charizard-animation {
			width: 100%;
			min-width: 300px;
			object-fit: cover;
			height: auto;
			max-width: 300px;
		}
	}
</style>
