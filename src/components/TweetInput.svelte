<script>
    import {slide} from 'svelte/transition'
    import mutationQuery from '../graphql/CreateTweetMutation.graphql'
    import {mutation} from "@urql/svelte";

    const createMutation = mutation({query: mutationQuery})

    let text = ""
    let loading = false

    const submitTweet = async () => {
        loading = true
        await createMutation({content: text})
        loading = false
        text = ""
    }
</script>

<div class="block mt-1">
    <form on:submit|preventDefault={submitTweet}>
        <div class="control">
            <textarea
                    class:is-disabled={loading}
                    bind:value={text}
                    placeholder="What's happening?"
                    class="textarea resize-off"
            ></textarea>
        </div>
        {#if text}
            <div transition:slide={{duration: 200}} class="is-flex is-justify-content-end mt-2">
                <button class:is-loading={loading} class="button is-primary">Tweet</button>
            </div>
        {/if}
    </form>
</div>

<style>
    .resize-off {
        resize: none;
    }
</style>