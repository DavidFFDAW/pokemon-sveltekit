<script lang="ts">
	let selectedType = 'normal';
	import PokeType from '$lib/poke-type.svelte';
	import TypeSelector from '$lib/type-selector.svelte';
	import { slugify } from './utils/general.utils';

	export let pokedex: {
		name: string;
		img: string;
		types: string[];
	}[] = [];

	$: typePokemon = pokedex.filter((pokemon) => pokemon.types.includes(selectedType));
</script>

<div class="container poke-list">
	<PokeType type={selectedType} text={selectedType} />

	<TypeSelector bind:selectedType />

	<ul class="pokemon-list">
		{#each typePokemon as pokemon}
			<li class="pokemon">
				<h3>{pokemon.name}</h3>
				<img class="pokemon-image" src={pokemon.img} alt={pokemon.name} />
				<ul class="pokemon-types">
					{#each pokemon.types as type}
						<li>
							<PokeType {type} text={type} />
						</li>
					{/each}
				</ul>
				
				<a href="/pokemon/moves?pokemon={slugify(pokemon.name)}">
					<small>Movimientos</small>
				</a>
			</li>

		{/each}
	</ul>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.poke-list ul.pokemon-list {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 20px;
	}

	.poke-list ul.pokemon-list > li {
		min-width: 200px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		list-style: none;
		padding: 10px;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		text-align: center;
		background-color: #fff;
	}

	.poke-list ul.pokemon-list li ul.pokemon-types {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		list-style: none;
		padding: 10px;
		gap: 5px;
	}
	.poke-list ul.pokemon-list li ul.pokemon-types > li {
		flex: 1;
	}

	@media screen and (max-width: 768px) {
		.container {
			padding: 10px 15px;
		}
		.poke-list ul.pokemon-list {
			grid-template-columns: repeat(2, 1fr);
			gap: 15px 8px;
		}
		.poke-list ul.pokemon-list > li {
			min-width: 50%;
		}
		.poke-list ul.pokemon-list li ul.pokemon-types {
			flex-wrap: wrap;
		}
	}
</style>
