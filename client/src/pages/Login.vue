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
import { ref, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import { LoginUser } from '../services/AuthReq'

const router = useRouter()

defineProps(['user'])
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
  const payload = await LoginUser(loginValues)
  emit('setUser', payload)
  resetLoginValues()
  router.push('/')
}
</script>
