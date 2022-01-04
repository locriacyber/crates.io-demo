<script context="module" lang="ts">
	export const prerender = true;
	export async function load({ fetch }) {
		const url = 'https://crates.io/api/v1/summary';
		const res = await fetch(url);
		if (res.ok) {
			const data = await res.json();
			return {
				props: {
					data
				}
			};
		} else {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}
	}
</script>

<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import CrateList from '$lib/CrateList.svelte';
	import FrontPageListItem from '$lib/FrontPageListItem.svelte';
	import StatsValue from '$lib/StatsValue.svelte';
	import { onMount } from 'svelte';
	import { formatNum, getURI, getRoute } from '$lib/utils';
	export let data;

	$: num_downloads = data ? formatNum(data.num_downloads) : '---,---,---';
	$: num_crates = data ? formatNum(data.num_crates) : '---,---,---';

	onMount(() => {
		console.log(data);
	});
</script>

<svelte:head>
	<title>crates.io: Rust Package Registry</title>
</svelte:head>

<header>
	<nav>
		<a href="https://doc.rust-lang.org/cargo/getting-started/installation.html">
			<Icon name="download-arrow" />
			Install Cargo
		</a>

		<a href="https://doc.rust-lang.org/cargo/guide/">
			<Icon name="flag" />
			Getting Started
		</a>
	</nav>

	<p>
		Instantly publish your crates and install them. Use the API to interact and find out more
		information about available crates. Become a contributor and enhance the site with your work.
	</p>

	<StatsValue label="Downloads" value={num_downloads} icon="file-archive" />
	<StatsValue label="Crates in stock" value={num_crates} icon="box" />
</header>

<main>
	<div id="crates">
		<CrateList crates={data.new_crates}>
			<h2>New Crates</h2>
		</CrateList>
		<CrateList crates={data.most_downloaded}>
			<h2>Most Downloaded</h2>
		</CrateList>
		<CrateList crates={data.just_updated}>
			<h2>Just Updated</h2>
		</CrateList>
		<CrateList crates={data.most_recently_downloaded}>
			<h2>Most Recent Downloads</h2>
		</CrateList>

		<CrateList crates={data.popular_keywords}>
			<h2>Popular Keywords</h2>
			<a href={getRoute('keywords')}>(see all)</a>

			<svelte:fragment slot="item" let:item={keyword}>
				<FrontPageListItem
					link={getURI('keyword', keyword)}
					title={keyword.id}
					subtitle="{formatNum(keyword.crates_cnt)} crates"
				/>
			</svelte:fragment>
		</CrateList>

		<CrateList crates={data.popular_categories}>
			<h2>Popular Categories</h2>
			<a href={getRoute('categories')}>(see all)</a>

			<svelte:fragment slot="item" let:item={category}>
				<FrontPageListItem
					link={getURI('category', category.slug)}
					title={category.category}
					subtitle="{formatNum(category.crates_cnt)} crates"
				/>
			</svelte:fragment>
		</CrateList>
	</div>
</main>

<style lang="scss">
	#crates {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}
</style>
