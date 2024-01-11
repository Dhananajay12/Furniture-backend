import { Schema } from "mongoose"

interface Address {
	uid: Schema.Types.ObjectId,
	reciverName: string,
	tag: string
	line_1: string,
	line_2: string,
	postcode: Number,
	city: string,
	state: string,
	country: string,
	phone: Number,
}

const AddressSchema = new Schema<Address>({
	uid: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true
	},
	reciverName: { type: String },
	tag: { type: String },
	line_1: { type: String, required: true },
	line_2: { type: String },
	postcode: { type: Number },
	city: { type: String },
	state: { type: String, required: true },
	country: { type: String, required: true },
	phone: { type: Number, required: true },
}, { timestamps: true });

export { AddressSchema };
