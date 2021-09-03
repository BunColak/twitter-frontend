<script>
    import {user} from "../stores/userStore";
    import FollowUserMutation from '../graphql/FollowUserMutation.graphql'
    import UnfollowUserMutation from '../graphql/UnfollowUserMutation.graphql'
    import {mutation} from "@urql/svelte";
    const followUser = mutation({query: FollowUserMutation})
    const unFollowUser = mutation({query: UnfollowUserMutation})

    export let profile
    let loading = false

    $: isFollowing = profile.is_followed.aggregate.count !== 0
    $: isMe = String(profile.id) === $user.userId

    const toggleFollow = async () => {
        loading = true
        if (isFollowing) {
            await unFollowUser({followId: profile.id}, {additionalTypenames: ['profile']})
        } else {
            await followUser({followId: profile.id}, {additionalTypenames: ['profile']})
        }
        loading = false
    }
</script>

{#if !isMe}
    <button on:click={toggleFollow} class="button is-primary is-small" class:is-loading={loading} class:is-outlined={isFollowing}>
        {#if !isFollowing}
            Follow
        {:else}
            Following!
        {/if}
    </button>
{/if}