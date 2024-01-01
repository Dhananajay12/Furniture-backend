import mongoose from "mongoose";


const furnitureSchema = new mongoose.Schema({

	name: {
		type: String,
		require: true
	},
	image: {
		type: String,
	},
	description: {
		type: String,
	},
	price: {
		type: Number,
		default: 0
	},
	salePrice: {
		type: Number,
		default: 0
	}
})

export const Furniture = mongoose.model('furniure', furnitureSchema);
