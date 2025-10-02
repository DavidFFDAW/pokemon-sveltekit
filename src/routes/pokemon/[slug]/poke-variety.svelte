<script lang="ts">
	import Debug from "$lib/debug.svelte";

	type Variety = {
		id: number;
		name: string;
		url: string;
		image: string;
		is_default: boolean;
	}
	export let variety: Variety;
	export let specie: string;
</script>

<a class="poke-variety" href="/pokemon/{variety.id}" title="{variety.name}" aria-label="{variety.name}">
	<header class="header">
		<h3 class="violet capitalize">{specie}</h3>
		<small class="small-variety-name text-overflow">{variety.name.replace(specie, '').replace(/-/g, ' ').trim()}</small>
	</header>
	<img class="poke-variety-image" src="{variety.image}" alt="{variety.name}" width="135" height="135" loading="lazy" />
	<img class="bg" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/f720bb6e-b303-4877-bffb-d61df0ab183f/d3b98cf-4fc5c76b-2a99-47fc-98b6-d7d4ee8d9d9f.png" alt="">
</a>

<style>
	.poke-variety {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 10px;

		border: 1px solid #e0e0e0;
		border-radius: 8px;
		padding: 10px;
		text-align: center;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}
	.poke-variety::before {
		content: '';
		position: absolute;
		top: 50%;
		right: 0;
		background-color: var(--pokemon-page-type-bg);
		width: 100%;
		height: 100%;
		transform: skewX(-57deg) translateY(-50%);
		filter: brightness(0.65) contrast(1.2);
		z-index: 0;
	}
	.poke-variety .bg {
		position: absolute;
		max-width: 60%;
		bottom: -35%;
		right: -10%;
		filter: grayscale(1) brightness(4);
		opacity: 0.4;
		z-index: 0;
	}

	.poke-variety > * {
		position: relative;
		z-index: 1;
	}
	.poke-variety header {
		align-self: flex-start;
	}
	.poke-variety img.poke-variety-image {
		max-width: 100%;
		aspect-ratio: 1/1;
		align-self: flex-end;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0));
	}
	.poke-variety h3 {
		position: relative;
		font-size: 2rem;
		text-align: start;
	}
	.poke-variety h3::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 50%;
		height: 4px;
		background-color: var(--pokemon-page-type-bg);
		border-radius: 50px;
	}
	.poke-variety header small.small-variety-name {
		text-align: start;
		font-size: 0.7rem;
		color: #666;
		display: block;
		text-transform: capitalize;
		margin-top: 5px;
	}
</style>