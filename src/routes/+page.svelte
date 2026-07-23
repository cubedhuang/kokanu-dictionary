<script lang="ts">
	import VirtualScroll from 'svelte-virtual-scroll-list';
	import Fuse, { type IFuseOptions } from 'fuse.js';

	import { darkMode, savedWritable } from '$lib/stores';
	import { wordTypeBorderColors, type Word } from '$lib/types';

	import WordLine from '$lib/components/WordLine.svelte';
	import WordBox from '$lib/components/WordBox.svelte';

	export let data;

	const FUSE_OPTIONS: IFuseOptions<Word> = {
		keys: [
			{ name: 'word', weight: 1 },
			{ name: 'likanu', weight: 1 },
			{ name: 'meaning', weight: 1 },
			{ name: 'synonyms', weight: 0.5 },
			{ name: 'noun', weight: 0.4 },
			{ name: 'verb', weight: 0.4 },
			{ name: 'modifier', weight: 0.4 },
			{ name: 'origin', weight: 0.2 },
			{ name: 'family', weight: 0.2 },
			{ name: 'antonym', weight: 0.1 }
		],
		ignoreLocation: true,
		threshold: 0.2,
		useExtendedSearch: true
	};

	const view = savedWritable<'normal' | 'compact'>('wordView', 'normal');

	let shownTypes: string[] = [];

	let search = '';

	$: genericFilteredWords = !shownTypes.length
		? data.words
		: data.words.filter((word: Word) => shownTypes.includes(word.type));
	$: fuse = new Fuse(genericFilteredWords, FUSE_OPTIONS);
	$: filteredWords = search.trim()
		? fuse.search(search).map(result => result.item)
		: genericFilteredWords;

	function group6<T>(array: T[]): T[][] {
		const result: T[][] = [];

		for (let i = 0; i < array.length; i += 6) {
			const group = array.slice(i, i + 6);

			// @ts-expect-error Required for VirtualScroll
			group.key = i;

			result.push(group);
		}

		return result;
	}
</script>

<svelte:head>
	<title>pata je iwe ikama | Kokanu</title>

	<meta
		name="description"
		content="Interactive dictionary for the IAL Kokanu."
	/>
	<meta name="keywords" content="kokanu, dictionary, interactive" />

	<meta property="og:title" content="pata je iwe ikama" />
	<meta
		property="og:description"
		content="Interactive dictionary for the IAL Kokanu."
	/>
</svelte:head>

<div class="flex justify-between items-end">
	<h1 class="text-2xl sm:text-3xl font-bold">pata je iwe ikama</h1>

	<div class="flex gap-2">
		<a
			href="https://github.com/cubedhuang/kokanu-dictionary"
			class="interactive p-2"
			target="_blank"
			rel="noopener noreferrer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="w-6 h-6"
				><path
					d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
				/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
			>
		</a>

		<a href="/wisan-ikama" class="interactive p-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
				/>
			</svg>
		</a>

		<button
			class="interactive p-2"
			on:click={() => {
				darkMode.update(value => !value);
			}}
		>
			{#if $darkMode}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
					/>
				</svg>
			{/if}
		</button>
	</div>
</div>

<p class="mt-4">Interactive dictionary for the IAL Kokanu.</p>

<p class="mt-4">
	<select class="interactive px-2 py-1" bind:value={$view}>
		<option value="normal">Normal View</option>
		<option value="compact">Compact View</option>
	</select>
</p>

<div class="mt-2 flex gap-1 flex-wrap">
	{#each data.types as type}
		{@const active = shownTypes.includes(type)}

		<label
			class="box px-2 py-1 cursor-pointer transition
				{active
				? 'hocus-visible:bg-zinc-100 dark:hocus-visible:bg-zinc-800'
				: 'faded border-opacity-25 dark:border-opacity-25'}
				{wordTypeBorderColors[type]}"
		>
			<input
				type="checkbox"
				class="sr-only"
				bind:group={shownTypes}
				value={type}
			/>
			{type}
		</label>
	{/each}
</div>

<p class="mt-4">
	<span class="faded">
		{filteredWords.length} /
		{genericFilteredWords.length}
	</span>

	<input
		type="text"
		class="mt-1 block input px-4 py-2"
		placeholder="o jatan..."
		bind:value={search}
	/>
</p>

{#if $view === 'normal'}
	{@const groupedWords = group6(filteredWords)}

	<VirtualScroll
		data={groupedWords}
		key="key"
		let:data={group}
		pageMode
		keeps={10}
	>
		<div class="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each group as word (word.word)}
				<WordBox {word} />
			{/each}
		</div>
	</VirtualScroll>
{:else}
	<div class="mt-4">
		<VirtualScroll
			data={filteredWords}
			key="word"
			let:data={word}
			pageMode
			keeps={100}
		>
			<WordLine {word} />
		</VirtualScroll>
	</div>
{/if}
