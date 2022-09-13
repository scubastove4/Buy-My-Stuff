<template>
  <div class="cat-card">
    <h2>{{ category.name }}</h2>
    <h3 v-if="category.description">{{ category.description }}</h3>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps(['category'])
</script>
