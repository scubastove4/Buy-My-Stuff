<template>
  <main>
    <h1>Payment submitted successfully!</h1>
    <button @click="returnToHomePage">Continue Shopping</button>
  </main>
</template>

<script setup>
import { userRouter } from 'vue-router'

const router = userRouter()

function returnToHomePage() {
  router.push('/')
}
</script>
