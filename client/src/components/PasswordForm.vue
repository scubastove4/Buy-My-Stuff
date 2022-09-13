<template>
  <form @submit.prevent="$emit('changePassword', user.id, newPasswordValues)">
    <span>
      <label for="old-password">Old Password: </label>
      <input
        type="password"
        id="old-password"
        name="oldPassword"
        :value="newPasswordValues.oldPassword"
        @input="
          $emit(
            'changeNewPasswordValues',
            $event.target.name,
            $event.target.value
          )
        "
        required
      />
    </span>
    <span>
      <label for="new-password">New Password: </label>
      <input
        type="password"
        id="new-password"
        name="newPassword"
        :value="newPasswordValues.newPassword"
        @input="
          $emit(
            'changeNewPasswordValues',
            $event.target.name,
            $event.target.value
          )
        "
        required
      />
    </span>
    <span>
      <label for="confirm-new-password">New Password: </label>
      <input
        type="password"
        id="confirm-new-password"
        name="confirmNewPassword"
        :value="newPasswordValues.confirmNewPassword"
        @input="
          $emit(
            'changeNewPasswordValues',
            $event.target.name,
            $event.target.value
          )
        "
        required
      />
    </span>
    <button
      type="submit"
      :disabled="
        !newPasswordValues.oldPassword ||
        !newPasswordValues.newPassword ||
        newPasswordValues.newPassword !== newPasswordValues.confirmNewPassword
      "
    >
      Confirm Change
    </button>
    <!-- <button type="button" @click="$emit('resetNewpasswordValues')">
      Clear Form
    </button> -->
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps(['user', 'newPasswordValues'])
defineEmits(['changeNewPasswordValues', 'changePassword'])
</script>
