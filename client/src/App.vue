<template>
  <div>
    <NavBar :user="user" />
    <main>
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

import { ref, onMounted } from 'vue'
import { CheckSession } from './services/AuthReq'

const user = ref(null)

function setUser(payload) {
  user.value = payload
}

async function checkToken() {
  const userCheck = await CheckSession()
  setUser(userCheck)
}

function logout() {
  user.value = null
  localStorage.clear()
}

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) checkToken()
})
</script>

<style></style>
