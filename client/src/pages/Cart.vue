<template>
  <main>
    <section v-if="cart">
      <ul>
        <li v-for="item in cart" :key="item.id">
          <h2>{{ item.name }}</h2>
          <h3>{{ item.price }}</h3>
          <img v-if="item.image" :src="item.image" :alt="item.name" />
          <AddBookmarkButton :user="user" :item="item" />
          <button @click="removeCartItem(user.id, item.id)">Remove Item</button>
        </li>
      </ul>
    </section>
    <h1 v-else>Browse around! Nothing in your cart :(</h1>
  </main>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { GetCartByCustomerId, DeleteCartItem } from '../services/CartReq'
import AddBookmarkButton from '../components/AddBookmarkButton.vue'

defineProps(['user'])
const route = useRoute()

const cart = ref(null)

async function setCart(customerId) {
  const data = await GetCartByCustomerId(customerId)
  cart.value = data.cart
}

async function removeCartItem(customerId, itemId) {
  const removedItem = {
    customerId: customerId,
    itemId: itemId
  }
  await DeleteCartItem(removedItem)
  setCart(route.params.customer_id)
}

onMounted(() => {
  setCart(route.params.customer_id)
})
</script>
