<template>
  <main>
    <section v-if="cart && cart.length > 0">
      <ul>
        <li v-for="item in cart" :key="item.id">
          <h2>{{ item.name }}</h2>
          <h3>{{ item.price }}</h3>
          <img v-if="item.image" :src="item.image" :alt="item.name" />
          <button
            @click="
              reduceCartQuantity(item.cart_props.id, item.cart_props.quantity)
            "
            :disabled="item.cart_props.quantity === 1"
          >
            -
          </button>
          <h3>{{ item.cart_props.quantity }}</h3>
          <button
            @click="
              increaseCartQuantity(item.cart_props.id, item.cart_props.quantity)
            "
          >
            +
          </button>
          <AddBookmarkButton :user="user" :item="item" />
          <button @click="removeCartItem(item.cart_props.id)">
            Remove Item
          </button>
        </li>
      </ul>
      <!-- <OrderForm /> -->
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
    </section>
    <h1 v-else>Browse around! Nothing in your cart :(</h1>
  </main>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue' //onBeforeMount
import { useRoute } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'
// import { StripeElementCard } from '@vue-stripe/vue-stripe'

import {
  GetCartByCustomerId,
  UpdateCartItem,
  DeleteCartItem
} from '../services/CartReq'
import AddBookmarkButton from '../components/AddBookmarkButton.vue'
// import OrderForm from '../components/OrderForm.vue'

defineProps(['user'])
const route = useRoute()

const cart = ref(null)

async function setCart(customerId) {
  const data = await GetCartByCustomerId(customerId)
  cart.value = data.cart
}

async function removeCartItem(cartItemId) {
  await DeleteCartItem(cartItemId)
  setCart(route.params.customer_id)
}

async function reduceCartQuantity(cartItemId, itemQuantity) {
  let quantity = itemQuantity
  quantity--
  await UpdateCartItem(cartItemId, { quantity: quantity })
  setCart(route.params.customer_id)
}

async function increaseCartQuantity(cartItemId, itemQuantity) {
  let quantity = itemQuantity
  quantity++
  await UpdateCartItem(cartItemId, { quantity: quantity })
  setCart(route.params.customer_id)
}

/////////    stripe implementation     //////
let stripe = null
let loading = ref(true)
let elements = null
const STRIPE_PUB_KEY = `${process.env.STRIPE_PUB_KEY}`
const itemPrices = ref([])

function setItemPrices(cart) {
  cart.value.forEach((item) => {
    itemPrices.value.push({
      price: item.price,
      quantity: item.cart_props.quantity,
      mode: 'payment'
    })
  })
}

onMounted(async () => {
  await setCart(route.params.customer_id)
  setItemPrices(cart)
  const ELEMENT_TYPE = 'card'

  stripe = await loadStripe(STRIPE_PUB_KEY)

  elements = stripe.elements() //add clientSecret here clientSecret: '{{CLIENT_SECRET}}'
  const element = elements.create(ELEMENT_TYPE) //style
  element.mount('#credit-card-mount')
  loading.value = false
})

// function redirect(user) {
//   stripe.value.redirectToCheckout({
//     successUrl: 'http://localhost:3000/',
//     cancelUrl: `http://localhost:3000/cart/${user.value.id}`,
//     lineItems: itemPrices.value
//   })
// }
</script>
