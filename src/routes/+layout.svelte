<script lang="ts">
	import { slide } from 'svelte/transition';
	import '../css/global.css';
	import MetaTags from '$lib/components/seo/meta-tags.svelte';
	import { page } from '$app/state';
	export let data;
</script>

<MetaTags pageDatas={page.data} />

<main class="app-main poke-main-container">
	{#key data.layout.canonical}
		<div class="poke-real-content" transition:slide={{ duration: 300, axis: 'x' }}>
			<slot></slot>
		</div>
	{/key}
</main>

<footer class="poke-footer"></footer>
