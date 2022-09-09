<template>
  <div v-if="user">
    <AddToCartButton v-if="!user.isAdmin" :user="user" :item="item" />
    <AddBookmarkButton v-if="!user.isAdmin" :user="user" :item="item" />
  </div>
</template>

<script setup>
import AddToCartButton from './AddToCartButton.vue'
import AddBookmarkButton from './AddBookmarkButton.vue'
import { defineProps } from 'vue' //defineEmits

defineProps(['user', 'item'])
</script>
