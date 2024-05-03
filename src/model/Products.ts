
import mongoose, { Document, Schema } from "mongoose";

interface FurnitureDocument extends Document {
	productId: number;
	sku: string;
	category: Schema.Types.ObjectId[];
	productVariantId: Schema.Types.ObjectId[];
	name: string;
	gallery: string[];
	inStock: boolean;
	image?: string;
	description?: string;
	star:number;
	mostLoved: boolean;
	price: number;
	salePrice: number;
}

const productSchema = new mongoose.Schema<FurnitureDocument>({
	productId: { type: Number, unique: true, sparse: true },
	sku: { type: String, unique: true, sparse: true },
	name: { type: String, required: true },
	category: {
		type: [Schema.Types.ObjectId],
		ref: "category",
	},
	productVariantId: {
		type: [Schema.Types.ObjectId],
		ref: 'productVariant'
	},
	salePrice: { type: Number, required: true, default: 0 },
	star: { type: Number, required: true, default: 0 },
	price: { type: Number, required: true, default: 0 },
	description: { type: String, required: true },
	inStock: { type: Boolean, required: true, default: true },
	gallery: { type: [String], required: true },
	mostLoved: { type: Boolean, default: false },
}, { timestamps: true })

// productSchema
// 	.pre('find', function (next) {
// 		this.populate('category');
// 		this.populate('productVariant');
// 		next();
// 	})
// 	.pre('findOne', function (next) {
// 		this.populate('category');
// 		this.populate('productVariant');
// 		next();
// 	});


export { productSchema }
// export const Furniture = mongoose.model('furniure', furnitureSchema);
