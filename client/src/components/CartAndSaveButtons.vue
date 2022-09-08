<template>
  <div v-if="user">
    <button v-if="!user.isAdmin">Add to Cart</button>
    <button v-if="!user.isAdmin" @click="AddBookmark(user.id, item.id)">
      Save for Later
    </button>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue' //defineEmits

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

// onMounted(getCategoryDetails)
</script>
