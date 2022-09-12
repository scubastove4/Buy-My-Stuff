require('dotenv').config()
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

const SendPaymentIntent = async (req, res) => {
  try {
    const amount = req.body.reduce((a, v) => {
      return a + v.price * v.quantity
    }, 0)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true
      }
    })
    res.send({
      clientSecret: paymentIntent.client_secret
    })
  } catch (e) {
    throw e
  }
}

const ConfirmPaymentIntent = async (req, res) => {
  try {
    const confirmation = await stripe.confirmCardPayment(req.body.secret, {
      payment_method: {
        card: card,
        billing_details: req.body.billingFormValues
      }
    })
    console.log(confirmation)
  } catch (e) {}
}

module.exports = {
  SendPaymentIntent,
  ConfirmPaymentIntent
}
