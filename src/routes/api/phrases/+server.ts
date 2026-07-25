import { json } from '@sveltejs/kit';
import { GOOGLE_KEY } from '$env/static/private';
import type { Phrase } from '$lib/types';
import { sortAlphabetically } from '$lib/util.js';

const SHEETS_API_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';
const SHEET_NAME = 'Phrases';
const SHEET_ID = '1SiXXmQUrQ2KI7SRV3Hp_FP53HDteuuMF1ZJ_d_AwBr4';

const keys: Record<string, keyof Phrase> = {
	Phrase: 'phrase',
	xʃxƨſ: 'likanu',
	Type: 'type',
	Meaning: 'meaning'
};

export async function GET({ fetch, setHeaders }) {
	const url = `${SHEETS_API_BASE}/${SHEET_ID}/values/${SHEET_NAME}?key=${GOOGLE_KEY}`;
	const response = await fetch(url);

	if (!response.ok) {
		console.error(
			'Google Sheets API error:',
			response.status,
			response.statusText
		);
		return json([]);
	}

	const data = await response.json();

	if (!data.values) {
		return json([]);
	}

	const firstRow = data.values.shift() as string[];

	const phrases = data.values
		.map((row: string[]) => {
			const w = {} as Phrase;
			for (let i = 0; i < row.length; i++) {
				const key = keys[firstRow[i]];
				// @ts-expect-error: WordType should always be correct
				w[key] = row[i];
			}
			return w;
		})
		.sort(sortAlphabetically);

	setHeaders({
		'Cache-Control': 's-maxage=3600'
	});

	return json(phrases);
}
