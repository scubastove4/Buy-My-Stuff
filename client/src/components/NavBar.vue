<template>
  <nav>
    <router-link to="/" name="Home">Home</router-link>
    <router-link to="/items" name="Items">Items</router-link>

    <router-link v-if="user" :to="`/profile/${user.id}`" name="Profile"
      >Profile</router-link
    >
    <router-link v-else to="/login" name="Login">Login</router-link>
    <router-link v-if="user" to="/cart" name="Cart">Cart</router-link>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps(['user'])
console.log(props.user)
</script>

<style>
.router-link-exact-active {
  color: #fff;
}

nav,
footer {
  background: #42b983;
  padding: 1em;
}

nav a,
footer a {
  margin: 1em;
  color: #2c3e50;
  text-decoration: none;
  font-weight: 800;
}
</style>
