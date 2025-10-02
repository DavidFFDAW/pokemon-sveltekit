<script lang="ts">
	import MetaTags from '$lib/components/seo/meta-tags.svelte';
	import { navigating, page } from '$app/state';
	import Loader from '$lib/components/loader.svelte';
	import '../css/global.css';

	export let data;
</script>

<MetaTags pageDatas={page.data} />

<main class="app-main poke-main-container {data.layout.route}">
	<Loader {navigating} />
	{#key data.layout.canonical}
		<div class="poke-real-content notransition">
			<slot></slot>
		</div>
	{/key}
</main>

<style>
	.poke-real-content {
		padding: 12px var(--page-padding);
	}
	.app-main.poke-main-container.home .poke-real-content,
	.app-main.poke-main-container.pokemon-slug .poke-real-content {
		padding: 0;
	}
</style>