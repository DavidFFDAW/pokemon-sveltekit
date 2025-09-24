<script lang="ts">
	import { page as _page } from "$app/state";
	export let page: number;
  	export let total: number;
	export let perPage: number;

	const getPaginationURL = (page: number) => {
		const url = _page.url;
		url.searchParams.set('page', page.toString());
		return url.toString();
	};

	$: totalPages = Math.ceil(total / perPage);
	$: smallerPages = Array.from({ length: totalPages }, (_, i) => i + 1);
</script>

<div class="pagination pagination-component pagination-container">
	{#if page > 1}
		<a href={getPaginationURL(page - 1)} class="pagination-item page-prev">&lt;</a>
	{/if}

	<div class="pagination-overflow">
		{#each smallerPages.slice(0, page - 1) as p}
			<a href="{getPaginationURL(p)}" class="pagination-item">{p}</a>
		{/each}

		<span class="pagination-item current-page">{page}</span>
		
		{#each smallerPages.slice(page, page + 2) as p}
		<a href="{getPaginationURL(p)}" class="pagination-item">{p}</a>
		{/each}
	</div>

	{#if page < totalPages}
		<a href={getPaginationURL(page + 1)} class="pagination-item page-next">&gt;</a>
	{/if}
	<a href={getPaginationURL(totalPages)} class="pagination-item page-last">{totalPages}</a>
</div>

<style>
	.pagination.pagination-component {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 0;
		gap: 10px;
	}
	.pagination-overflow {
		display: flex;
		align-items: center;
		gap: 5px;
		overflow-x: auto;
	}
	.pagination.pagination-component .pagination-item {
		padding: 8px 12px;
		background-color: #fff;
		border: 1px solid #ccc;
		color: #333;
		text-decoration: none;
		border-radius: 8px;
		cursor: pointer;
	}
	.pagination.pagination-component .pagination-item.current-page {
		background-color: var(--red);
		border: 1px solid var(--red);
		font-weight: bold;
		cursor: pointer;
		color: #fff;
	}
</style>