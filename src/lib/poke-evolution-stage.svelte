<script lang="ts">
	import { EvolutionService, type EvolutionRouteItem } from "./services/evolution.service";
  	export let item: EvolutionRouteItem;
	const parsedMethods = item.methods.map(method => EvolutionService.describeEvolutionMethod(method));
</script>

<a class="w1 poke-evolution-stage single-stage" 
	href="/pokemon/{item.id}" title={item.name}
	aria-label={`Ver detalles de ${item.name}`}
	target="_self"
>
	<img
		class="poke-evolution-stage-image"
		src={item.image}
		alt={item.name}
		width="100"
		height="100"
		loading="lazy"
	/>
	<div class="poke-evolution-stage-name">{item.name}</div>

	<div class="poke-evolution-methods">
		{#each parsedMethods as method}
			<small class="poke-evolution-method single-evolution-method-line">{method}</small>
		{/each}
	</div>
</a>

<style>
	.poke-evolution-stage {
		min-width: 100px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		text-align: center;
	}

	.poke-evolution-stage-image {
		width: 100%;
		min-width: 120px;
		max-width: 120px;
		height: auto;
		padding: 10px;
		border-radius: 50%;
		border: 2px solid var(--red);
		background: #fff;
		box-shadow: 0 1px 15px 2px rgba(0, 0, 0, 0.2);
	}
	
	.poke-evolution-stage-name {
		margin-top: 0.5rem;
		font-weight: 600;
		font-size: 1rem;
		text-transform: capitalize;
	}
	
	.poke-evolution-methods {
		margin-top: 0.25rem;
		display: flex;
		flex-direction: column;
		gap: 5px;
		max-width: 140px;
	}
	.poke-evolution-methods small.single-evolution-method-line {
		display: block;
		font-size: 0.75rem;
		white-space: normal;
	}
	
	@media only screen and (max-width: 768px) {
		.poke-evolution-stage-image {
			min-width: 80px;
			max-width: 80px;
		}
	}
</style>