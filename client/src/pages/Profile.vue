<template>
  <main>
    <section v-if="bookmarks">
      <div v-for="item in bookmarks" :key="item.id">
        <ItemCard :item="item" />
        <AddToCartButton :user="user" :item="item" />
        <button @click="removeBookmark(user.id, item.id)">
          Remove Bookmark
        </button>
      </div>
    </section>
    <h1 v-else>Nothing saved :(</h1>
  </main>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { GetBookmarksByUserId, DeleteBookmark } from '../services/BookmarkReq'
import AddToCartButton from '../components/AddToCartButton.vue'
import ItemCard from '../components/ItemCard.vue'

defineProps(['user'])
const route = useRoute()

const bookmarks = ref(null)

async function setBookmarks(customerId) {
  const data = await GetBookmarksByUserId(customerId)
  bookmarks.value = data.bookmarks
}

async function removeBookmark(customerId, itemId) {
  const removedBookmark = {
    customerId: customerId,
    itemId: itemId
  }
  await DeleteBookmark(removedBookmark)
  setBookmarks(route.params.customer_id)
}

onMounted(() => {
  setBookmarks(route.params.customer_id)
})
</script>
