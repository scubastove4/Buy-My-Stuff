<template>
  <nav>
    <img :src="logo" alt="logo" />
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
      <router-link v-if="user.isAdmin" to="/orders" name="Orders"
        >Orders</router-link
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
import logo from '../../public/assets/creations.jpg'

defineProps(['user'])
defineEmits(['logout'])
</script>
