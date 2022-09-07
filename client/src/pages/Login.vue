<template>
  <div>
    <LoginForm
      v-if="upOrIn"
      :loginValues="loginValues"
      @setLoginValues="setLoginValues"
      @login="login"
    />
    <SignUpForm
      v-else
      :signUpValues="signUpValues"
      @setSignUpValues="setSignUpValues"
      @signUp="signUp"
    />

    <button id="up-or-in" @click="setUpOrIn">{{ upOrInText }}</button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import SignUpForm from '../components/SignUpForm.vue'
import LoginForm from '../components/LoginForm.vue'
import { SignUpCustomer, LoginCustomer } from '../services/CustomerReq'

const router = useRouter()

const emit = defineEmits(['setUser'])

////////////   determine what form will show - default is sign up
const upOrIn = ref(true)
const upOrInText = ref('Cllick here to sign up')
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
  // console.log(loginValues)
  const payload = await LoginCustomer(loginValues)
  // console.log(payload)
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
  if (
    signUpValues.value.password !== '' &&
    signUpValues.value.password === signUpValues.value.confirmPassword
  ) {
    await SignUpCustomer(signUpValues)
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
