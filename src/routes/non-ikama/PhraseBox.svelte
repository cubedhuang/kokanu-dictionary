<script lang="ts">
	import { wordTypeBackgroundColors, type Phrase } from '$lib/types';
	import PhraseDetails from './PhraseDetails.svelte';

	export let phrase: Phrase;
</script>

<div class="box relative overflow-hidden p-5">
	<div
		class="w-6 h-6 absolute -top-3 -left-3 rounded-full
			{wordTypeBackgroundColors[phrase.type]}"
	/>

	<a
		href="/non-ikama/{phrase.phrase.replaceAll(' ', '-')}"
		class="text-xl hocus-visible:text-blue-500 transition"
	>
		<span class="font-bold">{phrase.phrase}</span>
		<span class="ml-1 faded font-noto">{phrase.likanu}</span>
	</a>

	<PhraseDetails {phrase} />
</div>
