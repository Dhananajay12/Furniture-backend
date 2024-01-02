// import { Err } from 'express';
import { APIConstants, customResponse } from "../../helper/ApiResponse";
import { Furniture } from "../../model"


const getAllFurnitureController = async () => {
	try {

		const getAllFurnitureData = await Furniture.read.find();

		return customResponse('Successfully fetched furnitures data', APIConstants.StatusCode.Ok, APIConstants.Status.Success, getAllFurnitureData, '');

	} catch (err: any) {
		console.log(err.message)
		return customResponse('Failed to fetched data', APIConstants.StatusCode.InternalServerError, APIConstants.Status.Failure, {}, '');
	}

}

export {
	getAllFurnitureController
}