<script lang="ts">
	import { darkMode } from '$lib/stores';
	import type { Word } from '$lib/types';

	import { selectedWord } from './stores';

	import WordDetails from '$lib/components/WordDetails.svelte';

	import Families from './Families.svelte';
	import SimilarWords from './SimilarWords.svelte';
	import StartingLetters from './StartingLetters.svelte';
	import Syllables from './Syllables.svelte';
	import Popup from '$lib/components/Popup.svelte';
	import WordTypes from './WordTypes.svelte';

	export let data;

	let selectedWordData: Word | null = null;

	$: if ($selectedWord || !$selectedWord) {
		selectedWordData =
			data.words.find(word => word.word === $selectedWord) ?? null;

		if (!selectedWordData) {
			$selectedWord = '';
		}
	}

	$: if (!selectedWordData) {
		$selectedWord = '';
	}
</script>

<svelte:head>
	<title>wisan ikama | Kokanu</title>

	<meta
		name="description"
		content="Interactive dictionary for the IAL Kokanu."
	/>
	<meta name="keywords" content="kokanu, dictionary, interactive" />

	<meta property="og:title" content="wisan ikama | Kokanu" />
	<meta
		property="og:description"
		content="Interactive dictionary for the IAL Kokanu."
	/>
</svelte:head>

<div class="flex justify-between items-end">
	<h1 class="text-3xl font-bold">wisan ikama</h1>

	<div class="flex gap-2">
		<a href="/" class="interactive p-2">
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
					d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
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

<Syllables words={data.words} />
<StartingLetters words={data.words} />
<WordTypes words={data.words} />
<Families words={data.words} />
<SimilarWords words={data.words} />

<Popup bind:value={selectedWordData} let:value={word}>
	<div class="flex justify-between">
		<a
			class="text-2xl hocus-visible:text-blue-500 transition"
			href="/{word.word}"
		>
			<span class="font-bold">{word.word}</span>
			<span class="ml-1 faded">{word.likanu}</span>
		</a>

		<button
			class="interactive p-1"
			on:click={() => {
				selectedWord.set('');
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5"
			>
				<path
					d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
				/>
			</svg>
		</button>
	</div>

	<WordDetails {word} />
</Popup>
