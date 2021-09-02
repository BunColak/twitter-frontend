<script>
    import {Route} from 'svelte-navigator'
    import PageGuard from './PageGuard.svelte'

    export let path
</script>

<Route {path} let:params let:location let:navigate>
    <PageGuard>
        <slot {params} {location} {navigate}></slot>
    </PageGuard>
</Route>

