import type { Word, WordType } from '$lib/types';

export async function load({ fetch }) {
	const words: Word[] = await fetch('/api/words').then(r => r.json());

	const types = new Set<string>();

	for (const word of words) {
		types.add(word.type);
	}

	return {
		words,
		types: [...types].sort() as WordType[]
	};
}
