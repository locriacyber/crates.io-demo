<script lang="ts">
	import Icon from '$lib/Icon.svelte';

	export let label: string;
	export let value: string;
	export let icon: string;
</script>

<div>
	<span>{label}<Icon name={icon} /> </span>
	<span>{value}</span>
</div>
