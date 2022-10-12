<template>
  <footer>
    <router-link to="/contact" name="Contact">
      <v-icon id="email-logo" name="md-email-outlined" />
      <!-- scale="1.75" -->
    </router-link>
    <a
      href="https://www.instagram.com/scubastove4/"
      target="_blank"
      rel="noopener noreferrer"
      ><v-icon id="ig-logo" name="io-logo-instagram"
    /></a>
    <!-- scale="1.5" -->
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
