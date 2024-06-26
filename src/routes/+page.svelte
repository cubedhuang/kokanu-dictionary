<script lang="ts">
	import { distance } from 'fastest-levenshtein';
	import VirtualScroll from 'svelte-virtual-scroll-list';

	import { darkMode, savedWritable } from '$lib/stores';
	import { wordTypeBorderColors, type Word } from '$lib/types';

	import WordLine from '$lib/components/WordLine.svelte';
	import WordBox from '$lib/components/WordBox.svelte';

	export let data;

	const view = savedWritable<'normal' | 'compact'>('wordView', 'normal');

	let shownTypes: string[] = [];

	const normalize = (str: string) =>
		str
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.trim();

	let search = '';
	$: fixedSearch = normalize(search);

	function scoreMatch(str: string) {
		if (!str) return 0;

		const normalized = normalize(str);

		const includes = normalized.includes(fixedSearch);

		if (includes) {
			return str === fixedSearch ? 10 : 1;
		}

		const distanceScore =
			distance(normalized, fixedSearch) / (normalized.length + 1);

		if (distanceScore > 0.5) return 0;

		return 1 - distanceScore;
	}

	function scoreWord(word: Word) {
		return (
			scoreMatch(word.word) * 100 +
			scoreMatch(word.meaning) * 50 +
			scoreMatch(word.noun) * 20 +
			scoreMatch(word.verb) * 20 +
			scoreMatch(word.modifier) * 20 +
			scoreMatch(word.type) * 20 +
			scoreMatch(word.origin) * 20 +
			scoreMatch(word.family) * 20
		);
	}

	$: genericFilteredWords = !shownTypes.length
		? data.words
		: data.words.filter((word: Word) => shownTypes.includes(word.type));

	$: filteredWords = !fixedSearch
		? genericFilteredWords
		: genericFilteredWords
				.map(word => [word, scoreWord(word)] as [Word, number])
				.filter(([_, score]) => score > 19)
				.sort(([, a], [, b]) => b - a)
				.map(([word]) => word);

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
	<h1 class="text-3xl font-bold">pata je iwe ikama</h1>

	<div class="flex gap-2">
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
				? 'hocus-visible:bg-gray-100 dark:hocus-visible:bg-gray-800'
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
