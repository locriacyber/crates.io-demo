<script lang="ts">
	import FrontPageListItem from './FrontPageListItem.svelte';
	export let crates: [object];
	export let title: string;
	import { getURI } from '$lib/utils';
</script>

<section>
	<h2>{title}</h2>
	<ol>
		{#each crates as crate}
			<li>
				<FrontPageListItem
					link={getURI("crates", crate.id)}
					title={crate.name}
					subtitle="v{crate.newest_version}"
				/>
			</li>
		{/each}
	</ol>
</section>
