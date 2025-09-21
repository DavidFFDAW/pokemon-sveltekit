<script lang="ts">
	import PokeCard from '$lib/components/pokemon/poke-card.svelte';
	import Debug from '$lib/debug.svelte';

    let moves: any = false;
    let selectedPokemon: string = '';
	export let data;

	const changedPokemon = async () => {
		console.log('Changed Pokemon to:', selectedPokemon);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`);
        const pokeData = await response.json();

        moves = pokeData.moves;
	};

    const scrollToPoke = (event: Event) => {
        const input = event.target as HTMLInputElement;
        const searchTerm = input.value.toLowerCase();
        const validPoke = data.pokemons.find((p) => p.name.startsWith(searchTerm));
        if (!validPoke) return;

        const foundPoke = document.querySelector(`.pokemon-select-list .pokemon-select-item[data-id="${validPoke.id}"]`);
        if (!foundPoke) return;

        foundPoke.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
</script>

<div class="pokemoves-page">
	<header class="pokemon-selector-list">
        <input type="search" placeholder="Selecciona un Pokémon..." class="form-input" on:input={scrollToPoke} />

		<ul class="pokemon-select-list row fancy-scrollbar">
			{#each data.pokemons.slice(0, 10) as pokemon}
				<li class="pokemon-select-item" data-id={pokemon.id}>
					<label class="form-item radio-item relative">
						<input
							type="radio"
							name="pokemon"
							value={pokemon.name}
							class="form-input app-radio"
                            bind:group={selectedPokemon}
							on:change|preventDefault={changedPokemon}
						/>

                        <div class="pokemon-select-item-inner">
                            <PokeCard width={100} {pokemon} showTypes={false} />
                        </div>
					</label>
				</li>
			{/each}
		</ul>
	</header>

    <section class="real-moves-section">
        {#if moves}
            <Debug data={moves} />
        {/if}
    </section>
</div>

<style>
    .pokemoves-page {
        max-width: 1200px;
        padding: 15px 20px;
        margin: 0 auto;
    }
    header.pokemon-selector-list {
        border: 2px solid #ddd;
        margin-bottom: 20px;
        border-radius: 8px;
        overflow: hidden;
    }
    header.pokemon-selector-list > input[type="search"] {
        width: 100%;
        padding: 10px 15px;
        font-size: 1rem;
        border: none;
        outline: none;
        box-sizing: border-box;
        border-bottom: 2px solid #ddd;
    }

	ul.pokemon-select-list {
		gap: 10px;
		display: flex;
		justify-content: flex-start;
		max-width: 100%;
		overflow-x: auto;
		white-space: nowrap;
		padding: 10px;
        margin: 0 10px;
	}
    ul.pokemon-select-list li.pokemon-select-item {
        margin: 0;
    }
    ul.pokemon-select-list li.pokemon-select-item label.form-item.radio-item  {
        position: relative;
    }
    ul.pokemon-select-list li.pokemon-select-item label.form-item.radio-item input.form-input.app-radio {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        margin: 0;
        padding: 0;
        z-index: 15;
        cursor: pointer;
    }
    ul.pokemon-select-list li.pokemon-select-item label.form-item.radio-item input.form-input.app-radio:checked + div.pokemon-select-item-inner {
        box-shadow: 0 0 8px rgba(0, 112, 243, 0.6);
        border-radius: 8px;
    }

</style>
