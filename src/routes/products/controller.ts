
import { APIConstants, customResponse } from "../../helper/ApiResponse";
import { Products } from "../../model"

interface FurnitureUpdateRequest {
	_id: string; // or whatever type _id should be
}

const getAllProductController = async () => {
	try {
		const getAllProductData = await Products.read.find();

		return customResponse('Successfully fetched products data', APIConstants.StatusCode.Ok, APIConstants.Status.Success, getAllProductData, '');

	} catch (err: any) {
		return customResponse('Failed to fetched data', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, err.message);
	}
}
const getProductByIdController = async (req: FurnitureUpdateRequest) => {
	try {
		const getProductData = await Products.read.findOne({ _id: req._id });

		return customResponse('Successfully fetched product data', APIConstants.StatusCode.Ok, APIConstants.Status.Success, getProductData, '');

	} catch (err: any) {
		return customResponse('Failed to fetched data', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, err.message);
	}
}


const createProductController = async (req: object) => {
	try {
		const createData = await Products.write.create({
			...req
		});

		return customResponse('Successfully create product data', APIConstants.StatusCode.Ok, APIConstants.Status.Success, createData, '');

	} catch (err: any) {
		return customResponse('Failed to fetched data', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, err.message);
	}
}


const updateProductController = async (req: FurnitureUpdateRequest) => {
	try {
		const updateData = await Products.write.findByIdAndUpdate(req._id, { ...req }, { new: true });

		return customResponse('Successfully update product data', APIConstants.StatusCode.Ok, APIConstants.Status.Success, updateData, '');

	} catch (err: any) {
		return customResponse('Failed to update data', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, err.message);
	}
}

const deleteProductController = async (req: FurnitureUpdateRequest) => {
	try {
		const createData = await Products.write.findByIdAndDelete(req._id);

		return customResponse('Successfully delete', APIConstants.StatusCode.Ok, APIConstants.Status.Success, createData, '');

	} catch (err: any) {
		return customResponse('Failed to delete data', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, err.message);
	}
}
const getProductBySearch = async (serach: any) => {
	try {

		const searchTerm = serach;

		if (!searchTerm) throw new Error("Please provide a search term");

		const regex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive matching

		const data = await Products.write.find({
			$or: [
				{ name: { $regex: regex } },
				{ description: { $regex: regex } },
				{ category: { $elemMatch: { $regex: regex } } },
			]
		}).sort({ _id: -1 });

		return customResponse('Successfully delete', APIConstants.StatusCode.Ok, APIConstants.Status.Success, data, '');

	} catch (err: any) {
		return customResponse('Failed to delete data', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, err.message);
	}
}




export {
	getAllProductController,
	createProductController,
	updateProductController,
	deleteProductController,
	getProductByIdController,
	getProductBySearch
}