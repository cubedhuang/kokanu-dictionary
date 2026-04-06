const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',

	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
				noto: ['"Noto Sans Variable"', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				kokanu: '#1d328f',
				'kokanu-dark': '#0d1742',
				'zinc-925': 'oklch(0.1725 0.006 285.885)'
			}
		}
	},

	plugins: [
		plugin(({ addVariant }) => {
			addVariant('hocus', ['&:hover', '&:focus']);
			addVariant('hocus-visible', ['&:hover', '&:focus-visible']);
			addVariant('group-hocus', ['.group:hover &', '.group:focus &']);
			addVariant('group-hocus-visible', [
				'.group:hover &',
				'.group:focus-visible &'
			]);
		})
	]
};

module.exports = config;
