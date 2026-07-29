<script lang="ts">
  let { data } = $props();
</script>

<div class="container">
  <pre>{JSON.stringify(data, null, 2)}</pre>
</div>

<style></style>