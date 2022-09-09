<template>
  <main>
    <section v-if="bookmarks">
      <ul>
        <li v-for="item in bookmarks" :key="item.id">
          <h2>{{ item.name }}</h2>
          <h3>{{ item.price }}</h3>
          <img v-if="item.image" :src="item.image" :alt="item.name" />
        </li>
      </ul>
    </section>
    <h1 v-else>Nothing saved :(</h1>
  </main>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { GetBookmarksByUserId } from '../services/BookmarkReq'

defineProps(['user'])
const route = useRoute()

const bookmarks = ref(null)

async function setBookmarks(customerId) {
  const data = await GetBookmarksByUserId(customerId)
  bookmarks.value = data.bookmarks
}

onMounted(() => {
  setBookmarks(route.params.customer_id)
})
</script>
