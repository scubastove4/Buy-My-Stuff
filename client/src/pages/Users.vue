<template>
  <main v-if="user && user.isAdmin">
    <h2>Customers</h2>
    <section v-for="customer in allCustomers" :key="customer.id">
      <UserCard :customer="customer" />
      <button @click="deleteCustomer(customer.id)">Delete Customer</button>
    </section>
    <h2>Admins</h2>
    <section v-for="admin in allAdmins" :key="admin.id">
      <UserCard :admin="admin" />
      <button
        @click="deleteAdmin(allAdmins, admin.id)"
        :disabled="allAdmins.length === 1"
      >
        Delete Admin
      </button>
    </section>
  </main>
  <h1 v-else>Nothing saved :(</h1>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'

import { GetAllAdmins, DeleteAdmin } from '../services/AdminReq'
import { GetAllCustomers, DeleteCustomer } from '../services/CustomerReq'
import UserCard from '../components/UserCard.vue'

defineProps(['user'])

const allAdmins = ref(null)
const allCustomers = ref(null)

async function getAllUsers() {
  const admins = await GetAllAdmins()
  const customers = await GetAllCustomers()
  allAdmins.value = admins
  allCustomers.value = customers
}

async function deleteAdmin(allAdmins, adminId) {
  const adminObj = {
    admins: allAdmins,
    adminId: adminId
  }
  await DeleteAdmin(adminObj)
  getAllUsers()
}

async function deleteCustomer(customerId) {
  await DeleteCustomer(customerId)
  getAllUsers()
}

onMounted(() => {
  getAllUsers()
})
</script>
