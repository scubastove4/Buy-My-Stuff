<template>
  <main id="user-page" v-if="user && user.isAdmin">
    <h2 id="customer-view-title">Customers</h2>
    <section id="customer-view">
      <div
        class="customer-container"
        v-for="customer in allCustomers"
        :key="customer.id"
      >
        <UserCard :customer="customer" />
        <button @click="deleteCustomer(customer.id)">Delete Customer</button>
      </div>
    </section>
    <span id="admin-header">
      <h2 id="admin-view-title">Admins</h2>
      <button id="add-admin-btn" @click="changeAddingAdmin">Add Admin</button>
    </span>
    <SignUpForm
      v-if="addingAdmin"
      :user="user"
      :newAdminValues="newAdminValues"
      :newAdmin="newAdmin"
      @setNewAdminValues="setNewAdminValues"
      @createNewAdmin="createNewAdmin"
    />
    <section v-else id="admin-view">
      <div class="admin-container" v-for="admin in allAdmins" :key="admin.id">
        <UserCard :admin="admin" />
        <button
          @click="deleteAdmin(allAdmins, admin.id, user.id)"
          :disabled="allAdmins.length === 1 || admin.id === 1"
        >
          Delete Admin
        </button>
      </div>
    </section>
  </main>
  <h1 v-else>You do not have access to this page</h1>
</template>

<script setup>
import { defineProps, ref, onMounted, defineEmits } from 'vue'

import { GetAllAdmins, SignUpAdmin, DeleteAdmin } from '../services/AdminReq'
import { GetAllCustomers, DeleteCustomer } from '../services/CustomerReq'
import UserCard from '../components/UserCard.vue'
import SignUpForm from '../components/SignUpForm.vue'

defineProps(['user'])
const emit = defineEmits(['logout'])

//////////     get customers and admins     ///////////////

const allAdmins = ref(null)
const allCustomers = ref(null)

async function getAllUsers() {
  const admins = await GetAllAdmins()
  const customers = await GetAllCustomers()
  allAdmins.value = admins
  allCustomers.value = customers
}

async function deleteAdmin(allAdmins, adminId, userId) {
  const adminObj = {
    admins: allAdmins,
    adminId: adminId
  }
  await DeleteAdmin(adminObj)
  getAllUsers()
  userId === adminId && emit('logout')
}

async function deleteCustomer(customerId) {
  await DeleteCustomer(customerId)
  getAllUsers()
}

onMounted(getAllUsers)

//////////     open/close new admin form    ///////////////
const addingAdmin = ref(false)
function changeAddingAdmin() {
  !addingAdmin.value ? (addingAdmin.value = true) : (addingAdmin.value = false)
}

//////////     create new admin     ///////////////
const newAdminValues = ref({
  firstName: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const newAdmin = ref(null)
function setNewAdminValues(name, val) {
  newAdminValues.value[name] = val
}
function resetNewAdminValues() {
  newAdminValues.value = {
    firstName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
}
async function createNewAdmin() {
  newAdmin.value = await SignUpAdmin(newAdminValues.value)
  if (newAdmin.value.msg) {
    return newAdmin.value.msg
  } else {
    resetNewAdminValues()
    changeAddingAdmin()
    getAllUsers()
    newAdmin.value = null
  }
}
</script>
