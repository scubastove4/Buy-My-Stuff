<template>
  <div>
    <NavBar :user="user" />
    <main>
      <router-view
        header="Buy My Stuff"
        :user="user"
        @setUser="setUser"
      ></router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

import { ref } from 'vue'

const user = ref(null)

function setUser(payload) {
  user.value = payload
}
</script>

<style></style>
