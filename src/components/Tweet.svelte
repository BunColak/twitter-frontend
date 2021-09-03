<script>
    import {formatDistanceToNow} from "date-fns";

    export let tweet
</script>

<div class="box is-shadowless">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
        <p class="has-text-black has-text-weight-medium">{tweet.user.username}</p>
        <span class="is-size-7 has-text-grey">{formatDistanceToNow(new Date(tweet.created_at))}
            ago</span>
    </div>
    <p class="mt-2 has-text-black">{tweet.content}</p>
</div>