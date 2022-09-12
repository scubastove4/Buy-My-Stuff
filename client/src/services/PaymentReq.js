import Client from './api'

export const PostPaymentIntent = async (itemPrices) => {
  const res = await Client.post('/payments/submit-payment-intent', itemPrices)
  // console.log(res.data.clientSecret)
  return res.data
}

export const ConfirmPaymentIntent = async (secret, billingDetails) => {
  const secretAndBilling = { ...secret, billingDetails }
  console.log(secretAndBilling)
  const res = await Client.post(
    '/payments/confirm-payment-intent',
    secretAndBilling
  )
  console.log(res)
}
