<template>
  <div v-if="categories">
    <CategoryCard
      v-for="category in categories"
      :key="category.id"
      :category="category"
      @click="selectCategory(category.id)"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CategoryCard from '../components/CategoryCard.vue'
import { GetCategories } from '../services/CategoryReq'

const router = useRouter()
// const route = useRoute() useRoute

const categories = ref([])

async function setCategories() {
  const data = await GetCategories()
  categories.value = data
  console.log(categories)
}

function selectCategory(categoryId) {
  router.push(`/categories/${categoryId}`)
}

onMounted(setCategories)
</script>

<style></style>
