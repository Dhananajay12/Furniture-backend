
import mongoose, { Document } from "mongoose";

interface FurnitureDocument extends Document {
	name: string;
	image?: string;
	description?: string;
	price: number;
	salePrice: number;
}

const furnitureSchema = new mongoose.Schema<FurnitureDocument>({
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

export { furnitureSchema }
// export const Furniture = mongoose.model('furniure', furnitureSchema);
