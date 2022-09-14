<template>
  <section id="cart-page" v-if="cart && cart.length > 0">
    <h2 id="cart-title">Cart</h2>
    <div id="cart-items" v-if="!checkout">
      <div class="cart-container" v-for="item in cart" :key="item.id">
        <ItemCard :item="item" />
        <span class="quantity-btns">
          <button
            class="reduce-quantity"
            @click="
              reduceCartQuantity(item.cart_props.id, item.cart_props.quantity)
            "
            :disabled="item.cart_props.quantity === 1"
          >
            -
          </button>
          <h3>{{ item.cart_props.quantity }}</h3>
          <button
            class="increase-quantity"
            @click="
              increaseCartQuantity(item.cart_props.id, item.cart_props.quantity)
            "
          >
            +
          </button>
        </span>
        <span class="customer-cart-btns">
          <AddBookmarkButton :user="user" :item="item" />
          <button
            class="remove-from-cart"
            @click="removeCartItem(item.cart_props.id)"
          >
            Remove Item
          </button>
        </span>
      </div>
    </div>
    <button
      class="checkout-btn"
      :class="{ 'in-checkout': checkout }"
      @click="proceedToCheckout"
    >
      Proceed to Checkout
    </button>
    <div id="checkout">
      <div id="checkout-form-container" v-if="checkout">
        <form id="checkout-form" @submit.prevent="submitPayment(user.id)">
          <div id="billing-info">
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
          </div>
          <div id="card-details">
            <label for="credit-card-mount">Credit Card Info: </label>
            <div id="credit-card-mount"></div>
            <p v-if="paymentError">{{ paymentError }}</p>
            <button type="submit" :disabled="loading">
              {{ !loading ? 'pay!!!!' : 'Sending payment' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
  <h1 v-else>Browse around! Nothing in your cart :(</h1>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'
// import { v4 as uuidv4 } from 'uuid'    uuid and idempotency post-course

import {
  GetCartByCustomerId,
  UpdateCartItem,
  DeleteCartItem,
  DeleteWholeCart
} from '../services/CartReq'
import { PostPaymentIntent } from '../services/PaymentReq'
import { CreateOrder } from '../services/OrderReq'
import AddBookmarkButton from '../components/AddBookmarkButton.vue'
import ItemCard from '../components/ItemCard.vue'

defineProps(['user'])
const route = useRoute()
const router = useRouter()

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
const paymentError = ref(null)
// const idempotencyKey = ref(null)
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

// const elementAppearance = ref({
//   theme: 'night',

//   variables: {}
// })

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
  // if (!idempotencyKey.value) idempotencyKey.value = uuidv4()
  if (checkout.value)
    secret.value = await PostPaymentIntent(
      itemPrices.value
      // idempotencyKey.value
    )
  // let clientSecret = `${secret.value.clientSecret}`
  // let appearance = elementAppearance.value
  loading.value = false
  elements.value = stripe.value.elements()
  console.log(elements.value)
  card.value = elements.value.create('card') //style
  console.log(card.value)
  card.value.mount('#credit-card-mount')
}

async function deleteCart(userId) {
  await DeleteWholeCart(userId)
  console.log(userId)
}

//// set cart to order
const order = ref([])
async function addCartToOrder(userId, orderId, cart) {
  cart.forEach((item) => {
    order.value.push({
      itemName: item.name,
      itemPrice: item.price,
      itemQuantity: item.cart_props.quantity
    })
  })
  console.log(order.value)
  await CreateOrder(userId, orderId, order.value)
}

async function submitPayment(userId) {
  if (loading.value) return
  if (secret.value) {
    //// set up sendingText, disable submit when sending (or just use loading)
    loading.value = true
    await stripe.value
      .confirmCardPayment(`${secret.value.clientSecret}`, {
        payment_method: {
          card: card.value,
          billing_details: billingFormValues.value
        }
      })
      .then(async function (result) {
        if (result.error) {
          paymentError.value = result.error.message
          loading.value = false
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            // console.log(res, userId)
            await addCartToOrder(userId, result.paymentIntent.id, cart.value)
            await deleteCart(userId)
            order.value = []
            // idempotencyKey.value = null
            router.push('/payment-success')
          }
        }
      })
  }
}

onMounted(async () => {
  await setCart(route.params.customer_id)
  stripe.value = await loadStripe(STRIPE_PUB_KEY)
})
</script>
