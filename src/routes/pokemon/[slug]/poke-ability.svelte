<script lang="ts">
	let { title, effect, hidden } = $props();
</script>

<div class="poke-ability-container">
	<p class="poke-ability-title violet uppercase">
		{title} {#if hidden}<span class="poke-ability-hidden">(Oculta)</span>{/if}
	</p>
	<small class="poke-ability-effect">{effect}</small>
</div>

<style>
	.poke-ability-container .poke-ability-title {
		padding: 8px 12px;
		font-weight: bold;
		border-radius: 50px 50px 0 50px;
		background-color: #eee;
		border: 1px solid #b6b6b6;
	}
	.poke-ability-container .poke-ability-effect {
		color: #555;
		display: block;
		margin-left: 20px;
		padding: 6px 12px;
		border: 1px solid #b6b6b6;
		border-top: 0;
		border-radius: 0 0 8px 8px;
		font-size: 0.9rem;
		white-space: pre-line;
		background-color: transparent;
	}
	</style>