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
		<CrateList title="New Crates" crates={data.new_crates} />
		<CrateList title="Most Downloaded" crates={data.most_downloaded} />
		<CrateList title="Just Updated" crates={data.just_updated} />
		<CrateList title="Most Recent Downloads" crates={data.most_recently_downloaded} />

		<section>
			<h2>Popular Keywords</h2>
			<!-- <CrateList title="Popular Keywords <a href={getRoute('keywords')}>(see all)</a>" crates={data.popular_keywords}/> -->
			<ul>
				{#each data.popular_keywords as keyword}
					<li>
						<FrontPageListItem
							link={getURI('keyword', keyword)}
							title={keyword.id}
							subtitle="{formatNum(keyword.crates_cnt)} crates"
						/>
					</li>
				{/each}
			</ul>
		</section>

		<section>
			<h2>Popular Categories</h2>
			<!-- <CrateList title="Popular Categories <a href={getRoute('categories')}>(see all)</a>" crates={data.popular_categories}/> -->
			<ul>
				{#each data.popular_categories as category}
					<li>
						<FrontPageListItem
							link={getURI('category', category.slug)}
							title={category.category}
							subtitle="{formatNum(category.crates_cnt)} crates"
						/>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</main>

<style lang="scss">
	#crates {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}
</style>
