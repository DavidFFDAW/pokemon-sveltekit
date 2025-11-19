<script lang="ts">
	import type { EvolutionRouteItem } from "./services/evolution.service";
  	export let item: EvolutionRouteItem;
</script>

<div class="poke-evolution-stage single-stage">
	<img
		class="poke-evolution-stage-image"
		src={item.image}
		alt={item.name}
		width="96"
		height="96"
		loading="lazy"
	/>
	<div class="poke-evolution-stage-name">{item.name}</div>
</div>

<style>
	.poke-evolution-stage {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.poke-evolution-stage-image {
		
		border-radius: 50%;
		border: 2px solid var(--red);
		background: transparent;
		box-shadow: 0 1px 15px 2px rgba(0, 0, 0, 0.2);
	}

	.poke-evolution-stage-name {
		margin-top: 0.5rem;
		font-weight: 600;
		font-size: 1rem;
		text-transform: capitalize;
	}
</style>