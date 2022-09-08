<template>
  <footer>
    <router-link to="/contact" name="Contact">Contact</router-link>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
.router-link-exact-active {
  color: #fff;
}

nav {
  background: #42b983;
  padding: 1em;
}

nav a {
  margin: 1em;
  color: #2c3e50;
  text-decoration: none;
  font-weight: 800;
}
</style>
