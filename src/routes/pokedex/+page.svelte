<script lang="ts">
    let { data } = $props();
</script>

<section class="page page-regions-pokedex">
    <header class="page-header">
        <h1 class="violet uppercase">Pokedex de Regiones</h1>
    </header>

    <ul class="regions-list">
        {#each data.regions as region}
            <li class="region-item">
                <a href="/pokedex/{region.name}" class="capitalize">{region.name}</a>
            </li>
        {/each}
    </ul>
</section>

<style>
    .page.page-regions-pokedex {
        margin: 0 auto;
        max-width: 1200px;
        padding: 10px 15px 50px 15px;
    }

    .page.page-regions-pokedex .regions-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 15px;
    }
    .page.page-regions-pokedex .regions-list .region-item > a {
        width: 100%;
        padding: 15px;
        display: block;
        background: #fff;
        border-radius: 50px;
        border: 1px solid #ccc;
        text-align: center;
    }

</style>