<template>
  <!--///////////      new admin form     //////////-->
  <form
    v-if="user && user.isAdmin"
    @submit.prevent="$emit('createNewAdmin')"
    id="admin-sign-up-form"
  >
    <span>
      <label for="sign-up-name">First Name:</label>
      <input
        type="text"
        id="sign-up-name"
        name="firstName"
        placeholder="Michael"
        :value="newAdminValues.firstName"
        @input="
          $emit('setNewAdminValues', $event.target.name, $event.target.value)
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
        :value="newAdminValues.email"
        @input="
          $emit('setNewAdminValues', $event.target.name, $event.target.value)
        "
        required
      />
      <p v-if="newAdmin">{{ newAdmin.msg && newAdmin.msg }}</p>
    </span>
    <span>
      <label for="sign-up-password">Password:</label>
      <input
        type="password"
        id="sign-up-password"
        name="password"
        placeholder="Minimum 8 characters"
        :value="newAdminValues.password"
        @input="
          $emit('setNewAdminValues', $event.target.name, $event.target.value)
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
        :value="newAdminValues.confirmPassword"
        @input="
          $emit('setNewAdminValues', $event.target.name, $event.target.value)
        "
        required
      />
    </span>
    <button
      type="submit"
      :disabled="
        !newAdminValues.firstName ||
        !newAdminValues.email ||
        !newAdminValues.password ||
        !newAdminValues.confirmPassword ||
        newAdminValues.password !== newAdminValues.confirmPassword
      "
    >
      Create New Admin
    </button>
  </form>

  <!--///////////      new customer form     //////////-->
  <form v-else @submit.prevent="$emit('signUp')" id="sign-up-form">
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
      <p v-if="newCustomer">{{ newCustomer.msg && newCustomer.msg }}</p>
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
        !signUpValues.firstName ||
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
import { defineProps, defineEmits } from 'vue'

defineProps([
  'signUpValues',
  'setSignUpValues',
  'newCustomer',
  'user',
  'newAdminValues',
  'newAdmin'
])
defineEmits([
  'setSignUpValues',
  'signUp',
  'setNewAdminValues',
  'createNewAdmin'
])
</script>
