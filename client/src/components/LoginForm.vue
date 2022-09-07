<template>
  <form @submit.prevent="$emit('login')" id="login-form">
    <span>
      <label for="login-email">Email</label>
      <input
        type="text"
        id="login-email"
        name="email"
        :value="loginValues.email"
        @input="
          $emit('setLoginValues', $event.target.name, $event.target.value)
        "
        required
      />
    </span>
    <span>
      <label for="login-password">Password</label>
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
    <button
      type="submit"
      :disabled="!loginValues.email || !loginValues.password"
    >
      Login
    </button>
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps(['loginValues'])
defineEmits(['setLoginValues', 'login'])
</script>
