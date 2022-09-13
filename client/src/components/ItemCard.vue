<template>
  <div class="item-card">
    <img v-if="item.image" :src="item.image" :alt="item.name" />
    <h2>{{ item.name }}</h2>
    <h3><span>$</span>{{ item.price }}</h3>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps(['item'])
</script>
