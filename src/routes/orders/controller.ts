
interface product {
	sku: string,
	quantity: number,
	productId: number,
}

interface OrderBookingData {
	products: product[]
	paymentMethodId: string,
	coupon: string,
	addressId: string
}

const placeOrderController = async (req: OrderBookingData) => {
	console.log(req)
}



export { placeOrderController }