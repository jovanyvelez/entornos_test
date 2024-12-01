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
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
