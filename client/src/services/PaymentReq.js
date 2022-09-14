import Client from './api'

export const PostPaymentIntent = async (itemPrices, idempotencyKey) => {
  const res = await Client.post('/payments/submit-payment-intent', {
    itemPrices: itemPrices,
    idempotencyKey: idempotencyKey
  })
  // console.log(res.data)
  return res.data
}
