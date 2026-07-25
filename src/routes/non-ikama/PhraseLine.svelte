<script lang="ts">
	import { wordTypeTextColors, type Phrase } from '$lib/types';

	export let phrase: Phrase;
</script>

<p>
	<a
		href="/non-ikama/{phrase.phrase.replaceAll(' ', '-')}"
		class="hocus-visible:text-blue-500 transition"
	>
		<span class="font-bold">{phrase.phrase}</span>
		&middot;
		<span class="font-bold font-noto">{phrase.likanu}</span>
	</a>
	<span class="text-xs {wordTypeTextColors[phrase.type]}">
		{phrase.type.toLowerCase()}
	</span>
	<span>{phrase.meaning}</span>
</p>
