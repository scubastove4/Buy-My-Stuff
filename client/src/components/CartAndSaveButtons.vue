<template>
  <div v-if="user">
    <button v-if="!user.isAdmin" @click="AddToCart(user.id, item.id)">
      Add to Cart
    </button>
    <button v-if="!user.isAdmin" @click="AddBookmark(user.id, item.id)">
      Save for Later
    </button>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue' //defineEmits

import { PostBookmark } from '../services/BookmarkReq'
import { PostCart } from '../services/CartReq'

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

const cartItem = ref({
  customerId: null,
  itemId: null
})
async function AddToCart(customerId, itemId) {
  cartItem.value = {
    customerId: customerId,
    itemId: itemId
  }
  await PostCart(cartItem)
  cartItem.value = {
    customerId: null,
    itemId: null
  }
}
</script>
