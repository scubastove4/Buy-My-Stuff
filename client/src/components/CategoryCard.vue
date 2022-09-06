<template>
  <div>
    <h2>{{ category.name }}</h2>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps(['category'])
</script>
