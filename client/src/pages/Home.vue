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
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CategoryCard from '../components/CategoryCard.vue'

const router = useRouter()
// const route = useRoute() useRoute

const categories = ref([])

async function getCategories() {
  const res = await axios.get('http://localhost:3001/api/category')
  categories.value = res.data
  console.log(categories)
}

function selectCategory(categoryId) {
  router.push(`/categories/${categoryId}`)
}

onMounted(getCategories)
</script>

<style></style>
