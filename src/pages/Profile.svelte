<script>
    import {useParams} from "svelte-navigator";
    import ProfilePageQuery from '../graphql/ProfilePageQuery.graphql'
    import {operationStore, query} from "@urql/svelte";
    import Tweet from "../components/Tweet.svelte";

    const params = useParams()
    const username = $params.username
    const response = operationStore(ProfilePageQuery, {username})
    query(response)
</script>


<div class="container pt-4">
    {#if $response.fetching}
        <div>Loading</div>
    {:else if $response.error}
        <div>Error</div>
    {:else }
        <div class="columns mt-0">
            <div class="column is-4 is-offset-4 content">
                <h5>Profile</h5>
                <div class="box is-shadowless">
                    <p>@{$response.data.users[0].username}</p>
                </div>
                <div>
                    <h5>Tweets</h5>
                    {#each $response.data.tweets as tweet}
                        <Tweet tweet={tweet}/>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>