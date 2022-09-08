<template>
  <main v-if="item">
    <h1>{{ item.name }}</h1>
    <img v-if="item.image" :src="item.image" :alt="item.name" />
    <h2>${{ item.price }}</h2>
    <h3 v-if="item.description">{{ item.description }}</h3>
    <CartAndSaveButtons :item="item" :user="user" />
    <!-- <div v-if="user">
      <button v-if="!user.isAdmin">Add to Cart</button>
      <button v-if="!user.isAdmin">Save for Later</button>
    </div> -->
  </main>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { useRoute } from 'vue-router'

import { GetItemById } from '../services/ItemReq'
import CartAndSaveButtons from '../components/CartAndSaveButtons.vue'

defineProps(['user'])

const route = useRoute()

const item = ref([])

async function getItemDetails() {
  const res = await GetItemById(route.params.item_id)
  item.value = res
}

onMounted(getItemDetails)
</script>
