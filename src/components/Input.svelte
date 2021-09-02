<script>
    export let value;
    export let type = "text";
    export let name = ""
    export let label = ""
    export let hasError = false
    export let errorMessage = ""
    const onInput = e => (value = e.target.value);
</script>

<div class="field">
    <label class="label">{label}</label>
    <div class="control" class:has-icons-left={$$slots.icon}>
        <slot name="icon"></slot>
        <input {value} on:input={onInput} class:is-danger={hasError} class="input" {type}
               {name}/>
        {#if hasError}
            <span class="help is-danger">{errorMessage}</span>
        {/if}
    </div>
</div>