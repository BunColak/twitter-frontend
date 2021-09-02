<div class="container full-height">
    <div class="columns mt-0 is-vcentered full-height">
        <div class="column is-4 is-offset-4">
            <div class="box">
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .full-height {
        min-height: 100vh;
    }
</style>