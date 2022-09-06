<template>
  <nav>
    <router-link to="/" name="Home">Home</router-link>
    <router-link to="/items" name="Items">Items</router-link>
    <router-link to="/login" name="Login">Login</router-link>
    <router-link to="/cart" name="Cart">Cart</router-link>
    <router-link to="/profile/:user_id" name="Profile">Profile</router-link>
    <!-- <router-link to="/categories/:category_id" name="CategoryDetails">CategoryDetails</router-link> -->
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
.router-link-exact-active {
  color: #fff;
}

nav {
  background: #42b983;
  padding: 1em;
}

nav a {
  margin: 1em;
  color: #2c3e50;
  text-decoration: none;
  font-weight: 800;
}
</style>
