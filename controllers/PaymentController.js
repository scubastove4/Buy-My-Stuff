require('dotenv').config()
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)
const load = process.env.STRIPE_SECRET_KEY

const SendPaymentIntent = async (req, res) => {
  try {
    // console.log(req.headers)
    // const amount = req.body.reduce((a, v) => {
    //   return a + v.price * v.quantity
    // }, 0)
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount * 100,
    //   currency: 'usd',
    //   automatic_payment_methods: {
    //     enabled: true
    //   }
    // })
    res.status(200).send({
      // clientSecret: paymentIntent.client_secret
      load
    })
  } catch (e) {
    throw e
  }
}

module.exports = {
  SendPaymentIntent
}
