<template>
  <main v-if="user">
    <div>
      <h2>Welcome {{ user.firstName }}!</h2>
      <h3>{{ user.email }}</h3>
      <button @click="toggleChangingEmail">Change Email</button>
      <EmailForm
        v-if="changingEmail"
        :newEmailValue="newEmailValue"
        :user="user"
        :newEmailCheck="newEmailCheck"
        @changeNewEmailValue="changeNewEmailValue"
        @changeEmail="changeEmail"
      />
      <button @click="toggleChangingPassword">Change Password</button>
      <PasswordForm
        v-if="changingPassword"
        :newPasswordValues="newPasswordValues"
        :user="user"
        @changeNewPasswordValues="changeNewPasswordValues"
        @changePassword="changePassword"
      />
    </div>
    <section v-if="bookmarks && bookmarks.length > 0">
      <div v-for="item in bookmarks" :key="item.id">
        <ItemCard :item="item" />
        <AddToCartButton :user="user" :item="item" />
        <button @click="removeBookmark(item.bookmark_props.id)">
          Remove Bookmark
        </button>
      </div>
    </section>
    <h2 v-else>Nothing saved :(</h2>
  </main>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { GetBookmarksByUserId, DeleteBookmark } from '../services/BookmarkReq'
import {
  ChangeCustomerPassword,
  ChangeCustomerEmail
} from '../services/CustomerReq'
import AddToCartButton from '../components/AddToCartButton.vue'
import ItemCard from '../components/ItemCard.vue'
import PasswordForm from '../components/PasswordForm.vue'
import EmailForm from '../components/EmailForm.vue'

defineProps(['user'])
const route = useRoute()

//////////////   get/remove bookmarks   ///////////////
const bookmarks = ref(null)

async function setBookmarks(customerId) {
  const data = await GetBookmarksByUserId(customerId)
  bookmarks.value = data.bookmarks
}

async function removeBookmark(bookmarkId) {
  await DeleteBookmark(bookmarkId)
  setBookmarks(route.params.customer_id)
}

onMounted(() => {
  setBookmarks(route.params.customer_id)
})

//////////////   change password   ///////////////
const changingPassword = ref(false)
const newPasswordValues = ref({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})

function toggleChangingPassword() {
  if (!changingPassword.value) {
    changingPassword.value = true
  } else {
    changingPassword.value = false
  }
}

function changeNewPasswordValues(name, val) {
  newPasswordValues.value[name] = val
}

async function changePassword(userId, newPasswordValues) {
  await ChangeCustomerPassword(userId, newPasswordValues)

  toggleChangingPassword()
  newPasswordValues.value = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }
}

//////////////   change email   ///////////////
const changingEmail = ref(false)
const newEmailValue = ref(null)
const newEmailCheck = ref(null)

function toggleChangingEmail() {
  if (!changingEmail.value) {
    changingEmail.value = true
  } else {
    changingEmail.value = false
  }
}

function changeNewEmailValue(val) {
  newEmailValue.value = val
}

async function changeEmail(userId, newEmailValue) {
  const res = await ChangeCustomerEmail(userId, newEmailValue)
  newEmailCheck.value = res
  if (newEmailCheck.value.status === 'Success') {
    toggleChangingEmail()
    newEmailValue = null
    newEmailCheck.value = null
  }
}
</script>
