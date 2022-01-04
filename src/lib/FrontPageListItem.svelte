<script lang="ts">
	export let link: string;
	export let title: string;
	export let subtitle: string;
</script>

<div>
	<h3>
		<a href={link}>{title}</a>
	</h3>
	<div>{subtitle}</div>
</div>
