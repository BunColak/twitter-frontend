<script>
    import * as yup from 'yup'
    import {Link, useNavigate} from "svelte-navigator";
    import LoginMutation from '../graphql/LoginMutation.graphql'
    import FullScreenCenteredBox from "../components/FullScreenCenteredBox.svelte";
    import {mutation} from "@urql/svelte";
    import Input from "../components/Input.svelte";
    import {user} from "../stores/userStore";


    const navigate = useNavigate()
    const login = mutation({query: LoginMutation})

    $: if ($user) {
        navigate('/')
    }

    let username = ""
    let password = ""
    let loading = false
    let errors = null
    let serverError = ""

    $: if (username || password) {
        errors = null
        serverError = ""
    }

    const loginSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required()
    })

    const submitForm = async () => {
        loading = true
        loginSchema.validate({username, password}, {abortEarly: false}).then(async () => {
            const result = await login({username, password})
            loading = false
            if (result.error) {
                serverError = "Error occurred."
                return
            }
            localStorage.setItem('twitter-user', JSON.stringify(result.data.login))
            user.set(result.data.login)
            navigate('/')
        }).catch(e => {
            loading = false
            if (e.inner) {
                errors = e.inner.map(_e => _e.path)
            } else {
                serverError = "Error occurred."
            }
        })
    }

</script>

<FullScreenCenteredBox>
    <h4>Welcome Back!</h4>
    <p>Please login to use Twitter.</p>
    {#if serverError}
        <div class="message is-danger">
            <p class="message-body">
                {serverError}
            </p>
        </div>
    {/if}
    <form on:submit|preventDefault={submitForm}>
        <Input
                name="username"
                label="Username"
                bind:value={username}
                hasError={!!errors?.includes('username')}
                errorMessage="Username is required."
        >
            <span slot="icon" class="icon is-small">
                    <i class="fas fa-at"></i>
            </span>
        </Input>
        <Input
                name="password"
                label="Password"
                bind:value={password}
                type="password"
                hasError={!!errors?.includes('password')}
                errorMessage="Password is required."
        >
            <span slot="icon" class="icon is-small">
                    <i class="fas fa-key"></i>
            </span>
        </Input>
        <div class="content">
            <p>Not a member?
                <Link to="/register" class="has-text-info">Register here.</Link>
            </p>
        </div>
        <button class:is-loading={loading} type="submit" class="button is-primary mt-2">Login</button>
    </form>
</FullScreenCenteredBox>