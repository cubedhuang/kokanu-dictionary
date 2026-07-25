import { error } from '@sveltejs/kit';
import type { Word } from '$lib/types';

export async function load({ fetch, params }) {
	const words: Word[] = await fetch('/api/words').then(r => r.json());

	const word = words.find(w => w.word === params.word);

	if (!word) {
		throw error(404, 'Word not found');
	}

	return { word };
}
