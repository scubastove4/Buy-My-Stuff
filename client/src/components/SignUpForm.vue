<template>
  <form @submit.prevent="" id="sign-up-form">
    <span>
      <label for="sign-up-name">First Name:</label>
      <input
        type="text"
        id="sign-up-name"
        name="firstName"
        placeholder="Michael"
        :value="signUpValues.firstName"
        @input="
          $emit('setSignUpValues', $event.target.name, $event.target.value)
        "
        required
      />
    </span>
    <span>
      <label for="sign-up-email">Email:</label>
      <input
        type="text"
        id="sign-up-email"
        name="email"
        placeholder="michael@michael.com"
        :value="signUpValues.email"
        @input="
          $emit('setSignUpValues', $event.target.name, $event.target.value)
        "
        required
      />
    </span>
    <span>
      <label for="sign-up-password">Password:</label>
      <input
        type="password"
        id="sign-up-password"
        name="password"
        placeholder="Minimum 8 characters"
        :value="signUpValues.password"
        @input="
          $emit('setSignUpValues', $event.target.name, $event.target.value)
        "
        minLength="8"
        required
      />
    </span>
    <span>
      <label for="sign-up-confirm-password">Confirm Password:</label>
      <input
        type="password"
        id="sign-up-confirm-password"
        name="confirmPassword"
        placeholder="Must match"
        :value="signUpValues.confirmPassword"
        @input="
          $emit('setSignUpValues', $event.target.name, $event.target.value)
        "
        required
      />
    </span>
    <button
      type="submit"
      :disabled="
        !signUpValues.name ||
        !signUpValues.age ||
        !signUpValues.location ||
        !signUpValues.username ||
        !signUpValues.email ||
        !signUpValues.password ||
        !signUpValues.confirmPassword ||
        signUpValues.password !== signUpValues.confirmPassword
      "
    >
      Sign Up
    </button>
  </form>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps(['signUpValues', 'setSignUpValues'])
</script>
