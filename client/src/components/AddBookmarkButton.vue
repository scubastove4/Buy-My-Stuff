<template>
  <button class="add-bookmark" @click="AddBookmark(user.id, item.id)">
    Save for Later
  </button>
</template>

<script setup>
import { defineProps, ref } from 'vue'

import { PostBookmark } from '../services/BookmarkReq'

defineProps(['user', 'item'])

const bookmarkedItem = ref({
  customerId: null,
  itemId: null
})
async function AddBookmark(customerId, itemId) {
  bookmarkedItem.value = {
    customerId: customerId,
    itemId: itemId
  }
  await PostBookmark(bookmarkedItem)
  bookmarkedItem.value = {
    customerId: null,
    itemId: null
  }
}
</script>
