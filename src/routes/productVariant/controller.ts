import { APIConstants, customResponse } from "../../helper/ApiResponse"
import { ProductVariant } from "../../model"

const getProductVarirant = async () => {
	try {
		const data = await ProductVariant.read.find();

		return customResponse("Successfully Fetched", APIConstants.StatusCode.Ok, APIConstants.Status.Success, data, '')
	} catch (err: any) {
		return customResponse("Error while fetching error", APIConstants.StatusCode.Ok, APIConstants.Status.Failure, {}, err.message)
	}
}



export { getProductVarirant }