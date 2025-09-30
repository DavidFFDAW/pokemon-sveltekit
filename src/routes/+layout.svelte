<script lang="ts">
	import { slide } from 'svelte/transition';
	import MetaTags from '$lib/components/seo/meta-tags.svelte';
	import { navigating, page } from '$app/state';
	import Loader from '$lib/components/loader.svelte';
	import '../css/global.css';

	export let data;
</script>

<MetaTags pageDatas={page.data} />

<main class="app-main poke-main-container">
	<Loader {navigating} />
	{#key data.layout.canonical}
		<div class="poke-real-content">
			<slot></slot>
		</div>
	{/key}
</main>

<footer class="poke-footer"></footer>