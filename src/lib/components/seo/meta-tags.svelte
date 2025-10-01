<script lang="ts">
	import { DEFAULT_METAS } from "$lib/utils/metas.utils";

	export let pageDatas;
	$: metas = pageDatas.metas ? {...DEFAULT_METAS, ...pageDatas?.metas} : DEFAULT_METAS;
</script>

<svelte:head>
	<title>Dexplorer | {metas.title}</title>
	<meta name="description" content={metas.description} />
	<link rel="canonical" href={pageDatas.layout.canonical || ''} />
	<link rel="alternate" hrefLang="es" href={pageDatas.layout.canonical || ''} />
	<link rel="icon" href="{metas.favicon}" />
	<link rel="apple-touch-icon" href="{metas.favicon}" />
	<link rel="shortcut icon" href="{metas.favicon}" />
	<link rel="mask-icon" href="{metas.favicon}" color="#5bbad5" />
	<meta name="keywords" content={metas.keywords} />

	<meta property="og:title" content={metas.title} />
	<meta property="og:description" content={metas.description} />
	<meta property="og:image" content={metas.image || ''} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={pageDatas.layout.canonical || ''} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={metas.title} />
	<meta name="twitter:description" content={metas.description} />
	<meta name="twitter:image" content={metas.image || ''} />
	<meta name="twitter:url" content={pageDatas.layout.canonical || ''} />
</svelte:head>