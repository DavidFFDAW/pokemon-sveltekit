<script lang="ts">
	type Poke = {
		id: number;
		name: string;
		image: string;
	};
	let filtered: Poke[] = [];
	import pokemons from '$lib/data/pokemon.json';

	const handleInput = (event: Event) => {
		const input = event.target as HTMLInputElement;
		const value = input.value.toLowerCase().trim();
		if (value.length === 0 || value.length < 4) {
			return;
		}
		filtered = pokemons.filter((pokemon) =>
			pokemon.name.startsWith(value)
		).slice(0, 5) as Poke[];
	};
</script>

<form action="/pokemon/list" method="get">
	<div class="search-input-container form-item">
		<label class="input-with-button" aria-label="Search Pokémon" class:suggestions={filtered.length > 0}>
			<div class="input-container relative">
				<input
					type="search"
					id="search-input"
					name="search"
					placeholder="Search..."
					class="search-input"
					on:input={handleInput}
				/>

				{#if filtered.length > 0}
					<div class="search-suggestions">
						{#each filtered as pokemon}
							<div class="suggestion-item">
								<a href={`/pokemon/${pokemon.id}`}>
									<img
										src={pokemon.image}
										alt={pokemon.name}
										loading="lazy"
										draggable="false"
									/>
									<span class="suggestion-name">{pokemon.name}</span>
								</a>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<button type="submit" class="search-button violet">
				<span class="text">Buscar</span>
			</button>
		</label>
	</div>
</form>

<style>
	:root {
		--search-height: 35px;
	}
	.search-input-container.form-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.search-input {
		display: block;
		padding: 10px 25px;
		border: 1px solid #ccc;
		border-radius: 50px 0 0 50px;
		font-size: 1rem;
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		outline: none;
		color: var(--pokemon-page-type-bg);
		height: var(--search-height);
	}

	label button {
		font-weight: bold;
	}

	.input-with-button {
		display: flex;
		align-items: center;
	}
	.input-with-button .search-input {
		flex: 1;
	}
	.input-with-button button {
		background-color: var(--pokemon-page-type-bg);
		color: #fff;
		border: none;
		border-radius: 0 50px 50px 0;
		padding: 5px 12px;
		cursor: pointer;
		height: var(--search-height);
	}

	.input-with-button .input-container {
		position: relative;
		flex: 1;
	}
	.input-with-button .input-container .search-suggestions {
		display: flex;
		flex-direction: column;
		gap: 0;
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: #fff;
		border-radius: 0 0 8px 8px;
		border-top: none;
		max-height: 200px;
		overflow-y: hidden auto;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		z-index: 5;
	}
	.input-with-button .input-container .search-suggestions .suggestion-item a {
		display: flex;
		align-items: center;
		gap: 6px;
		border-bottom: 1px solid #eee;
		padding: 5px 10px;
		cursor: pointer;
	}
	.input-with-button .input-container .search-suggestions .suggestion-item a img {
		width: 30px;
		height: 30px;
		object-fit: cover;
	}
	.input-with-button.suggestions .input-container input.search-input {
		border-radius: 8px 0 0 0;
		border-bottom: 1px solid #ccc;
	}

	.input-with-button .input-container .search-suggestions .suggestion-item a .suggestion-name {
		text-transform: capitalize;
		font-weight: 500;
	}

</style>
