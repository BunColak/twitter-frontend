<script>
    import 'bulma/css/bulma.min.css'
    import AppRouter from "./router/AppRouter.svelte";
    import {initClient} from "@urql/svelte";
    import {user} from "./stores/userStore";

    initClient({
        url: 'https://twitter-mock.hasura.app/v1/graphql',
        fetchOptions: () => {
            const headers = {}
            if ($user?.token) headers['authorization'] = `Bearer ${$user.token}`
            return {
                headers
            };
        },
    });
</script>

<div class="has-background-grey-lighter full-height">
<AppRouter/>
</div>


<style>
    .full-height {
        min-height: 100vh;
    }
</style>