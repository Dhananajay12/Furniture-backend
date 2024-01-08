import { Schema } from "mongoose";
import { writeDB } from "../../connection";
import { autoIncrement } from "../helper/AutoIncrement";

interface ProductVariant {
	productVariantId: number,
	productId: number,
	name: string
	sku: string,
	price: number,
	salePrice: Number
	weight: number
	length: number
	breadth: number
	height: number
	inStockCount: number
}

const productVariantSchema = new Schema<ProductVariant>({
	productVariantId: { type: Number, unique: true, sparse: true },
	productId: { type: Number , required:true },
	name: { type: String, },
	sku: { type: String, unique: true },
	price: { type: Number, },
	salePrice: { type: Number, },
	weight: { type: Number, default: 0 },
	length: { type: Number, default: 0 },
	breadth: { type: Number, default: 0 },
	height: { type: Number, default: 0 },
	inStockCount: { type: Number, default: 0 },
});

productVariantSchema.post("save", async (data, next) => {
	try {
		await autoIncrement(
			data,
			writeDB.model("productVariant"),
			"productVariant_id",
			"productVariantId",
			1000000
		);
		next();
	} catch (error: any) {
		throw new Error(error.message);
	}
});


export { productVariantSchema }