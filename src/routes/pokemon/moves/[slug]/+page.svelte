<script lang="ts">
	import Debug from '$lib/debug.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{#await data.moveData}
	<p>Cargando...</p>
{:then data}
	<Debug {data} />
{:catch error}
	<p>Error: {error.message}</p>
	<Debug data={error} />
{/await}
