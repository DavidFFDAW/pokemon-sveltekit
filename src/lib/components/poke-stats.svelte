<script lang="ts">
  	export let stats: {[key: string]: number};
</script>

<div class="poke-stats poke-stats-list">
	{#each Object.entries(stats) as [key, value]}
		<div class="poke-stat poke-stat-item-{key.toLowerCase()}">
			<span class="poke-stat-name">{key.replace('-', ' ')}</span>
			<div class="poke-stat-bar-background">
				<div class="poke-stat-bar-fill" style="width: {Math.min(value, 255) / 255 * 100}%"></div>
				<span class="poke-stat-value">{value}</span>
			</div>
		</div>
	{/each}
</div>

<style>
	.poke-stats.poke-stats-list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 6px;
	}
	.poke-stat.poke-stat-item-total {
		grid-column: span 2;
	}
	.poke-stat {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.poke-stat-name {
		flex: 1;
		font-size: 0.85rem;
		font-weight: 600;
		text-transform: capitalize;
	}

	.poke-stat-bar-background {
		position: relative;
		display: block;
		height: 12px;
		background-color: #e0e0e0;
		border-radius: 5px;
		overflow: hidden;
	}

	.poke-stat-value {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 0.75rem;
		font-weight: bold;
		color: #000;
	}

	.poke-stat-bar-fill {
		height: 100%;
		background-color: var(--pokemon-page-type-bg);
		border-radius: 5px 0 0 5px;
	}
</style>