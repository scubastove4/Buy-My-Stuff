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

<script>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

import { ref } from 'vue'
import { CheckSession } from './services/AuthReq'

export default {
  components: {
    NavBar,
    Footer
  },
  setup() {
    const user = ref(null)

    const setUser = (payload) => {
      user.value = payload
    }

    const checkToken = async () => {
      const userCheck = await CheckSession()
      setUser(userCheck)
    }

    const logout = () => {
      user.value = null
      localStorage.clear()
    }
    return {
      user,
      setUser,
      checkToken,
      logout
    }
  },
  mounted(checkToken) {
    const token = localStorage.getItem('token')
    if (token) checkToken()
  }
}
</script>

<style></style>
