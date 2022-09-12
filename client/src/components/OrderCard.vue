<template>
  <div>
    <h2>Customer ID: {{ order.customerId }}</h2>
    <h2>Order ID: {{ order.orderId }}</h2>
    <div v-for="item in order.items" :key="item.id">
      <h3>Item: {{ item.itemName }}</h3>
      <h3>Price Per Unit: ${{ item.itemPrice }}</h3>
      <h3>Units: {{ item.itemQuantity }}</h3>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps(['order'])
</script>
