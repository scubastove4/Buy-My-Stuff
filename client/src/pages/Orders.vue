<template>
  <div v-if="orders">
    <OrderCard v-for="order in orders" :key="order.id" :order="order" />
  </div>
  <h1 v-else>Put out some ads</h1>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { GetAllOrders } from '../services/OrderReq'
import OrderCard from '../components/OrderCard.vue'

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
