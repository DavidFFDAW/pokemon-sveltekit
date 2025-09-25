<script lang="ts">
	import PokeType from "$lib/poke-type.svelte";
	import { type LocalPokemonInterface } from "$lib/services/local.pokemon.service";

    export let width: number = 150;
    export let pokemon: LocalPokemonInterface;
    export let showTypes: boolean = true;
</script>

<a href={`/pokemon/${pokemon.id}`} class="poke-card-item poke-card single-pokemon main-type-{pokemon.types[0].slug}" class:shiny-pokemon={pokemon.is_shiny}>
    <h3 class="title poke-title violet poke-name">{pokemon.name}</h3>
    <div class="poke-image-container" class:shiny={pokemon.is_shiny}>
        <img width={width} class="poke-image normal-image" loading="lazy" draggable="false" 
            src={pokemon.is_shiny ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}.png` : pokemon.image}
            alt={pokemon.name}
        />
    </div>

    {#if showTypes}
        <div class="poke-types types pokemon-types-container">
            {#each pokemon.types as type}
                <PokeType type={type.slug} text={type.name} />
            {/each}
        </div>
    {/if}
</a>

<style>
	:root {
		--line-color: #ffcb05;
	}
	.main-type-fire {
		--line-color: var(--fire);
	}
	.main-type-water {
		--line-color: var(--water);
	}
	.main-type-grass {
		--line-color: var(--grass);
	}
	.main-type-electric {
		--line-color: var(--electric);
	}
	.main-type-ice {
		--line-color: var(--ice);
	}
	.main-type-fighting {
		--line-color: var(--fighting);
	}
	.main-type-poison {
		--line-color: var(--poison);
	}
	.main-type-ground {
		--line-color: var(--ground);
	}
	.main-type-flying {
		--line-color: var(--flying);
	}
	.main-type-psychic {
		--line-color: var(--psychic);
	}
	.main-type-bug {
		--line-color: var(--bug);
	}
	.main-type-rock {
		--line-color: var(--rock);
	}
	.main-type-ghost {
		--line-color: var(--ghost);
	}
	.main-type-dragon {
		--line-color: var(--dragon);
	}
	.main-type-dark {
		--line-color: var(--dark);
	}
	.main-type-steel {
		--line-color: var(--steel);
	}
	.main-type-fairy {
		--line-color: var(--fairy);
	}
	.main-type-normal {
		--line-color: var(--normal);
	}
    .poke-card-item.poke-card.single-pokemon {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 15px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: relative;
    }
	
	.poke-card-item.poke-card.single-pokemon .title.poke-title.poke-name {
		position: relative;
		font-size: 1.65rem;
		text-transform: capitalize;
		font-weight: 700;
		letter-spacing: 1px;
		margin: 0;
	}
	.poke-card-item.poke-card.single-pokemon .title.poke-title.poke-name::after {
		content: "";
		position: absolute;
		bottom: -6px;
		left: 50%;
		transform: translateX(-50%);
		width: 60%;
		height: 4px;
		background-color: var(--line-color);
		opacity: 0.8;
		border-radius: 15px;
	}
    .poke-image-container {
        position: relative;
        width: 150px;
        object-fit: cover;
    }
    .poke-image-container img.poke-image {
        max-width: 100%;
        height: auto;
        object-fit: cover;
    }
    .poke-image-container.shiny::after {
        content: "✨";
        position: absolute;
        top: 30px;
        right: 15px;
        font-size: 1.5rem;
        transform: rotate(-20deg);
        animation: sparkle 1.5s infinite;
        animation-delay: 0.5s;
    }
    .poke-image-container.shiny::before {
        content: "✨";
        position: absolute;
        bottom: 6px;
        left: 15px;
        font-size: 1.5rem;
        transform: rotate(-20deg);
        animation: sparkle 1.5s infinite;
    }

	.pokemon-types-container.poke-types {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 6px;
	}

    @keyframes sparkle {
        0%, 100% {
            opacity: 1;
            transform: rotate(-20deg) scale(1);
        }
        50% {
            opacity: 0.5;
            transform: rotate(-20deg) scale(1.2);
        }
    }
</style>