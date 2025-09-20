<script lang="ts">
	export let promise: Promise<any>;
	export let promiseData: any;

	$: {
		promiseData = promise.then((data) => data);
	}
</script>

{#await promise}
	<p>Cargando...</p>
  {:then data}
	<slot />
  {:catch error}
    <p style="color: red;">Error: {error.message}</p>
{/await}
