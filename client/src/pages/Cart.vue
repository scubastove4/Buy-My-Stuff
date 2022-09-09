<template>
  <main>
    <section v-if="cart">
      <ul>
        <li v-for="item in cart" :key="item.id">
          <h2>{{ item.name }}</h2>
          <h3>{{ item.price }}</h3>
          <img v-if="item.image" :src="item.image" :alt="item.name" />
        </li>
      </ul>
    </section>
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
  cart.value = data.cart
}

onMounted(() => {
  setCart(route.params.customer_id)
})
</script>
