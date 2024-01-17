
import { APIConstants, customResponse } from "../../helper/ApiResponse";
import { Coupon as CouponStruct } from "../../model/Coupon";
import { Coupon } from "../../model/index";



const createCoupon = async (req: CouponStruct) => {
	try {

		const coupon = await Coupon.write.create({ ...req });

		return customResponse("Created Successfully Coupon Document", APIConstants.StatusCode.Ok, APIConstants.Status.Success, coupon, '')

	} catch (err: any) {

		return customResponse("Error while creating coupon", APIConstants.StatusCode.Ok, APIConstants.Status.Success, {}, err.message)
	}


}
const getCouponById = async (id: string) => {
	try {

		const coupon = await Coupon.read.findOne({ _id: id });

		return customResponse("Created Successfully Coupon Document", APIConstants.StatusCode.Ok, APIConstants.Status.Success, coupon, '')

	} catch (err: any) {
		return customResponse("Error while creating coupon", APIConstants.StatusCode.Ok, APIConstants.Status.Success, {}, err.message)
	}


}
const getCouponCoupons = async () => {
	try {

		const coupon = await Coupon.read.find({ showCoupon: true }).sort({ _id: -1 }).lean();

		return customResponse("Created Successfully Coupon Document", APIConstants.StatusCode.Ok, APIConstants.Status.Success, coupon, '')

	} catch (err: any) {
		return customResponse("Error while creating coupon", APIConstants.StatusCode.Ok, APIConstants.Status.Success, {}, err.message)
	}

}




export { createCoupon, getCouponById, getCouponCoupons }