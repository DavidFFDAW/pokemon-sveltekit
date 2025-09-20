<script lang="ts">
  export let data;
</script>

<pre class="debug">
  {JSON.stringify(data, null, 2)}
</pre>

<style>
	.debug {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		background: #212121;
		padding: 10px;
		max-height: 100dvh;
		overflow: auto;
		font-size: 12px;
		color: orange;
	}
</style>