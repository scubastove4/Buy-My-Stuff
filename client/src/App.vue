<template>
  <div id="app-inner">
    <NavBar :user="user" @logout="logout" />
    <main id="main-content">
      <router-view
        header="Buy My Stuff"
        :user="user"
        @setUser="setUser"
        @logout="logout"
      ></router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { CheckSession } from './services/CheckSessionReq'

const router = useRouter()
const user = ref(null)

function setUser(payload) {
  user.value = payload
  if (user.value.isAdmin === 'false') user.value.isAdmin = false
}

async function checkToken() {
  const userCheck = await CheckSession()
  setUser(userCheck)
}

function logout() {
  user.value = null
  localStorage.clear()
  router.push('/login')
}

onBeforeMount(() => {
  const token = localStorage.getItem('token')
  if (token) checkToken()
})
</script>

<style></style>
