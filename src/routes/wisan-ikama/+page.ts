import type { Word } from '$lib/types';

export function load({ fetch }) {
	return {
		words: fetch('/api/words').then(r => r.json()) as Promise<Word[]>
	};
}
