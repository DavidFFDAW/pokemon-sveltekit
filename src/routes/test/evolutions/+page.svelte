<script lang="ts">
	import Debug from '$lib/debug.svelte';
    import type { PageProps } from './$types';
    let { data }: PageProps = $props();
</script>

<Debug data={data} />