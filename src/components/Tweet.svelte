<script>
    import {formatDistanceToNow} from "date-fns";
    import {Link} from "svelte-navigator";
    import LikeMutation from '../graphql/LikeMutation.graphql'
    import DislikeMutation from '../graphql/DislikeMutation.graphql'
    import {mutation} from "@urql/svelte";
    const like = mutation({query: LikeMutation})
    const dislike = mutation({query: DislikeMutation})

    export let tweet

    let likedState = tweet.is_liked_by_user
    let likedCount = tweet.likes_aggregate.aggregate.count

    const likeToggle = async () => {
        if (likedState) {
            likedState = !likedState
            likedCount--
            await dislike({tweetId: tweet.id})
        } else {
            likedState = !likedState
            likedCount++
            await like({tweetId: tweet.id})
        }
    }
</script>

<div class="box is-shadowless">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
        <Link to={`/profile/${tweet.user.username}`}
              class="has-text-black-ter has-text-weight-medium">@{tweet.user.username}</Link>
        <span class="is-size-7 has-text-grey">{formatDistanceToNow(new Date(tweet.created_at))}
            ago</span>
    </div>
    <p class="mt-2 has-text-black">{tweet.content}</p>
    <div on:click={likeToggle} class="block">
        <span class="icon">
            <i class:fas={likedState} class:far={!likedState} class="fa-heart has-text-danger"></i>
        </span>
        <span>{likedCount || ""}</span>
    </div>
</div>