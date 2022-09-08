<template>
  <div v-if="user">
    <button v-if="!user.isAdmin">Add to Cart</button>
    <button v-if="!user.isAdmin">Save for Later</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue' //defineEmits ref

import { GetCategoryById } from '../services/CategoryReq'
import ItemCard from '../components/ItemCard.vue'

defineProps(['user', 'item'])

async function getCategoryDetails() {
  const res = await GetCategoryById(route.params.category_id)
  category.value = res
}

function selectItem(itemId) {
  router.push(`/items/${itemId}`)
}

onMounted(getCategoryDetails)
</script>
