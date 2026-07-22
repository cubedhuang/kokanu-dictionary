<script lang="ts">
	import type { Word } from '$lib/types';

	export let word: Word;
	export let compact = true;
	export let showSynonyms = false;
</script>

<div class:compact>
	<p class="faded">{word.type.toLowerCase()}</p>
	<p class="space">{word.meaning}</p>

	{#if showSynonyms && word.synonyms && word.synonyms !== '-'}
	<p class="mt-2">
		<b>Synonyms</b> &middot;
		{word.synonyms}
	</p>
	{/if}

	{#if word.noun !== '-'}
		<p class="space">
			<b>Noun</b> &middot;
			{word.noun}
		</p>
		<p>
			<b>Verb</b> &middot;
			{word.verb}
		</p>
		<p>
			<b>Modifier</b> &middot;
			{word.modifier}
		</p>
	{/if}

	{#if word.antonym}
		<p class="space">
			<b>Antonym</b> &middot;
			{word.antonym}
		</p>
	{/if}

	{#if word.origin && word.origin !== '-'}
		<p class="space">
			<span class="faded"> from </span>
			{word.origin}
			{#if word.ipa}
				{word.ipa}
			{/if}
		</p>
		<p>
			{word.family} family
		</p>
	{/if}
</div>

<style lang="postcss">
	.space {
		@apply mt-4;
	}

	.compact .space {
		@apply mt-2;
	}
</style>
