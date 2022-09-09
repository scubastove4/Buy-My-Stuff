<template>
  <nav>
    <router-link to="/" name="Home">Home</router-link>
    <router-link to="/items" name="Items">Items</router-link>
    <span v-if="user">
      <router-link
        v-if="!user.isAdmin"
        :to="`/profile/${user.id}`"
        name="Profile"
        >Profile</router-link
      >
      <router-link v-if="user.isAdmin" to="/users" name="Users"
        >Users</router-link
      >
      <router-link v-else :to="`/cart/${user.id}`" name="Cart"
        >Cart</router-link
      >
      <router-link to="/login" name="Logout" @click="$emit('logout')"
        >Logout</router-link
      >
    </span>
    <router-link v-else to="/login" name="Login">Login</router-link>
  </nav>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps(['user'])
defineEmits(['logout'])
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
