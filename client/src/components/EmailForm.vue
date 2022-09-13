<template>
  <form @submit.prevent="$emit('changeEmail', user.id, newEmailValue)">
    <span>
      <label for="new-email">New Email: </label>
      <input
        type="email"
        id="new-email"
        name="newEmail"
        :value="newEmailValue"
        @input="$emit('changeNewEmailValue', $event.target.value)"
        required
      />
      <p v-if="newEmailCheck">{{ newEmailCheck.msg && newEmailCheck.msg }}</p>
    </span>
    <button type="submit" :disabled="!newEmailValue">Confirm Change</button>
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps(['user', 'newEmailValue', 'newEmailCheck'])
defineEmits(['changeNewEmailValue', 'changeEmail'])
</script>
