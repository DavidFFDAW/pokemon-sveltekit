<script lang="ts">
	import Pagination from '$lib/components/pagination.svelte';
	import Debug from '$lib/debug.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section class="page pokemon-items-page">
	<h1>Items</h1>

	<div class="items-container">
		<ul class="items-list">
			{#each data.pokeitems as item}
				<li class="item-card">
					<img src={item.image} alt={item.name} width="96" height="96" draggable="false" />
					<h2>{item.name}</h2>
					<p>{item.name}</p>
					<small>{item.effect}</small>
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
	}

	ul.items-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 20px;
		list-style: none;
		padding: 0;
	}

	ul.items-list li.item-card {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
		text-align: center;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 15px;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: relative;
		overflow: hidden;
        cursor: pointer;
	}
	/* ul.items-list li.item-card::after {
		content: '';
		position: absolute;
		bottom: -50px;
		right: -140px;
		width: 110%;
		height: 150px;
		transform: rotate(-35deg);
		background: var(--red);
		pointer-events: none;
		opacity: 0.7;
		z-index: 0;
	} */
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

	ul.items-list li.item-card small {
		position: relative;
		padding: 5px 10px;
		font-size: 0.85rem;
		color: #555;
		background-color: #f9f9f9;
		border-radius: 4px;
		z-index: 1;
	}
	ul.items-list li.item-card img {
		position: relative;
		max-width: 80px;
		height: auto;
		z-index: 1;
	}
</style>
