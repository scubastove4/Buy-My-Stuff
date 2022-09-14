<template>
  <button class="add-to-cart" @click="AddToCart(user.id, item.id)">
    Add to Cart
  </button>
</template>

<script setup>
import { defineProps } from 'vue'

import { PostCart } from '../services/CartReq'

defineProps(['user', 'item'])

async function AddToCart(customerId, itemId) {
  await PostCart(customerId, itemId)
}
</script>
