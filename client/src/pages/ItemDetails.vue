<template>
  <main id="item-details" v-if="item">
    <span id="item-back-buttons">
      <button @click="backToCategory">{{ buttonText }}</button>
      <button @click="backToItems">Back to All Items</button>
    </span>
    <h1>{{ item.name }}</h1>
    <img v-if="item.image" :src="item.image" :alt="item.name" />
    <h2 id="item-details-description" v-if="item.description">
      {{ item.description }}
    </h2>
    <h2 id="item-details-price">${{ item.price }}</h2>
    <CartAndSaveButtons :item="item" :user="user" />
  </main>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { GetItemById } from '../services/ItemReq'
import CartAndSaveButtons from '../components/CartAndSaveButtons.vue'

defineProps(['user'])

const router = useRouter()
const route = useRoute()

const item = ref([])
const buttonText = ref([])

async function getItemDetails() {
  const res = await GetItemById(route.params.item_id)
  item.value = res
  buttonText.value = item.value.category.name
}

onMounted(getItemDetails)

function backToCategory() {
  router.push(`/categories/${item.value.categoryId}`)
}

function backToItems() {
  router.push('/items')
}
</script>
