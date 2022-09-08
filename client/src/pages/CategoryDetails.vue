<template>
  <main>
    <header>{{ category.name }}</header>
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
import axios from 'axios'
import { onMounted, ref, defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ItemCard from '../components/ItemCard.vue'

defineProps(['user'])

const router = useRouter()
const route = useRoute()

const category = ref([])

async function getCategoryDetails() {
  const res = await axios.get(
    `http://localhost:3001/api/category/${route.params.category_id}`
  )
  category.value = res.data
  console.log(category)
}

function selectItem(itemId) {
  router.push(`/items/${itemId}`)
}

onMounted(getCategoryDetails)
</script>

<style></style>
