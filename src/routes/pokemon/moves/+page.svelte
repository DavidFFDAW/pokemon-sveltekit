<script lang="ts">
	import PokeMove from '$lib/poke-move.svelte';
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';

	export let data;
	let hasTakenCache: boolean = false;
	let view: 'egg' | 'level-up' | 'machine' | 'tutor' = 'level-up';
	let game: string = data.versions[data.versions.length - 1] as string;

	$: moves = data.moves.filter(
		(move: any) => move.version === game && move.level_learning_method === view
	);

	onMount(() => {
		if (localStorage.getItem('game')) {
			game = localStorage.getItem('game') || 'scarlet-violet';
		}
		hasTakenCache = true;
	});

	const handleCacheGameVersion = (e: any) => {
		localStorage.setItem('game', e.target.value);
	};
</script>

<div class="container">
	<h1>Movimientos {data.pokemon}</h1>
	<select bind:value={view}>
		<option value="level-up">Por nivel</option>
		<option value="egg">Huevo</option>
		<option value="machine">MT/MO</option>
		<option value="tutor">Tutor</option>
	</select>

	<select bind:value={game} on:change={handleCacheGameVersion}>
		{#each data.versions as version}
			<option value={version}>{version}</option>
		{/each}
	</select>

	<ul class="moves-list">
		{#if hasTakenCache}
			{#each moves as move}
				<li transition:blur>
					<PokeMove {move} />
				</li>
			{/each}
		{/if}
	</ul>
</div>

<style>
	ul.moves-list {
		padding: 10px 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
