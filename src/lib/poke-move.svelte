<script lang="ts">
	import type { ParsedPokemonMove } from "./types/types";
	export let move: ParsedPokemonMove;
</script>

<div class="poke-vertical-type poke-type type {move.moveData.type}" style="--type: url(https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/refs/heads/master/icons/{move.moveData.type}.svg)">
	<div class="move-item-inner">
		<img
			width="15"
			src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/refs/heads/master/icons/{move.moveData.type}.svg"
			alt={move.moveData.type}
		/>
		<div class="poke-move-item move-name">
			<small>Nombre</small>
			<h3>{move.moveData.name}</h3>
		</div>
		<div class="poke-move-item">
			<small>Nivel</small>
			<p>{move.level_learned_at}</p>
		</div>
		<div class="poke-move-item">
			<small>Poder</small>
			<p>{move.moveData.power}</p>
		</div>
		<div class="poke-move-item">
			<small>Precisión</small>
			<p>{move.moveData.accuracy}</p>
		</div>
	</div>

	{#if move.moveData.effect && move.moveData.effect.toLowerCase() !== 'sin efecto.'}
		<div class="effect">
			<small>Efecto</small>
			<p>{move.moveData.effect}</p>
		</div>
	{/if}
</div>

<style>
	.poke-type.type.poke-vertical-type {
		position: relative;
		padding: 10px 10px;
		flex-direction: column;
		overflow: hidden;
	}
	/* .poke-type.type.poke-vertical-type::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 120%;
		height: 120%;
		background: var(--type) repeat;
		background-size: 60px;
		opacity: 0.1;
	} */
	
	.poke-type.type.poke-vertical-type .effect {
		width: 100%;
		padding: 10px;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 5px;
	}
	.poke-type.type.poke-vertical-type .effect > p {
		font-size: 14px;
	}
	.move-item-inner {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		gap: 10px;
	}
	.move-item-inner > * {
		margin: 0;
		display: block;
		flex: 1;
		width: 100%;
	}
	.poke-move-item  {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.poke-move-item.move-name h3 {
		text-transform: uppercase;
	}
	.poke-move-item > small {
		font-size: 12px;
		text-align: center;
	}
	.poke-move-item > h3 {
		font-size: 14px;
		text-align: center;
	}
	.move-item-inner > img {
		width: 40px;
		height: auto;
	}
</style>