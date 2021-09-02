<script>
    import {Router, Route} from "svelte-navigator";
    import Login from "../pages/Login.svelte";
    import Register from "../pages/Register.svelte";

</script>

<Router>
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="*" component={Login} />
</Router>