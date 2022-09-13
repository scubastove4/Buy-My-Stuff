<template>
  <div class="customer-choice-btn-container" v-if="user">
    <AddToCartButton v-if="!user.isAdmin" :user="user" :item="item" />
    <AddBookmarkButton v-if="!user.isAdmin" :user="user" :item="item" />
  </div>
</template>

<script setup>
import AddToCartButton from './AddToCartButton.vue'
import AddBookmarkButton from './AddBookmarkButton.vue'
import { defineProps } from 'vue'

defineProps(['user', 'item'])
</script>
