import Client from './api'

export const PostPaymentIntent = async (itemPrices) => {
  const res = await Client.post('/payments/submit-payment-intent', itemPrices)
  // console.log(res.data)
  return res.data
}
