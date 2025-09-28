<script lang="ts">
	import Pagination from '$lib/components/pagination.svelte';
	import PokeCard from '$lib/components/pokemon/poke-card.svelte';

	export let data;
</script>

<div class="page">
	<a href="/test">Test</a>
	<header class="header">
		<h1>Página búsqueda</h1>
		<form method="get" action="/pokemon/list">
			<input
				type="text"
				name="search"
				placeholder="Buscar Pokémon..."
				value={data.search.name ?? ''}
			/>
			<button type="submit">Buscar</button>
		</form>
	</header>

	<section class="poke-list-container">
		<Pagination
			page={data.pokemons.page}
			total={data.pokemons.total}
			perPage={data.pokemons.limit}
		/>

		<ul class="list">
			{#each data.pokemons.list as poke}
				<PokeCard pokemon={poke} showTypes={true} />
			{/each}
		</ul>
	</section>
</div>

<style>
	.page {
		padding: 50px 150px;
	}
    @media only screen and (max-width: 768px) {
        .page {
            padding: 25px;
        }
    }
	.page header.header {
		padding: 15px;
		background-color: #efefef;
		border-radius: 8px;
	}
	.page header.header form {
		display: flex;
	}
	.page header.header form input {
		flex: 1;
		width: 100%;
		padding: 8px;
		font-size: 1rem;
		border: 1px solid #ccc;
		background-color: #fff;
		border-radius: 8px 0 0 8px;
		height: 40px;
		outline: none;
		border-right: none;
	}
	.page header.header form button {
		display: block;
		background-color: #fff;
		color: #333;
		border: 1px solid #ccc;
		border-radius: 0 8px 8px 0;
		height: 40px;
		cursor: pointer;
		outline: none;
		padding: 0 15px;
	}
	.page header.header h1 {
		margin: 0 0 10px 0;
		font-size: 1.5rem;
		color: #333;
		padding: 5px;
	}

	.list {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 15px;
		padding: 20px 10px;
		margin: 0;
	}
</style>
