<script lang="ts">
	import PokedexByTypeVisualizer from '$lib/pokedex-by-type-visualizer.svelte';
	export let data;
</script>

<PokedexByTypeVisualizer pokedex={data.pokemons} />