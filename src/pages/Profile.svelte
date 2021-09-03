<script>
    import {useParams} from "svelte-navigator";
    import ProfilePageQuery from '../graphql/ProfilePageQuery.graphql'
    import {operationStore, query} from "@urql/svelte";
    import Tweet from "../components/Tweet.svelte";
    import {user} from "../stores/userStore";

    const params = useParams()
    const username = $params.username

    const response = operationStore(ProfilePageQuery, {username, userId: $user.userId})
    query(response)
    $: profile = $response.fetching || $response.error ? {} : $response.data.users[0]
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
                    <div class="block is-flex is-justify-content-space-between is-align-items-center">
                        <p class="mb-0">@{profile.username}</p>
                        {#if profile.is_followed.aggregate.count === 0 && String(profile.id) !== $user.userId}
                            <button class="button is-primary is-small">Follow</button>
                        {:else if String(profile.id) !== $user.userId}
                            <button class="button is-outlined is-small">Following!</button>
                        {/if}
                    </div>
                    <div class="block">
                        <span class="label">{profile.total_followers.aggregate.count}</span>
                        <span>Followers</span>
                    </div>
                </div>
                <div>
                    <h5>Tweets</h5>
                    {#each profile.tweets as tweet}
                        <Tweet tweet={tweet}/>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>