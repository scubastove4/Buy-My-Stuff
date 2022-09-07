<template>
  <div>
    <SignUpForm v-if="upOrIn" />
    <LoginForm
      v-else
      :loginValues="loginValues"
      @setLoginValues="setLoginValues"
      @login="login"
    />
    <button id="up-or-in" @click="setUpOrIn">{{ upOrInText }}</button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import SignUpForm from '../components/SignUpForm.vue'
import LoginForm from '../components/LoginForm.vue'
import { LoginCustomer } from '../services/AuthReq'

const router = useRouter()

const emit = defineEmits(['setUser'])

const loginValues = ref({
  email: '',
  password: ''
})
const upOrIn = ref(true)
const upOrInText = ref('Cllick here to login')

function setUpOrIn() {
  if (upOrIn.value) {
    upOrIn.value = false
    upOrInText.value = 'Click here to sign up'
  } else {
    upOrIn.value = true
    upOrInText.value = 'Click here to login'
  }
}

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

<style>
#up-or-in {
  width: 15%;
  height: 15%;
}
</style>
