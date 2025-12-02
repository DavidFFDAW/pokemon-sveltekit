<script lang="ts">
	import PokeMove from '$lib/poke-move.svelte';
	import type { TransformedPokemonMovePool } from '$lib/types/types';

	let { parsed_moves }: { parsed_moves: TransformedPokemonMovePool } = $props();

	let currentLearningMethod = $state('level-up');
	let currentVersionGame = $state(parsed_moves.versions[0]);
	let moveList = $derived(parsed_moves.moves.filter((move) => move.version === currentVersionGame));
	let moveLearningMethods = $derived(
		moveList.reduce((acc, move) => {
			acc.add(move.level_learning_method);
			return acc;
		}, new Set<string>())
	);

	$effect(() => {
		console.log({
			currentVersionGame,
			currentLearningMethod,
			moveLearningMethods,
			moveList
		});
	});
</script>

<div class="w1 container">
	<div class="w1 flex acenter gap-5 responsive poke-move-filters-version gap-5">
		<label class="relative label">
			<input
				type="text"
				name="poke-move-filter-name"
				class="w1 input"
				placeholder="Filtrar por nombre de movimiento"
			/>
		</label>

		<select bind:value={currentVersionGame} class="w1 select input">
			{#each parsed_moves.versions as version}
				<option value={version}>{version}</option>
			{/each}
		</select>
	</div>

	<div class="w1 tabs tabs-container flex acenter">
		{#each moveLearningMethods as method}
			<label class="relative tab-item">
				<input
					type="radio"
					name="way"
					class="app-radio"
					value={method}
					bind:group={currentLearningMethod}
				/>
				<div class="tab-item-inner">
					<span class="tab-text pointer">{method}</span>
				</div>
			</label>
		{/each}
	</div>

	<div class="poke-moves poke-moves-container poke-grid responsive responsive-grid overflowable">
		{#each moveList.filter((move) => move.level_learning_method === currentLearningMethod) as move}
			<PokeMove {move} />
		{/each}
	</div>
</div>

<style>
	.tabs.tabs-container {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.tabs.tabs-container label.tab-item {
		flex: 1;
		position: relative;		
	}
	.tabs.tabs-container label.tab-item .tab-item-inner {
		background: linear-gradient(180deg, #f5f5f5, #e0e0e0);
		border-radius: 0;
		padding: 4px 16px;
		border: 1px solid #ddd;
		border-right: none;
		color: #333;
		cursor: pointer;
	}
	.tabs.tabs-container label.tab-item .tab-item-inner:nth-child(1) {
		border-radius: 8px 0 0 8px;
		border-right: none;
	}
	.tabs.tabs-container label.tab-item .tab-item-inner:last-child {
		border-radius: 0 8px 8px 0;
		border-right: 1px solid #ddd;
	}
	.tabs.tabs-container label.tab-item input:checked + .tab-item-inner {
		background: var(--red);
		border-color: var(--red);
		color: #fff;
	}

	.tabs.tabs-container label input {
		position: absolute;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		top: 0;
		left: 0;
		border: none;
		right: 0;
		bottom: 0;
		opacity: 0;
	}
	.tabs.tabs-container label span {
		display: block;
		text-align: center;
		font-weight: 600;
	}

	.poke-moves-container {
		padding: 10px 5px;
		border: 1px solid #eee;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		max-height: 75dvh;
		overflow-y: auto;
		overflow-x: hidden;

		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1rem;
	}

	@media only screen and (min-width: 768px) {
		.poke-moves-container {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
