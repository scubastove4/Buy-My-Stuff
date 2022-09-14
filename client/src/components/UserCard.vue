<template>
  <div class="user-card">
    <span v-if="customer">
      <h2>{{ customer.firstName }}</h2>
      <h2>{{ customer.email }}</h2>
    </span>
    <span v-else>
      <h2>{{ admin.firstName }}</h2>
      <h2>{{ admin.email }}</h2>
    </span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps(['customer', 'admin'])
</script>
