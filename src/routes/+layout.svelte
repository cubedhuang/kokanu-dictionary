<script>
	import '../app.postcss';

	import { darkMode } from '$lib/stores';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	darkMode.subscribe(value => {
		if (
			!browser ||
			document.documentElement.classList.contains('dark') === value
		) {
			return;
		}

		document.documentElement.classList.add('no-transition');
		document.documentElement.classList.toggle('dark', value);

		// Force a reflow to make sure the transition is triggered
		document.documentElement.offsetWidth;

		document.documentElement.classList.remove('no-transition');
	});

	const links = [
		{
			href: '/',
			name: 'niwa'
		},
		{
			href: '/non-ikama',
			name: 'non ikama'
		},
		{
			href: '/wisan-ikama',
			name: 'wisan ikama'
		}
	];
</script>

<svelte:head>
	<script>
		if (localStorage.getItem('kokanu:darkMode') === null) {
			localStorage.setItem(
				'kokanu:darkMode',
				window
					.matchMedia('(prefers-color-scheme: dark)')
					.matches.toString()
			);
		}

		document.documentElement.classList.toggle(
			'dark',
			localStorage.getItem('kokanu:darkMode') === 'true'
		);
	</script>
</svelte:head>

<div class="bg-kokanu dark:bg-kokanu-dark flex">
	<nav class="w-full wrapper flex flex-wrap items-center">
		<a href="/" class="flex pt-2" aria-label="Home">
			<img
				src="/banner.png"
				alt=""
				width="204"
				height="80"
				class="mt-auto w-32"
			/>
		</a>

		<div
			aria-hidden="true"
			class="w-0.5 bg-blue-500 dark:bg-blue-800 h-6 self-center rounded-full mx-4"
		/>

		{#each links as link}
			{@const active = link.href === $page.url.pathname}
			<a
				href={link.href}
				class="text-sm mr-0.5 border-2 px-2 py-1 rounded-lg transition font-medium
				    {active
					? 'text-white cursor-default border-blue-600 bg-blue-700 dark:border-blue-800 dark:bg-blue-900'
					: 'text-blue-200 border-transparent hocus:text-white'}"
			>
				{link.name}
			</a>
		{/each}

		<a
			href="https://kokanu.com"
			class="ml-auto text-sm flex text-blue-200 hocus:text-white transition font-medium"
		>
			kokanu.com
		</a>
	</nav>
</div>

<div class="wrapper mt-8 mb-32">
	<slot />
</div>
