<script lang="ts">
	import type { Word } from '$lib/types';

	import Separator from './Separator.svelte';
	import Table from './Table.svelte';

	export let words: Word[];

	$: languageGroups = words.reduce((acc, word) => {
		const name = word.family;

		if (acc.has(name)) {
			acc.get(name)!.push(word.word);
		} else {
			acc.set(name, [word.word]);
		}

		return acc;
	}, new Map<string, string[]>());
</script>

<Separator>Families</Separator>
<Table items={languageGroups} />
