<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>
<title>Mumble Death Clock</title>
<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<main class='min-h-screen bg-black'>
{@render children()}
</main>
