<template>
  <main id="category-details" v-if="category">
    <div id="category-details-header">
      <button @click="backToCategories">Back to Categories</button>
      <h1>{{ category.name }}</h1>
    </div>
    <section id="category-items" v-if="category.category_items">
      <div
        class="category-item-container"
        v-for="item in category.category_items"
        :key="item.id"
      >
        <ItemCard :item="item" @click="selectItem(item.id)" />
        <CartAndSaveButtons :item="item" :user="user" />
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { GetCategoryById } from '../services/CategoryReq'
import ItemCard from '../components/ItemCard.vue'
import CartAndSaveButtons from '../components/CartAndSaveButtons.vue'

defineProps(['user'])

const router = useRouter()
const route = useRoute()

const category = ref([])

async function getCategoryDetails() {
  const res = await GetCategoryById(route.params.category_id)
  category.value = res
}

function selectItem(itemId) {
  router.push(`/items/${itemId}`)
}

onMounted(getCategoryDetails)

function backToCategories() {
  router.push('/')
}
</script>

<style></style>
