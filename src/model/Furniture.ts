
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
		required: true
	},
	image: {
		type: String,
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	salePrice: {
		type: Number,
		required: true
	}
})

export { furnitureSchema }
// export const Furniture = mongoose.model('furniure', furnitureSchema);
