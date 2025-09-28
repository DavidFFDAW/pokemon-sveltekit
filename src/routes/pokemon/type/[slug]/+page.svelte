<script lang="ts">
	import PokeCard from '$lib/components/pokemon/poke-card.svelte';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>

<ul class="poke-list">
    {#each data.pokemons as poke}
        <li>
            <PokeCard pokemon={poke} showTypes={true} />
        </li>
    {/each}
</ul>