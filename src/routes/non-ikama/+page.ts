import type { Word, WordType } from '$lib/types';

export async function load({ fetch }) {
	const phrases: Word[] = await fetch('/api/phrases').then(r => r.json());

	const types = new Set<string>();

	for (const phrase of phrases) {
		types.add(phrase.type);
	}

	return {
		phrases,
		types: [...types].sort() as WordType[]
	};
}
