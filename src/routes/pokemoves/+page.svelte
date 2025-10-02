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
	let currentLearningMethod = 'level-up';
	export let data;

	const changedPokemon = async () => {
		if (!selectedPokemon) return;
		const pokeData = await HttpService.get<MovesResponse>(`/moves/${selectedPokemon}`);
		versions = pokeData.data.versions;
		moves = pokeData.data.moves;
		originalMoves = pokeData.data.moves;
		currentVersion = pokeData.data.versions.includes(currentVersion)
			? currentVersion
			: pokeData.data.versions[0];
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

	$: moves = originalMoves.filter(
		(m) => m.version === currentVersion && m.level_learning_method === currentLearningMethod
	);

	const learningMethods = [...new Set(originalMoves.map((m) => m.level_learning_method))];
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
			{#each data.pokemons as pokemon}
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

		<div class="w1 pokemon-move-learning-methods">
			{#each learningMethods as method}
				<label class="form-item app-radio radio-item">
					<input
						type="radio"
						name="level_learning_method"
						value={method}
						bind:group={currentLearningMethod}
					/>
					<div class="inner">
						<span>{method}</span>
					</div>
				</label>
			{/each}
			<!-- <label class="form-item app-radio radio-item">
				<input
					type="radio"
					name="level_learning_method"
					value="machine"
					bind:group={currentLearningMethod}
				/>
				<div class="inner">
					<span>Por MT</span>
				</div>
			</label>
			<label class="form-item app-radio radio-item">
				<input
					type="radio"
					name="level_learning_method"
					value="tutor"
					bind:group={currentLearningMethod}
				/>
				<div class="inner">
					<span>Por tutor</span>
				</div>
			</label>
			<label class="form-item app-radio radio-item">
				<input
					type="radio"
					name="level_learning_method"
					value="egg"
					bind:group={currentLearningMethod}
				/>
				<div class="inner">
					<span>Por huevo</span>
				</div>
			</label> -->
		</div>

		{#if moves.length > 0}
			<ul class="grid poke-moves-grid responsive">
				{#each moves as move}
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
		background-color: #fff;
		overflow: hidden;
	}

	.real-moves-section select.form-input {
		width: 100%;
		padding: 10px 15px;
		font-size: 1rem;
		border: none;
		outline: none;
		border: 2px solid #ccc;
		border-radius: 8px;
		box-sizing: border-box;
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
	.pokemon-move-learning-methods {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		margin: 15px 0;
	}
	.pokemon-move-learning-methods > label.app-radio.radio-item {
		flex: 1;
		text-align: center;
	}
	.pokemon-move-learning-methods > label.app-radio.radio-item .inner {
		border-radius: 0;
		border-right: 0;
	}
	.pokemon-move-learning-methods > label.app-radio.radio-item:first-child .inner {
		border-radius: 8px 0 0 8px;
	}

	.pokemon-move-learning-methods > label.app-radio.radio-item:last-child .inner {
		border-radius: 0 8px 8px 0;
		border-right: 1px solid #ccc;
	}
</style>
