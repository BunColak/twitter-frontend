<script>
    import {formatDistanceToNow} from "date-fns";
    import {Link} from "svelte-navigator";

    export let tweet
</script>

<div class="box is-shadowless">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
        <Link to={`/profile/${tweet.user.username}`}
              class="has-text-black-ter has-text-weight-medium">@{tweet.user.username}</Link>
        <span class="is-size-7 has-text-grey">{formatDistanceToNow(new Date(tweet.created_at))}
            ago</span>
    </div>
    <p class="mt-2 has-text-black">{tweet.content}</p>
</div>