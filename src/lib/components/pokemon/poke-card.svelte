<script lang="ts">
	import { handleErrorImage } from '$lib/actions/image.error';
	import PokeType from '$lib/poke-type.svelte';
	import { type LocalPokemonInterface } from '$lib/services/local.pokemon.service';

	export let width: number = 150;
	export let pokemon: LocalPokemonInterface;
	export let showTypes: boolean = true;
	export let forceShiny: boolean = false;
</script>

<a
	href={`/pokemon/${pokemon.id}`}
	title="Ver detalles de {pokemon.name}"
	aria-label="Ver detalles de {pokemon.name}"
	class="poke-card-item poke-card single-pokemon main-type-{pokemon.types[0].slug}"
	class:shiny-pokemon={pokemon.is_shiny || forceShiny}
>
	<h3 class="title poke-title violet poke-name">{pokemon.species}</h3>
	<div class="poke-image-container" class:shiny={pokemon.is_shiny || forceShiny}>
		<img
			{width}
			class="poke-image normal-image"
			loading="lazy"
			draggable="false"
			src={pokemon.is_shiny || forceShiny
				? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}.png`
				: pokemon.image}
			alt={pokemon.name}
			data-id={pokemon.id}
			use:handleErrorImage
		/>
	</div>

	{#if showTypes}
		<div class="poke-types types pokemon-types-container">
			{#each pokemon.types as type}
				<PokeType type={type.slug} text={type.name} anchor={false} />
			{/each}
		</div>
	{/if}
</a>

<style>
	:root {
		--line-color: #ffcb05;
		--title-color: #000;
	}
	.poke-card-item.poke-card {
		min-width: 250px;
		text-decoration: none;
		color: inherit;
	}
	.main-type-fire {
		--line-color: var(--fire);
	}
	.main-type-water {
		--line-color: var(--water);
	}
	.main-type-grass {
		--line-color: var(--grass);
	}
	.main-type-electric {
		--line-color: var(--electric);
	}
	.main-type-ice {
		--line-color: var(--ice);
	}
	.main-type-fighting {
		--line-color: var(--fighting);
	}
	.main-type-poison {
		--line-color: var(--poison);
	}
	.main-type-ground {
		--line-color: var(--ground);
	}
	.main-type-flying {
		--line-color: var(--flying);
	}
	.main-type-psychic {
		--line-color: var(--psychic);
	}
	.main-type-bug {
		--line-color: var(--bug);
	}
	.main-type-rock {
		--line-color: var(--rock);
	}
	.main-type-ghost {
		--line-color: var(--ghost);
		--title-color: #fff;
	}
	.main-type-dragon {
		--line-color: var(--dragon);
		--title-color: #fff;
	}
	.main-type-dark {
		--line-color: var(--dark);
		--title-color: #fff;
	}
	.main-type-steel {
		--line-color: var(--steel);
	}
	.main-type-fairy {
		--line-color: var(--fairy);
	}
	.main-type-normal {
		--line-color: var(--normal);
	}
	.poke-card-item.poke-card.single-pokemon {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
		text-align: center;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 15px;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: relative;
		overflow: hidden;
	}

	.poke-card-item.poke-card.single-pokemon:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		transform: translateY(-4px);
		transition: all 0.3s ease;
		cursor: pointer;
		opacity: 1;
	}

	.poke-card-item.poke-card.single-pokemon::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 35%;
		background: linear-gradient(0deg, #ffffff31, var(--line-color) 80%);
		opacity: 0.8;
		z-index: 0;
	}

	.poke-card-item.poke-card.single-pokemon .title.poke-title.poke-name {
		position: relative;
		font-size: 1.65rem;
		text-transform: capitalize;
		font-weight: 700;
		letter-spacing: 1px;
		color: var(--title-color);
		margin: 0;
	}
	.poke-card-item.poke-card.single-pokemon .title.poke-title.poke-name::after {
		content: '';
		position: absolute;
		bottom: -6px;
		left: 50%;
		transform: translateX(-50%);
		width: 60%;
		height: 4px;
		background-color: var(--line-color);
		opacity: 1;
		border-radius: 15px;
	}
	.poke-image-container {
		position: relative;
		width: 150px;
		margin-top: 16px;
		object-fit: cover;
	}
	.poke-image-container img.poke-image {
		max-width: 100%;
		height: auto;
		object-fit: cover;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
		padding: 2px;
	}
	.poke-image-container.shiny::after {
		content: '✨';
		position: absolute;
		top: 30px;
		right: 15px;
		font-size: 1.5rem;
		transform: rotate(-20deg);
		animation: sparkle 1.5s infinite;
		animation-delay: 0.5s;
	}
	.poke-image-container.shiny::before {
		content: '✨';
		position: absolute;
		bottom: 6px;
		left: 15px;
		font-size: 1.5rem;
		transform: rotate(-20deg);
		animation: sparkle 1.5s infinite;
	}

	.pokemon-types-container.poke-types {
		margin-top: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 6px;
	}

	@keyframes sparkle {
		0%,
		100% {
			opacity: 1;
			transform: rotate(-20deg) scale(1);
		}
		50% {
			opacity: 0.5;
			transform: rotate(-20deg) scale(1.2);
		}
	}
</style>
