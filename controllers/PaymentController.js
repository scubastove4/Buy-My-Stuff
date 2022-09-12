require('dotenv').config()
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

const calculateTotal = (items) => {
  items.reduce((a, v) => {
    return a + v
  }, 0)
}

const SendPaymentIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateTotal(req.body),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true
    }
  })
  res.send({
    clientSecret: paymentIntent.client_secret
  })
}

module.exports = {
  SendPaymentIntent
}
