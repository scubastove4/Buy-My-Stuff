<template>
  <div>
    <h2>{{ order.customerId }}</h2>
    <h2>{{ order.orderId }}</h2>
    <h3>${{ order.items }}</h3>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps(['order'])
</script>
