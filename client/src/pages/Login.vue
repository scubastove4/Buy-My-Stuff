<template>
  <div id="login-page">
    <LoginForm
      v-if="upOrIn"
      :loginValues="loginValues"
      @setLoginValues="setLoginValues"
      @login="login"
    />
    <SignUpForm
      v-else
      :signUpValues="signUpValues"
      :newCustomer="newCustomer"
      @setSignUpValues="setSignUpValues"
      @signUp="signUp"
    />

    <button id="up-or-in" @click="setUpOrIn">{{ upOrInText }}</button>
    <img id="login-img" :src="logo" alt="" />
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

import { SignUpCustomer, LoginCustomer } from '../services/CustomerReq'
import SignUpForm from '../components/SignUpForm.vue'
import LoginForm from '../components/LoginForm.vue'
import logo from '../../public/assets/creations.jpg'

const router = useRouter()

const emit = defineEmits(['setUser'])

////////////   determine what form will show - default is sign up
const upOrIn = ref(true)
const upOrInText = ref('Click here to sign up')
function setUpOrIn() {
  if (upOrIn.value) {
    upOrIn.value = false
    upOrInText.value = 'Click here to login'
  } else {
    upOrIn.value = true
    upOrInText.value = 'Click here to sign up'
  }
}

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
  const payload = await LoginCustomer(loginValues)
  emit('setUser', payload)
  resetLoginValues()
  router.push('/')
}

//////////   handle sign up values/submission
const signUpValues = ref({
  firstName: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const newCustomer = ref(null)
function setSignUpValues(name, val) {
  signUpValues.value[name] = val
}
function resetSignUpValues() {
  signUpValues.value = {
    firstName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
}
async function signUp() {
  newCustomer.value = await SignUpCustomer(signUpValues)
  if (newCustomer.value.msg) {
    return newCustomer.value.msg
  } else {
    resetSignUpValues()
    setUpOrIn()
  }
}
</script>

<style>
#up-or-in {
  width: 15%;
  height: 15%;
}
</style>
