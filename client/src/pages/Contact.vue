<template>
  <div id="contact-page">
    <form id="contact-form" @submit.prevent="submitEmail">
      <span id="contact-name-container">
        <label for="contact-name">Name: </label>
        <input
          type="text"
          name="name"
          id="contact-name"
          :value="contactFormValues.name"
          @input="setContactFormValues"
          required
        />
      </span>
      <span id="contact-email-container">
        <label for="contact-email">Email: </label>
        <input
          type="email"
          name="email"
          id="contact-email"
          :value="contactFormValues.email"
          @input="setContactFormValues"
          required
        />
      </span>
      <span id="contact-message-container">
        <label for="contact-message">Inquiry: </label>
        <textarea
          name="message"
          id="contact-message"
          :value="contactFormValues.message"
          @input="setContactFormValues"
          required
        ></textarea>
      </span>
      <button
        type="submit"
        :disabled="
          !contactFormValues.name ||
          !contactFormValues.email ||
          !contactFormValues.message
        "
      >
        Send Email
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const serviceId = process.env.VUE_APP_SERVICE_ID
const templateId = process.env.VUE_APP_TEMPLATE_ID
const publicKey = process.env.VUE_APP_PUBLIC_KEY

const contactFormValues = ref({
  name: '',
  email: '',
  message: ''
})

function setContactFormValues(e) {
  contactFormValues.value[e.target.name] = e.target.value
}

function submitEmail() {
  emailjs.send(serviceId, templateId, contactFormValues.value, publicKey)
  contactFormValues.value = { name: '', email: '', message: '' }
}
</script>
