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

import { ref } from 'vue'
import { CheckCustomerSession } from './services/CustomerReq'
import { CheckAdminSession } from './services/AdminReq'

const user = ref(null)

function setUser(payload) {
  user.value = payload
}

async function checkToken() {
  let userCheck
  if (user.isAdmin) {
    userCheck = await CheckAdminSession()
  } else {
    userCheck = await CheckCustomerSession()
  }
  setUser(userCheck)
}

const logout = () => {
  user.value = null
  localStorage.clear()
}
onMounted = (checkToken) => {
  const token = localStorage.getItem('token')
  if (token) checkToken()
}
</script>

<style></style>
