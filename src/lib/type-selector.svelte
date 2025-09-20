<script lang='ts'>
	import { PokeTypes } from "$lib/constant/types";
	import PokeType from "./poke-type.svelte";
	export let selectedType = '';
</script>

<ul class="type-selector-list">
	{#each Object.entries(PokeTypes) as [en, es]}
	<li class="type">
		<label>
			<input type="radio" name="pokemon-type" bind:group={selectedType} value={en} />
			<div class="type-inner">
				<PokeType type={en} text={es} />
			</div>
		</label>
	</li>
	{/each}
</ul>

<style>
	ul.type-selector-list {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	label {
		position: relative;
		display: block;
		cursor: pointer;
	}
	label input[type="radio"] {
		position: absolute;
		opacity: 0;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}

	label input[type="radio"]:checked + .type-inner {
		box-shadow: 0 0 2px 1px #000;
	}

	@media screen and (max-width: 600px) {
		ul.type-selector-list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 5px;
		}
	}
</style>