<script>
    import {Router, Route} from "svelte-navigator";
    import Login from "../pages/Login.svelte";
    import Register from "../pages/Register.svelte";
    import Home from "../pages/Home.svelte";
    import ProtectedPage from "./ProtectedPage.svelte";
    import Profile from "../pages/Profile.svelte";

</script>

<Router>
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <ProtectedPage path="/profile/:username">
        <Profile />
    </ProtectedPage>
    <ProtectedPage exact path="/">
        <Home />
    </ProtectedPage>
    <Route path="*" component={Login} />
</Router>