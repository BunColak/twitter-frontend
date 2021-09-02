<script>
    import { useNavigate } from 'svelte-navigator'
    import {user} from '../stores/userStore'

    const navigate = useNavigate()

    $: if (!$user) {
        navigate("/login", {replace: true})
    }
</script>

{#if $user}
    <slot></slot>
{/if}