<template>
  <button class="add-to-cart" @click="AddToCart(user.id, item.id)">
    Add to Cart
  </button>
</template>

<script setup>
import { defineProps } from 'vue' //defineEmits ref

import { PostCart } from '../services/CartReq'

defineProps(['user', 'item'])

// const cartItem = ref({
//   customerId: null,
//   itemId: null
// })
async function AddToCart(customerId, itemId) {
  console.log(customerId, itemId)
  // cartItem.value = {
  //   customerId: customerId,
  //   itemId: itemId
  // }
  // console.log(cartItem.value)
  const res = await PostCart(customerId, itemId)
  console.log(res)
  // cartItem.value = {
  //   customerId: null,
  //   itemId: null
  // }
}
</script>
