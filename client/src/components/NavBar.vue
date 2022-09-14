<template>
  <nav :class="{ 'collapsed-nav': collapsedNav }">
    <img :src="logo" alt="logo" />
    <div v-show="!mobile" class="navigation">
      <router-link class="link" to="/" name="Home">Home</router-link>
      <router-link class="link" to="/items" name="Items">Items</router-link>
      <span v-if="user">
        <router-link
          class="link"
          v-if="!user.isAdmin"
          :to="`/profile/${user.id}`"
          name="Profile"
          >Profile</router-link
        >
        <router-link class="link" v-if="user.isAdmin" to="/users" name="Users"
          >Users</router-link
        >
        <router-link class="link" v-if="user.isAdmin" to="/orders" name="Orders"
          >Orders</router-link
        >
        <router-link class="link" v-else :to="`/cart/${user.id}`" name="Cart"
          >Cart</router-link
        >
        <router-link
          class="link"
          to="/login"
          name="Logout"
          @click="$emit('logout')"
          >Logout</router-link
        >
      </span>
      <router-link class="link" v-else to="/login" name="Login"
        >Login</router-link
      >
    </div>
    <div class="icon">
      <i
        class="fa-solid fa-bars"
        @click="toggleMobileNav"
        v-show="mobile"
        :class="{ 'icon-active': mobileNav }"
      ></i>
    </div>
    <transition name="mobile-nav">
      <div
        v-show="mobileNav"
        class="dropdown-nav"
        :class="{ 'has-user': user }"
      >
        <router-link class="link" to="/" name="Home" @click="toggleMobileNav"
          >Home</router-link
        >
        <router-link
          class="link"
          to="/items"
          name="Items"
          @click="toggleMobileNav"
          >Items</router-link
        >
        <span class="user-nav" v-if="user">
          <router-link
            class="link"
            v-if="!user.isAdmin"
            :to="`/profile/${user.id}`"
            name="Profile"
            @click="toggleMobileNav"
            >Profile</router-link
          >
          <router-link
            class="link"
            v-if="user.isAdmin"
            to="/users"
            name="Users"
            @click="toggleMobileNav"
            >Users</router-link
          >
          <router-link
            class="link"
            v-if="user.isAdmin"
            to="/orders"
            name="Orders"
            @click="toggleMobileNav"
            >Orders</router-link
          >
          <router-link
            class="link"
            v-else
            :to="`/cart/${user.id}`"
            name="Cart"
            @click="toggleMobileNav"
            >Cart</router-link
          >
          <router-link
            class="link"
            to="/login"
            name="Logout"
            @click="logoutRedirectAndCollapseNav"
            >Logout</router-link
          >
        </span>
        <router-link
          class="link"
          v-else
          to="/login"
          name="Login"
          @click="toggleMobileNav"
          >Login</router-link
        >
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import logo from '../../public/assets/creations.jpg'

defineProps(['user'])
const emit = defineEmits(['logout'])

const collapsedNav = ref(null)
const mobile = ref(false)
const mobileNav = ref(false)
const windowWidth = ref(null)

function toggleMobileNav() {
  mobileNav.value = !mobileNav.value
}

function checkScreen() {
  windowWidth.value = window.innerWidth
  if (windowWidth.value <= 1000) {
    return (mobile.value = true)
  }
  mobile.value = false
  mobileNav.value = false
  return
}
window.addEventListener('resize', checkScreen)
onMounted(checkScreen)

function logoutRedirectAndCollapseNav() {
  emit('logout')
  toggleMobileNav()
}
</script>
