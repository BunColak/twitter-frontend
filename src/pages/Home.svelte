<script>
    import {operationStore, query} from "@urql/svelte";
    import HomePageQuery from '../graphql/HomePageQuery.graphql'
    import {user} from "../stores/userStore";
    import Tweet from "../components/Tweet.svelte";
    import TweetInput from "../components/TweetInput.svelte";

    const pageData = operationStore(HomePageQuery, {userId: $user.userId})

    query(pageData)
</script>

<div class="container">
    <div class="columns mt-0 pt-4 content">
        <div class="is-offset-3 column is-2 is-hidden-mobile">
            <h5>Profile</h5>
            <div class="box is-shadowless">
                {#if $pageData.fetching}
                    <progress class="progress is-small is-primary"></progress>
                {:else}
                    <h6 class="has-text-weight-bold">@{$pageData.data.users_by_pk.username}</h6>
                {/if}
            </div>
        </div>
        <div class="column is-4">
            <TweetInput/>
            {#if $pageData.fetching}
                <progress class="progress is-small is-primary"></progress>
            {:else if $pageData.error}
                <div>Error</div>
            {:else}
                <div>
                    <h5>Tweets</h5>
                    {#each $pageData.data.tweets as tweet}
                        <Tweet tweet={tweet}/>
                    {/each}
                </div>
            {/if}
        </div>
    </div>

</div>