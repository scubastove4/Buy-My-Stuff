<template>
  <div v-if="orders">
    <OrderCard v-for="order in order" :key="order.id" :order="order" />
  </div>
  <h1 v-else>Put out some ads</h1>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { GetAllOrders } from '../services/OrderReq'
import OrderCard from '../components/OrderCard.vue'

const orders = ref(null)

async function GetOrders() {
  const res = await GetAllOrders()
  console.log(res)
  // orders.value = res.data
}

onMounted(GetOrders)
</script>
