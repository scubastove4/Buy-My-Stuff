<template>
  <main>
    <section v-if="cart"></section>
    <h1 v-else>Browse around! Nothing in your cart :(</h1>
  </main>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { GetCartByCustomerId } from '../services/CartReq'

defineProps(['user'])
const route = useRoute()

const cart = ref(null)

async function setCart(customerId) {
  const data = await GetCartByCustomerId(customerId)
  cart.value = data
}

onMounted(() => {
  setCart(route.params.customer_id)
})
</script>
