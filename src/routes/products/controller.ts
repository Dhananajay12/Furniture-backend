
import { APIConstants, customResponse } from "../../helper/ApiResponse";
import { Products } from "../../model"

interface FurnitureUpdateRequest {
	_id: string; // or whatever type _id should be
}

const getAllProductController = async () => {
	try {
		const getAllFurnitureData = await Products.read.find();

		return customResponse('Successfully fetched furnitures data', APIConstants.StatusCode.Ok, APIConstants.Status.Success, getAllFurnitureData, '');

	} catch (err: any) {
		return customResponse('Failed to fetched data', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, err.message);
	}
}

const createProductController = async (req: object) => {
	try {
		const createData = await Products.write.create({
			...req
		});

		return customResponse('Successfully fetched furnitures data', APIConstants.StatusCode.Ok, APIConstants.Status.Success, createData, '');

	} catch (err: any) {
		return customResponse('Failed to fetched data', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, err.message);
	}
}


const updateProductController = async (req: FurnitureUpdateRequest) => {
	try {
		const createData = await Products.write.findByIdAndUpdate(req._id, { ...req }, { new: true });

		return customResponse('Successfully fetched furnitures data', APIConstants.StatusCode.Ok, APIConstants.Status.Success, createData, '');

	} catch (err: any) {
		return customResponse('Failed to fetched data', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, err.message);
	}
}

const deleteProductController = async (req: FurnitureUpdateRequest) => {
	try {
		const createData = await Products.write.findByIdAndUpdate(req._id);

		return customResponse('Successfully fetched furnitures data', APIConstants.StatusCode.Ok, APIConstants.Status.Success, createData, '');

	} catch (err: any) {
		return customResponse('Failed to fetched data', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, err.message);
	}
}


export {
	getAllProductController,
	createProductController,
	updateProductController,
	deleteProductController
}