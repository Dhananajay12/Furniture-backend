import { Schema } from "mongoose";

interface SchemaElement {
	id: number;
	status: string;
	total: number;
	payment_transaction_id: string;
	shipping: {
		first_name: string,
		last_name: string,
		company: string,
		address_1: string,
		address_2: string,
		city: string,
		state: string,
		postcode: string,
		country: string
	}
	billing: {
		first_name: string,
		last_name: string,
		company: string,
		address_1: string,
		address_2: string,
		city: string,
		state: string,
		postcode: string,
		country: string,
		email: string,
		phone: string,
	}

}



const Billing = {
	first_name: String,
	last_name: String,
	company: String,
	address_1: String,
	address_2: String,
	city: String,
	state: String,
	postcode: String,
	country: String,
	email: String,
	phone: String,
}

const Shipping = {
	first_name: String,
	last_name: String,
	company: String,
	address_1: String,
	address_2: String,
	city: String,
	state: String,
	postcode: String,
	country: String
}

const orderSchema = new Schema<SchemaElement>({
	id: { type: Number, required: true },
	status: { type: String, required: true },
	payment_transaction_id: String,
	total: Number,
	shipping: Shipping,
	billing: Billing,
})

export { orderSchema }