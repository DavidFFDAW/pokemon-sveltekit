<script lang="ts">
	import PokeCard from '$lib/components/pokemon/poke-card.svelte';
	import PokeMove from '$lib/poke-move.svelte';
	import { HttpService } from '$lib/services/http.service.js';
	import { type ParsedPokemonMove } from '$lib/types/types.js';
	type MovesResponse = { versions: string[]; moves: ParsedPokemonMove[] };

	let versions: string[] = [];
	let moves: ParsedPokemonMove[] = [];
	let originalMoves: ParsedPokemonMove[] = [];
	let selectedPokemon: string = '';
	let currentVersion = '';
	export let data;

	const changedPokemon = async () => {
		if (!selectedPokemon) return;
		const pokeData = await HttpService.get<MovesResponse>(`/moves/${selectedPokemon}`);
		versions = pokeData.data.versions;
		moves = pokeData.data.moves;
		originalMoves = pokeData.data.moves;
		currentVersion = versions[0] ?? '';
	};

	const scrollToPoke = (event: Event) => {
		const input = event.target as HTMLInputElement;
		const searchTerm = input.value.toLowerCase();
		const validPoke = data.pokemons.find((p) => p.name.startsWith(searchTerm));
		if (!validPoke) return;

		const foundPoke = document.querySelector(
			`.pokemon-select-list .pokemon-select-item[data-id="${validPoke.id}"]`
		);
		if (!foundPoke) return;

		foundPoke.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	$: moves = originalMoves.filter((m) => m.version === currentVersion);
    
</script>

<div class="pokemoves-page">
	<header class="pokemon-selector-list">
		<input
			type="search"
			placeholder="Selecciona un Pokémon..."
			class="form-input"
			on:input={scrollToPoke}
		/>

		<ul class="pokemon-select-list row fancy-scrollbar">
			{#each data.pokemons.slice(0, 10) as pokemon}
				<li class="pokemon-select-item" data-id={pokemon.id}>
					<label class="form-item radio-item relative">
						<input
							type="radio"
							name="pokemon"
							value={pokemon.name}
							class="form-input app-radio"
							bind:group={selectedPokemon}
							on:change|preventDefault={changedPokemon}
						/>

						<div class="pokemon-select-item-inner">
							<PokeCard width={100} {pokemon} showTypes={false} />
						</div>
					</label>
				</li>
			{/each}
		</ul>
	</header>

	<section class="real-moves-section">
		{#if versions.length > 0}
			<select bind:value={currentVersion} class="form-input">
				{#each versions as version}
					<option value={version}>{version}</option>
				{/each}
			</select>
		{/if}

		{#if moves.length > 0}
			<ul class="poke-moves-grid">
				{#each moves.filter((m) => m.level_learning_method === 'level-up') as move}
					<PokeMove {move} />
				{/each}
			</ul>
		{/if}
	</section>
</div>

<style>
	.pokemoves-page {
		max-width: 1200px;
		padding: 15px 20px;
		margin: 0 auto;
	}
	header.pokemon-selector-list {
		border: 2px solid #ddd;
		margin-bottom: 20px;
		border-radius: 8px;
		overflow: hidden;
	}
	header.pokemon-selector-list > input[type='search'] {
		width: 100%;
		padding: 10px 15px;
		font-size: 1rem;
		border: none;
		outline: none;
		box-sizing: border-box;
		border-bottom: 2px solid #ddd;
	}

	ul.pokemon-select-list {
		gap: 10px;
		display: flex;
		justify-content: flex-start;
		max-width: 100%;
		overflow-x: auto;
		white-space: nowrap;
		padding: 10px;
		margin: 0 10px;
	}
	ul.pokemon-select-list li.pokemon-select-item {
		margin: 0;
	}
	ul.pokemon-select-list li.pokemon-select-item label.form-item.radio-item {
		position: relative;
	}
	ul.pokemon-select-list
		li.pokemon-select-item
		label.form-item.radio-item
		input.form-input.app-radio {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		margin: 0;
		padding: 0;
		z-index: 15;
		cursor: pointer;
	}
	ul.pokemon-select-list
		li.pokemon-select-item
		label.form-item.radio-item
		input.form-input.app-radio:checked
		+ div.pokemon-select-item-inner {
		box-shadow: 0 0 8px rgba(0, 112, 243, 0.6);
		border-radius: 8px;
	}

    ul.poke-moves-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 15px;
    }
</style>
