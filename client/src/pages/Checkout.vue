<template>
  <div>
    <form>
      <label for="card-name">Name on Card: </label>
      <input type="text" name="name" id="card-name" />
      <label for="card-address-one">Address 1: </label>
      <input type="text" name="addressOne" id="card-address-one" />
      <label for="card-address">Address 2: </label>
      <input type="text" name="addressTwo" id="card-address-two" />
      <label for="card-city">City: </label>
      <input type="text" name="city" id="card-city" />
      <label for="card-state">State: </label>
      <input type="text" name="state" id="card-state" />
      <label for="card-zip">ZIP: </label>
      <input type="text" name="zip" id="card-zip" />
      <label for="credit-card-mount">Credit Card Info: </label>
      <div id="credit-card-mount"></div>
      <!-- <label for="card-expiration">Expiration Date: </label>
    <input type="text" name="expiration" id="card-expiration">
    <label for="card-expiration">Expiration Date: </label>
    <input type="text" name="expiration" id="card-expiration"> -->
    </form>
    <button @submit.prevent="pay">pay!!!!</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
// import { StripeElementCard } from '@vue-stripe/vue-stripe'

onMounted(() => {
  const ELEMENT_TYPE = 'card'

  stripe = await loadStripe(STRIPE_PUB_KEY)

  elements = stripe.elements() //add clientSecret here clientSecret: '{{CLIENT_SECRET}}'
  const element = elements.create(ELEMENT_TYPE) //style
  element.mount('#credit-card-mount')
  loading.value = false
})
</script>
