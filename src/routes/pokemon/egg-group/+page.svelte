<script lang="ts">
    let { data } = $props();
</script>

<section class="egg-group-page">
	<header class="page-header page-heading">
		<h1 class="page-title">Grupos huevo</h1>
	</header>

	<div class="egg-group-list-container">
		<ul class="egg-group-list">
			{#each data.eggGroups as group}
				<li class="egg-group-list-item">
					<a href={`/pokemon/egg-group/${group.name}`} class="egg-group-list-link">
						{group.name}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.egg-group-page {
		padding: 20px;
	}
	.page-header {
		margin-bottom: 20px;
		text-align: center;
	}
	.page-title {
		font-size: 2rem;
	}
	.egg-group-list-container {
		display: flex;
		justify-content: center;
	}
	.egg-group-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 15px;
		width: 100%;
		max-width: 600px;
	}
	.egg-group-list-item {
		background-color: #f8f8f8;
		border: 1px solid #ddd;
		border-radius: 8px;
		text-align: center;
		padding: 10px;
	}
	.egg-group-list-link {
		text-decoration: none;
		font-weight: bold;
		font-size: 1.1rem;
		display: block;
		text-transform: capitalize;
	}
</style>