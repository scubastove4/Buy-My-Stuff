<template>
  <button @click="AddToCart(user.id, item.id)">Add to Cart</button>
</template>

<script setup>
import { defineProps, ref } from 'vue' //defineEmits

import { PostCart } from '../services/CartReq'

defineProps(['user', 'item'])

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
