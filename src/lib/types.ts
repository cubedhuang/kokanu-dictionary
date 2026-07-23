export type WordType =
	| 'Connector'
	| 'Demonstrative'
	| 'Grammar'
	| 'Modifier'
	| 'Noun'
	| 'Preposition'
	| 'Pronoun'
	| 'Quantity'
	| 'Verb';

export type Word = {
	word: string;
	likanu: string;
	type: WordType;

	meaning: string;
	noun: string;
	verb: string;
	modifier: string;
	antonym: string;
	synonyms: string;

	origin: string;
	ipa: string;
	family: string;
};

export const wordTypeBackgroundColors: Record<WordType, string> = {
	Connector: 'bg-rose-500 dark:bg-rose-600',
	Demonstrative: 'bg-red-700 dark:bg-red-800',
	Grammar: 'bg-orange-400 dark:bg-orange-600',
	Modifier: 'bg-yellow-400 dark:bg-yellow-600',
	Noun: 'bg-emerald-400 dark:bg-emerald-600',
	Preposition: 'bg-cyan-400 dark:bg-cyan-600',
	Pronoun: 'bg-blue-400 dark:bg-blue-600',
	Quantity: 'bg-violet-400 dark:bg-violet-600',
	Verb: 'bg-fuchsia-400 dark:bg-fuchsia-600'
};

export const wordTypeTextColors: Record<WordType, string> = {
	Connector: 'text-rose-600 dark:text-rose-400',
	Demonstrative: 'text-red-800 dark:text-red-600',
	Grammar: 'text-orange-600 dark:text-orange-400',
	Modifier: 'text-yellow-600 dark:text-yellow-400',
	Noun: 'text-emerald-600 dark:text-emerald-400',
	Preposition: 'text-cyan-600 dark:text-cyan-400',
	Pronoun: 'text-blue-600 dark:text-blue-400',
	Quantity: 'text-violet-600 dark:text-violet-300',
	Verb: 'text-fuchsia-600 dark:text-fuchsia-400'
};

export const wordTypeBorderColors: Record<WordType, string> = {
	Connector: 'border-rose-500 dark:border-rose-600',
	Demonstrative: 'border-red-700 dark:border-red-800',
	Grammar: 'border-orange-400 dark:border-orange-600',
	Modifier: 'border-yellow-400 dark:border-yellow-600',
	Noun: 'border-emerald-400 dark:border-emerald-600',
	Preposition: 'border-cyan-400 dark:border-cyan-600',
	Pronoun: 'border-blue-400 dark:border-blue-600',
	Quantity: 'border-violet-400 dark:border-violet-600',
	Verb: 'border-fuchsia-400 dark:border-fuchsia-600'
};
