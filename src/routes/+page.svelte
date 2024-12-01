<script>
    let {data} = $props()
</script>

{#if data.factura.length > 0}
    <h1>Facturas</h1>
    <ul>
        {#each data.factura as factura}
            <li>{factura.estado} </li>
        {/each}
    </ul>
{:else}
    <h1>No hay facturas</h1>
{/if}

<h2>Hola Mundo</h2>

<h1>Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
</p>

<p>Esto es un parrafo normal sin afectación por tailwind</p>

<a href="/">Regresemos a la página inicial del sitio</a>

<style>
	@import 'tailwindcss/theme';

	h2 {
		@apply font-bold text-5xl
       shadow-lg text-center w-6/12
       mx-auto my-15 text-[rgba(100,0,100,0.5)];
	}

	p {
		@apply text-red-600 text-2xl my-1;
	}
	a {
		@apply text-blue-600 underline;
	}
</style>
