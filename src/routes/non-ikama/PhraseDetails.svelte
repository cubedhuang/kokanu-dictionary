<script lang="ts">
	import type { Phrase } from '$lib/types';

	export let phrase: Phrase;
	export let compact = true;
</script>

<div class:compact>
	<p class="faded">{phrase.type.toLowerCase()}</p>
	<p class="space">{phrase.meaning}</p>
</div>

<style lang="postcss">
	.space {
		@apply mt-4;
	}

	.compact .space {
		@apply mt-2;
	}
</style>
