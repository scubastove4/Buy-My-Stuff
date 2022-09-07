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
import { LoginCustomer } from '../services/AuthReq'

const router = useRouter()

const emit = defineEmits(['setUser'])

const loginValues = ref({
  email: '',
  password: ''
})

// const upOrIn = ref()

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
  // console.log(loginValues)
  const payload = await LoginCustomer(loginValues)
  // console.log(payload)
  emit('setUser', payload)
  resetLoginValues()
  router.push('/')
}
</script>
