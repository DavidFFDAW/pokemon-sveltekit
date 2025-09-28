<script lang='ts'>
	import { PokeTypes } from "./constant/types";

  export let type: string;
  export let text: string = type;
  export let translate: boolean = false;
  $: typeText = translate ? PokeTypes[type] || type : text;
</script>

<a class="poke-type type {type}" href="/pokemon/type/{type}">
  <img class="poke-type-icon type-icon" src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/refs/heads/master/icons/${type}.svg`} alt={type} />
  <span class="poke-type-text">{typeText}</span>
</a>

<style>
	span {
		text-transform: uppercase;
	}
	@media screen and (max-width: 768px) {
		.poke-type {
			font-size: .9em;
		}

		.poke-type img.type-icon {
			width: 12px;
			height: auto;
		}

		.poke-type.type {
			padding: 4px 15px;
		}
	}
</style>