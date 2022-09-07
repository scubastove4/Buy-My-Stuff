<template>
  <div>
    <LoginForm :loginValues="loginValues" @setLoginValues="setLoginValues" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginForm from '../components/LoginForm.vue'

const loginValues = ref({
  email: '',
  password: ''
})

function setLoginValues(name, val) {
  loginValues[name].value = val
}
</script>
