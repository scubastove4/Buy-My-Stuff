<template>
  <main v-if="category">
    <h1>{{ category.name }}</h1>
    <section v-if="category.category_items">
      <div v-for="item in category.category_items" :key="item.id">
        <ItemCard :item="item" @click="selectItem(item.id)" />
        <div v-if="user">
          <button v-if="!user.isAdmin">Add to Cart</button>
          <button v-if="!user.isAdmin">Save for Later</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { GetCategoryById } from '../services/CategoryReq'
import ItemCard from '../components/ItemCard.vue'

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
</script>

<style></style>
