<script lang="ts">
	import Pagination from '$lib/components/pagination.svelte';
	import Debug from '$lib/debug.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section class="page pokemon-items-page">
	<h1>Items</h1>

	<header class="page-header">
		<form method="get">
			<input
				type="text"
				name="search"
				placeholder="Search items..."
				value={data.search ?? ''}
				autocomplete="off"
			/>
			<button type="submit">Search</button>
		</form>
	</header>

	<div class="items-container">
		<ul class="items-list">
			{#each data.pokeitems as item}
				<li class="item-card" id="item-{item.id}">
					<a href={`/items/#`} class="block" aria-label={item.name}>
						<img src={item.image} alt={item.name} width="40" height="40" draggable="false" />
						<h2>{item.name}</h2>
					</a>
				</li>
			{/each}
		</ul>

		<nav class="pagination">
			<Pagination page={data.page} total={data.total} perPage={data.perPage} />
		</nav>
	</div>
</section>

<style>
	.pokemon-items-page {
		padding: 20px;
		max-width: 1200px;
		margin: 0 auto;
	}
	ul.items-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
		list-style: none;
		padding: 0;
	}

	ul.items-list li.item-card {
		height: 100%;
		min-height: 180px;
		text-align: center;
		border: 1px solid var(--red);
		border-radius: 8px;
		padding: 15px;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: relative;
		overflow: hidden;
		cursor: pointer;
	}
	ul.items-list li.item-card h2 {
		position: relative;
		font-size: 1.2rem;
		font-family: 'violet', sans-serif;
		text-transform: uppercase;
		z-index: 1;
	}
	ul.items-list li.item-card a {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}
	ul.items-list li.item-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 50%;
		background: linear-gradient(0deg, #ffffff31, var(--red) 80%);
		opacity: 0.8;
		z-index: 0;
	}
	ul.items-list li.item-card img {
		position: relative;
		width: 100%;
		max-width: 50px;
		height: auto;
		aspect-ratio: 1/1;
		z-index: 1;
	}

	ul.items-list li.item-card:hover img {
		animation: hover 0.5s ease-in-out forwards;
	}
	@keyframes hover {
		0% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-10px) rotate(-45deg);
		}
		75% {
			transform: translateY(0px) rotate(45deg);
		}
		100% {
			transform: translateY(0px) rotate(0deg);
		}
	}
</style>
