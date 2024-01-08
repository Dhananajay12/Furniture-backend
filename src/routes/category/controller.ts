import { APIConstants, customResponse } from "../../helper/ApiResponse";
import { Category } from "../../model"


interface FurnitureUpdateRequest {
	_id: string; // or whatever type _id should be
}


const getAllCategoriesController = async () => {

	try {
		const getAllCategories = await Category.read.find({});

		return customResponse("Successfully fetched", APIConstants.StatusCode.Ok, APIConstants.Status.Success, getAllCategories, '')

	} catch (err: any) {
		return customResponse("Successfully fetched", APIConstants.StatusCode.Ok, APIConstants.Status.Success, {}, err.message)

	}
}

const getCategoryByIdCotroller = async (id: string) => {
	try {
		const getCategories = await Category.read.findOne({ _id: id });

		return customResponse("Successfully fetched", APIConstants.StatusCode.Ok, APIConstants.Status.Success, getCategories, '')

	} catch (err: any) {
		return customResponse("Successfully fetched", APIConstants.StatusCode.Ok, APIConstants.Status.Success, {}, err.message)

	}
}


const createCategoryController = async (req: object) => {
	try {
		const createData = await Category.write.create({
			...req
		});

		return customResponse('Successfully create category data', APIConstants.StatusCode.Ok, APIConstants.Status.Success, createData, '');

	} catch (err: any) {
		return customResponse('Failed to crete category', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, err.message);
	}
}


const updateCategoryController = async (req: FurnitureUpdateRequest) => {
	try {
		const updateData = await Category.write.findByIdAndUpdate(req._id, { ...req }, { new: true });

		return customResponse('Successfully update category ', APIConstants.StatusCode.Ok, APIConstants.Status.Success, updateData, '');

	} catch (err: any) {
		return customResponse('Failed to update data', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, err.message);
	}
}

const deleteCategoryController = async (req: FurnitureUpdateRequest) => {
	try {
		const createData = await Category.write.findByIdAndDelete(req._id);

		return customResponse('Successfully delete product data', APIConstants.StatusCode.Ok, APIConstants.Status.Success, createData, '');

	} catch (err: any) {
		return customResponse('Failed to delete data', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, err.message);
	}
}


export {
	getAllCategoriesController,
	createCategoryController,
	updateCategoryController,
	deleteCategoryController,
	getCategoryByIdCotroller
}
