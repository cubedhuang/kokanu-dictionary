<script lang="ts">
	import { wordTypeBackgroundColors, type Word } from '$lib/types';
	import WordDetails from './WordDetails.svelte';

	export let word: Word;
</script>

<div class="box relative overflow-hidden p-5">
	<div
		class="w-6 h-6 absolute -top-3 -left-3 rounded-full
			{wordTypeBackgroundColors[word.type]}"
	/>

	<a
		href="/{word.word}"
		class="text-xl hocus-visible:text-blue-500 transition"
	>
		<span class="font-bold">{word.word}</span>
		<span class="ml-1 faded font-noto">{word.likanu}</span>
	</a>

	<WordDetails {word} />
</div>
