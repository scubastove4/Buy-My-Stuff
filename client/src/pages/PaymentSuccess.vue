<template>
  <main>
    <h1>Payment submitted successfully!</h1>
    <button @click="returnToHomePage">Continue Shopping</button>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function returnToHomePage() {
  router.push('/')
}
</script>
