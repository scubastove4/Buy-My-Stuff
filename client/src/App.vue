<template>
  <div>
    <NavBar :user="user" />
    <main>
      <router-view header="Buy My Stuff"></router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  }
  // data: () => ({
  //   user: {
  //     name: 'user1',
  //     id: 1
  //   }
  // })
}
</script>

<style></style>
