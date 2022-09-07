<template>
  <div>
    <LoginForm
      :loginValues="loginValues"
      @setLoginValues="setLoginValues"
      @login="login"
    />
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import { LoginAdmin } from '../services/AdminReq'

const router = useRouter()

const emit = defineEmits(['setUser'])

//////////   handle login values/submission
const loginValues = ref({
  email: '',
  password: ''
})
function setLoginValues(name, val) {
  loginValues.value[name] = val
}
function resetLoginValues() {
  loginValues.value = {
    email: '',
    password: ''
  }
}
async function login() {
  const payload = await LoginAdmin(loginValues)
  emit('setUser', payload)
  resetLoginValues()
  router.push('/')
}
</script>

<style>
#up-or-in {
  width: 15%;
  height: 15%;
}
</style>
