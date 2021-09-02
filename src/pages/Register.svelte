<script>
    import * as yup from 'yup'
    import {Link} from "svelte-navigator";

    let email = ""
    let username = ""
    let password = ""
    let errors = null

    $: if (email || username || password) errors = null

    const registerSchema = yup.object().shape({
        email: yup.string().email().required(),
        username: yup.string().required(),
        password: yup.string().required()
    })

    const submitForm = async () => {
        registerSchema.validate({username, password, email}, {abortEarly: false}).then(() => {
            console.log('pass')
        }).catch((e) => {
            errors = e.inner.map(_e => _e.path)
        })
    }

</script>

<div class="container full-height">
    <div class="columns is-vcentered full-height">
        <div class="column is-6 is-offset-3">
            <div class="box">
                <div class="content">
                    <h1 class="is-size-4">Welcome to Twitter</h1>
                    <p>Please register before continuing to use Twitter.</p>
                    <form on:submit|preventDefault={submitForm}>
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control has-icons-left">
                                <span class="icon is-small">
                                    <i class="fas fa-envelope"></i>
                                </span>
                                <input bind:value={email} class:is-danger={errors?.includes('email')} type="email"
                                       class="input" name="email"/>
                                {#if errors?.includes("email")}
                                    <span class="help is-danger">Email is required.</span>
                                {/if}
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Username</label>
                            <div class="control has-icons-left">
                                <span class="icon is-small">
                                    <i class="fas fa-at"></i>
                                </span>
                                <input bind:value={username} class:is-danger={errors?.includes('username')}
                                       class="input" name="username"/>
                                {#if errors?.includes("username")}
                                    <span class="help is-danger">Username is required.</span>
                                {/if}
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control has-icons-left">
                                <span class="icon is-small">
                                    <i class="fas fa-key"></i>
                                </span>
                                <input bind:value={password} type="password" class="input" name="password"
                                       class:is-danger={errors?.includes('password')}/>
                                {#if errors?.includes("password")}
                                    <span class="help is-danger">Email is required.</span>
                                {/if}
                            </div>
                        </div>
                        <div class="content">
                            <p>Already have an account?
                                <Link class="has-text-info" to="/login">Login here.</Link>
                            </p>
                        </div>
                        <button type="submit" class="button is-primary mt-2">Register</button>
                    </form>
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