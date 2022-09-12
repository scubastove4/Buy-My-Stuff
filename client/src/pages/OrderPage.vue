<template>
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
    <input type="text" name="creditCard" id="credit-card-mount" />
    <!-- <label for="card-expiration">Expiration Date: </label>
    <input type="text" name="expiration" id="card-expiration">
    <label for="card-expiration">Expiration Date: </label>
    <input type="text" name="expiration" id="card-expiration"> -->
  </form>
</template>

<script setup>
// import { ref, onMounted } from 'vue'
// import { Stripe } from 'stripe'
// import { StripeElementCard } from '@vue-stripe/vue-stripe'

// const spk = process.env.STRIPE_PUB_KEY
// const lockSubmit = false
// const stripe = ref(null)
// const card = ref(null)
// function setItemPrices(cart) {
//   cart.forEach((item) => {
//     itemPrices.value.push(item.price * item.cart_props.quantity)
//   })
// }

// onMounted(loadStripe)
</script>
