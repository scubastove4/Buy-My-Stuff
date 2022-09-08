<template>
  <div>
    <img v-if="item.image" :src="item.image" alt="" />
    <h2>{{ item.name }}</h2>
    <h3>${{ item.price }}</h3>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps(['item'])
</script>
