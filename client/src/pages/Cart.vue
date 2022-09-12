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
      <button @click="proceedToCheckout">Proceed to Checkout</button>
      <div v-if="checkout">
        <form @submit.prevent="submitPayment">
          <label for="card-name">Name on Card: </label>
          <input
            type="text"
            name="name"
            id="card-name"
            @input="setBillingFormValues"
          />
          <label for="card-address-one">Address 1: </label>
          <input
            type="text"
            name="line1"
            id="card-address-one"
            @input="setBillingFormValues"
          />
          <label for="card-address">Address 2: </label>
          <input
            type="text"
            name="line2"
            id="card-address-two"
            @input="setBillingFormValues"
          />
          <label for="card-city">City: </label>
          <input
            type="text"
            name="city"
            id="card-city"
            @input="setBillingFormValues"
          />
          <label for="card-state">State: </label>
          <input
            type="text"
            name="state"
            id="card-state"
            @input="setBillingFormValues"
          />
          <label for="card-zip">ZIP: </label>
          <input
            type="text"
            name="postal_code"
            id="card-zip"
            @input="setBillingFormValues"
          />
          <label for="credit-card-mount">Credit Card Info: </label>
          <div id="credit-card-mount"></div>
          <button type="submit">pay!!!!</button>
        </form>
      </div>
    </section>
    <h1 v-else>Browse around! Nothing in your cart :(</h1>
  </main>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'

import {
  GetCartByCustomerId,
  UpdateCartItem,
  DeleteCartItem
} from '../services/CartReq'
import { PostPaymentIntent } from '../services/PaymentReq' //ConfirmPaymentIntent
import AddBookmarkButton from '../components/AddBookmarkButton.vue'

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
const stripe = ref(null)
const checkout = ref(false)
const secret = ref(null)
const loading = ref(true)
const elements = ref(null)
const card = ref(null)
const STRIPE_PUB_KEY = `${process.env.VUE_APP_STRIPE_PUB_KEY}`
const itemPrices = ref([])
const billingFormValues = ref({
  name: '',
  address: {
    city: '',
    line1: '',
    line2: '',
    state: '',
    postal_code: ''
  }
})

function setItemPrices(cart) {
  cart.value.forEach((item) => {
    itemPrices.value.push({
      price: item.price,
      quantity: item.cart_props.quantity
    })
  })
}

function setBillingFormValues(e) {
  if (e.target.name === 'name') {
    billingFormValues.value.name = e.target.value
  } else {
    billingFormValues.value.address[e.target.name] = e.target.value
  }
}

async function proceedToCheckout() {
  !checkout.value ? (checkout.value = true) : (checkout.value = false)
  setItemPrices(cart)
  secret.value = await PostPaymentIntent(itemPrices.value)
  // console.log(secret)
  elements.value = stripe.value.elements()
  card.value = elements.value.create('card') //style
  card.value.mount('#credit-card-mount')
  loading.value = false
}

async function submitPayment() {
  if (loading.value) return
  if (secret.value) {
    const res = await stripe.value.confirmCardPayment(
      `${secret.value.clientSecret}`,
      {
        payment_method: {
          card: card.value,
          billing_details: billingFormValues.value
        }
      }
    )
    console.log(res)
    loading.value = true
  }
}

onMounted(async () => {
  await setCart(route.params.customer_id)

  stripe.value = await loadStripe(STRIPE_PUB_KEY)
})

// function redirect(user) {
//   stripe.value.redirectToCheckout({
//     successUrl: 'http://localhost:3000/',
//     cancelUrl: `http://localhost:3000/cart/${user.value.id}`,
//     lineItems: itemPrices.value
//   })
// }
</script>
