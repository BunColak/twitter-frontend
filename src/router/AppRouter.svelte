<script>
    import {Link, Route, Router} from "svelte-navigator";
    import Login from "../pages/Login.svelte";
    import Register from "../pages/Register.svelte";
    import Home from "../pages/Home.svelte";
    import ProtectedPage from "./ProtectedPage.svelte";
    import Profile from "../pages/Profile.svelte";
    import {user} from "../stores/userStore";

    const logout = () => {
        user.set(null)
        localStorage.removeItem('twitter-user')
    }
</script>

<Router>
    {#if $user}
        <nav class="navbar is-dark">
            <div class="container">
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <Link to="/" class="navbar-item is-size-5">
                            Home
                        </Link>
                    </div>
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <button on:click={logout} class="button is-light">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    {/if}
    <Route path="/register" component={Register}/>
    <Route path="/login" component={Login}/>
    <ProtectedPage path="/profile/:username">
        <Profile/>
    </ProtectedPage>
    <ProtectedPage exact path="/">
        <Home/>
    </ProtectedPage>
    <Route path="*" component={Login}/>
</Router>