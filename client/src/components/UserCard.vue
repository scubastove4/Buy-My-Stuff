<template>
  <div>
    <h2 v-if="customer">{{ customer.firstName }}</h2>
    <h2 v-else>{{ admin.firstName }}</h2>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps(['customer', 'admin'])
</script>
