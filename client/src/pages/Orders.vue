<template>
  <main v-if="user && user.isAdmin">
    <div v-if="orders.length > 0">
      <OrderCard v-for="order in orders" :key="order.id" :order="order" />
    </div>
    <h1 v-else>Put out some ads</h1>
  </main>
  <h1 v-else>You do not have access to this page</h1>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'

import { GetAllOrders } from '../services/OrderReq'
import OrderCard from '../components/OrderCard.vue'

defineProps(['user'])

const orders = ref(null)
// const orderItems = ref([])

async function GetOrders() {
  const res = await GetAllOrders()
  orders.value = res
  // if (orders.value.items) {
  //   orders.value.items.forEach(async (item) => {
  //     let objItem = await JSON.parse(item)
  //     console.log(objItem)
  //     // orderItems.value.push(objItem)
  //   })
  //   orders.value.items = orderItems.value
  // }
}

onMounted(GetOrders)
</script>
