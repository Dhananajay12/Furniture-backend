
import { APIConstants, customResponse } from "../../helper/ApiResponse";
import { Furniture } from "../../model"


const getAllFurnitureController = async () => {
	try {
		const getAllFurnitureData = await Furniture.read.find();

		return customResponse('Successfully fetched furnitures data', APIConstants.StatusCode.Ok, APIConstants.Status.Success, getAllFurnitureData, '');

	} catch (err: any) {
		return customResponse('Failed to fetched data', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, err.message);
	}
}

const createFurnitureController = async (req: Request) => {
	try {

		const createData = await Furniture.write.create({
     ...req
		});
		
		return customResponse('Successfully fetched furnitures data', APIConstants.StatusCode.Ok, APIConstants.Status.Success, createData, '');

	} catch (err: any) {
		return customResponse('Failed to fetched data', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, err.message);
	}
}




export {
	getAllFurnitureController,
	createFurnitureController
}