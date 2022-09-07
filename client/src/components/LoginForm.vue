<template>
  <form @submit.prevent="" id="login-form">
    <span>
      <label for="login-username">Username</label>
      <input
        type="text"
        id="login-username"
        name="username"
        :value="loginValues.email"
        @input="
          $emit('setLoginValues', $event.target.name, $event.target.value)
        "
        required
      />
    </span>
    <span>
      <label htmlFor="login-password">Password</label>
      <input
        type="password"
        id="login-password"
        name="password"
        :value="loginValues.password"
        @input="
          $emit('setLoginValues', $event.target.name, $event.target.value)
        "
        required
      />
    </span>
    <button type="submit" :disabled="a">Login</button>
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps(['loginValues'])
defineEmits(['setLoginValues'])
</script>
