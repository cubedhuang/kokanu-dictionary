import { error } from '@sveltejs/kit';
import type { Phrase } from '$lib/types';

export async function load({ fetch, params }) {
	const phrases: Phrase[] = await fetch('/api/phrases').then(r => r.json());

	const realPhrase = params.phrase.replaceAll('-', ' ');
	const phrase = phrases.find(w => w.phrase === realPhrase);

	if (!phrase) {
		throw error(404, 'Phrase not found');
	}

	return { phrase };
}
