import type { Phrase, Word } from './types';

const order = 'ptkcwljmnshaieou'.split('');

export function sortAlphabetically(
	a: string | Word | Phrase,
	b: string | Word | Phrase
) {
	if (typeof a === 'object') {
		if ('word' in a) a = a.word;
		else a = a.phrase;
	}
	if (typeof b === 'object') {
		if ('word' in b) b = b.word;
		else b = b.phrase;
	}

	const length = Math.min(a.length, b.length);

	for (let i = 0; i < length; i++) {
		const aIndex = order.indexOf(a[i]);
		const bIndex = order.indexOf(b[i]);

		if (aIndex !== bIndex) {
			return aIndex - bIndex;
		}
	}

	return a.length - b.length;
}
