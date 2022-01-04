<script lang="ts">
	import FrontPageListItem from './FrontPageListItem.svelte';
	export let crates: [object];
	import { getURI } from '$lib/utils';
</script>

<section>
	<slot></slot>
	<ol>
		{#each crates as crate}
			<li>
				<slot name="item" item={crate}>
					<FrontPageListItem
						link={getURI("crates", crate.id)}
						title={crate.name}
						subtitle="v{crate.newest_version}"
					/>
				</slot>
			</li>
		{/each}
	</ol>
</section>
