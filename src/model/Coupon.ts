import { Schema } from "mongoose"

export interface Coupon {
	code: string,
	description: string
	discountType: string
	discountAmount: number
	applyByDefault?: Boolean,
	minimumAmount: Number,
	showCoupon?: Boolean,
}

const couponSchema = new Schema<Coupon>({
	code: { type: String, required: true },
	description: { type: String, required: true },
	discountType: { type: String, required: true },
	discountAmount: { type: Number, required: true },
	applyByDefault: { type: Boolean, default: true },
	minimumAmount: { type: Number, required: true },
	showCoupon: { type: Boolean, default: false },
}, { timestamps: true })

export { couponSchema }



