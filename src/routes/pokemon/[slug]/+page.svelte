<script lang="ts">
	import PokeStats from '$lib/components/poke-stats.svelte';
	import SearchInput from '$lib/components/search/search-input.svelte';
	// import TypeIcon from '$lib/components/type-icons/type-icon.svelte';
	import PokeType from '$lib/poke-type.svelte';

	export let data;
	// let sprites = data.pokemon.sprites;

	const handlePlayCry = () => {
		const audioElement = document.querySelector('.poke-cry-audio-tag') as HTMLAudioElement | null;
		if (!audioElement) return;

		audioElement.currentTime = 0;
		audioElement.play().catch((error) => {
			console.error('Error playing audio:', error);
		});
	};

	const pokeScrollToElement = (selector: string) => (event: Event) => {
		event.preventDefault();
		const element = document.querySelector(selector);
		if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
</script>

<div
	class="pokemon-wrapper pokemon-single-page pokemon-page type-{data.types[0].slug} light-theme"
	class:shiny={data.shiny}
	class:legendary={data.specie.is_legendary}
	class:mythical={data.specie.is_mythical}
	class:ultra-beast={data.specie.is_ultra_beast}
>
	<div class="pokemon-page-search-container">
		<SearchInput />
	</div>

	<div class="pokemon-type-icon">
		<!-- <TypeIcon type={data.types[0].slug} /> -->
		<img
			src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/refs/heads/master/icons/${data.types[0].slug}.svg`}
			alt={data.types[0].name}
		/>
	</div>

	{#if data.pokemon}
		<div class="pokemon-datas-wrapper">
			<button
				type="button"
				class="shiny-button"
				class:shiny={data.shiny}
				on:click={() => (data.shiny = !data.shiny)}
			>
				<span>✨</span>
			</button>
			<div class="pokemon-main-datas">
				<img
					title="{data.pokemon.name} normal"
					draggable="false"
					class="poke-main-image normal-image"
					src={data.pokemon.sprites.other.home.front_default}
					alt={data.pokemon.name}
				/>
				<img
					title="{data.pokemon.name} shiny"
					draggable="false"
					class="poke-main-image shiny-image"
					src={data.pokemon.sprites.other.home.front_shiny}
					alt="{data.pokemon.name} shiny"
				/>
				<div class="pokemon-name-types">
					<h1 class="violet capitalize title poke-name">{data.pokemon.species.name}</h1>
				</div>
				<p>#{data.pokemon.id}</p>
				{#if data.genus}
					<small class="genera-genus">{data.genus.genus}</small>
				{/if}
				<div class="pokemon-types poke-types">
					{#each data.types as type}
						<PokeType type={type.slug} text={type.name} />
					{/each}
				</div>

				<button type="button" class="pokemon-cry-button" on:click={handlePlayCry}>
					<audio src={data.pokemon.cries.latest} class="poke-cry-audio-tag" autoplay></audio>
					<span class="poke-cry-text">¡Escuchar!</span>
				</button>
			</div>

			<!-- <Debug data={data.typeRelations} /> -->

			<div class="pokemon-type-relations">
				<div class="pokemon-type-relation relation-strengths">
					{#if data.typeRelations.strengths.length > 0}
						<strong>Fortalezas (x2)</strong>

						<div class="pokemon-type-relation-list">
							{#each data.typeRelations.strengths as type}
								<PokeType {type} translate />
							{/each}
						</div>
					{/if}
				</div>

				<div class="pokemon-type-relation relation-weaknesses">
					{#if data.typeRelations.weaknesses.length > 0}
						<strong>Debilidades (x2)</strong>
						<div class="pokemon-type-relation-list">
							{#each data.typeRelations.weaknesses as type}
								<PokeType {type} translate />
							{/each}
						</div>
					{/if}
				</div>
			</div>

			{#if data.varieties.length > 0}
				<div class="poke-forms-block">
					<h2>Formas</h2>
					<div class="poke-forms poke-grid">
						{#each data.varieties as variety}
							<a
								href={`/pokemon/${variety.id}`}
								class="poke-form-item"
								title={`Ver ${variety.name}`}
							>
								<img src={variety.image} alt={variety.name} loading="lazy" />
								<span class="poke-form-name capitalize">{variety.name}</span>
							</a>
						{/each}
					</div>
				</div>
			{/if}

			<div class="egg-group">
				{#each data.specie.egg_groups as group}
					<span class="egg-group-item badge">
						{group.name}
					</span>
				{/each}
			</div>

			<div class="pokemon-stats-container">
				<h2>Estadísticas</h2>
				<PokeStats stats={data.stats} />
			</div>

			<!-- <Debug data={data.parsed_moves} /> -->
			<!-- <PokeMove move={data.parsed_moves.parsedMovePool[0]} /> -->
		</div>

		<!-- <nav class="poke-page-navigation">
			<button type="button" on:click={pokeScrollToElement('.pokemon-stats-container')}
				>Ver estadísticas</button
			>
			<button type="button" on:click={pokeScrollToElement('.poke-forms-block')}>Ver formas</button>
			<button type="button" on:click={pokeScrollToElement('.poke-evolutions-block')}
				>Ver evoluciones</button
			>
		</nav> -->
	{/if}
</div>

<style>
	.poke-page-navigation {
		position: fixed;
		bottom: 12px;
		right: 6px;
		background-color: transparent;
		display: flex;
		flex-direction: column;
		gap: 4px;
		z-index: 10;
	}
	.poke-page-navigation button {
		font-size: 0.75rem;
		padding: 6px;
		color: #fff;
		background-color: var(--red);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
		border-radius: 8px;
		cursor: pointer;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-fire {
		--pokemon-page-type-bg: #f08030;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-water {
		--pokemon-page-type-bg: #6890f0;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-grass {
		--pokemon-page-type-bg: #78c850;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-rock {
		--pokemon-page-type-bg: #b8a038;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-electric {
		--pokemon-page-type-bg: #f8d030;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-psychic {
		--pokemon-page-type-bg: #f85888;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-ice {
		--pokemon-page-type-bg: #98d8d8;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-dragon {
		--pokemon-page-type-bg: #7038f8;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-dark {
		--pokemon-page-type-bg: #705848;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-fairy {
		--pokemon-page-type-bg: #ee99ac;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-normal {
		--pokemon-page-type-bg: #a8a878;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-fighting {
		--pokemon-page-type-bg: #c03028;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-flying {
		--pokemon-page-type-bg: #a890f0;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-poison {
		--pokemon-page-type-bg: #a040a0;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-ground {
		--pokemon-page-type-bg: #e0c068;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-bug {
		--pokemon-page-type-bg: #a8b820;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-ghost {
		--pokemon-page-type-bg: #705898;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.type-steel {
		--pokemon-page-type-bg: #b8b8d0;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page .shiny-button {
		position: absolute;
		top: -25px;
		right: 30px;
		background-color: #fff;
		border: none;
		border-radius: 50%;
		padding: 12px;
		cursor: pointer;
		font-weight: 600;
		font-size: 1.2rem;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
		z-index: 5;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page .shiny-button.shiny {
		background-color: var(--red);
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page .title.poke-name {
		position: relative;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page .title.poke-name::after {
		content: '';
		position: absolute;
		bottom: -6px;
		left: 50%;
		transform: translateX(-50%);
		width: 25%;
		height: 3px;
		background-color: var(--pokemon-page-type-bg);
		border-radius: 20px;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page .genera-genus {
		color: #666;
		display: block;
		font-style: italic;
		font-size: 0.9rem;
	}

	.pokemon-wrapper.pokemon-single-page.pokemon-page {
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		background: var(--pokemon-page-type-bg);
		min-height: 100dvh;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page .pokemon-type-icon {
		position: absolute;
		top: 10px;
		right: 50%;
		width: 200px;
		transform: translateX(50%);
		opacity: 0.4;
		background-size: fill;
		background-repeat: repeat;
		background-position: top;
		pointer-events: none;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page .pokemon-datas-wrapper {
		width: calc(100% - 30px);
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 15px;
		background-color: #fff;
		border-radius: 16px 16px 0 0;
		padding: 20px 15px;
		/* height: calc(100dvh - 250px); */
		margin-top: 250px;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page
		.pokemon-datas-wrapper
		.poke-main-image.shiny-image {
		display: none;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.shiny
		.pokemon-datas-wrapper
		.poke-main-image.shiny-image {
		display: block;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page.shiny
		.pokemon-datas-wrapper
		.poke-main-image.normal-image {
		display: none;
	}
	.pokemon-wrapper.pokemon-single-page.pokemon-page .pokemon-datas-wrapper .poke-main-image {
		position: absolute;
		top: -220px;
		left: 50%;
		transform: translateX(-50%);
		width: 250px;
		height: auto;
		object-fit: cover;
		filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4));
	}

	.pokemon-stats {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.pokemon-types.poke-types {
		display: flex;
		gap: 10px;
		margin: 10px 0;
	}

	.pokemon-datas-wrapper {
		animation: slideUp 0.8s ease-in;
		animation-fill-mode: forwards;
	}
	.pokemon-name-types h1 {
		margin: 0;
		padding: 0;
		margin-top: 12px;
	}

	.pokemon-wrapper.pokemon-single-page.pokemon-page .pokemon-page-search-container {
		position: absolute;
		top: 12px;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		padding: 0 15px;
		z-index: 10;
	}

	:global(
		.pokemon-wrapper.pokemon-single-page.pokemon-page .pokemon-page-search-container .search-input
	) {
		border: none;
		border-right: 1px solid var(--pokemon-page-type-bg);
		color: var(--pokemon-page-type-bg);
		font-weight: 400;
	}
	:global(
		.pokemon-wrapper.pokemon-single-page.pokemon-page
			.pokemon-page-search-container
			.input-with-button
			button
	) {
		background-color: #fff;
		color: var(--pokemon-page-type-bg);
		font-weight: 600;
	}

	.pokemon-type-relations {
		margin-top: 15px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	.pokemon-type-relations .pokemon-type-relation {
		padding: 10px;
		background-color: #fff;
		border: 1px solid #eee;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}
	.pokemon-type-relations .pokemon-type-relation-list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		justify-items: start;
		align-items: center;
		place-items: center;
		margin-top: 12px;
		gap: 8px;
	}
	.pokemon-type-relations .pokemon-type-relation strong {
		font-weight: 700;
		font-size: 0.95rem;
		font-family: 'violet', sans-serif;
		text-transform: uppercase;
	}

	.pokemon-cry-button {
		margin-top: 15px;
		padding: 8px 16px;
		background-color: var(--pokemon-page-type-bg);
		color: #fff;
		border: none;
		border-radius: 20px;
		cursor: pointer;
		transition: background-color 0.3s ease;
		display: flex;
		align-items: center;
		gap: 8px;
		font-weight: 600;
	}

	.pokemon-stats-container {
		margin-top: 40px;
	}
	.pokemon-stats-container h2 {
		text-align: left;
	}

	.poke-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: 15px;
	}
	.poke-grid .poke-form-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		background-color: #fff;
		border: 1px solid #eee;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		border-radius: 12px;
		padding: 10px;
	}

	@media only screen and (min-width: 767px) {
		.pokemon-wrapper.pokemon-single-page.pokemon-page .pokemon-datas-wrapper {
			width: 60%;
			margin-top: 315px;
			/* height: calc(100dvh - 350px); */
		}
		.pokemon-wrapper.pokemon-single-page.pokemon-page .pokemon-datas-wrapper .poke-main-image {
			width: 300px;
			top: -270px;
		}
		.pokemon-wrapper.pokemon-single-page.pokemon-page .pokemon-page-search-container {
			width: 60%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 0;
		}
	}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
