<template>
  <div>
    <h2>{{ item.name }}</h2>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps(['item'])
</script>
