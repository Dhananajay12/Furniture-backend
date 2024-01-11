import { APIConstants, customResponse } from "../../helper/ApiResponse";
import { Address } from "../../model";

interface Address {
	reciverName: string,
	tag: string
	line_1: string,
	line_2: string,
	postcode: Number,
	city: string,
	state: string,
	country: string,
	phone: Number,
}

const createAddress = async (req: Address ) => {
	try {
		const { reciverName, tag, line_1, line_2, postcode, city, state, country, phone } = req;

		if (!reciverName || !tag || !line_1 || !line_2 || !postcode || !city || !state || !country! || !phone) throw new Error("please provide all fields")


		const address = await Address.write.create({ ...req })

		return customResponse("error while creating address", APIConstants.StatusCode.Ok, APIConstants.Status.Success, address, '')

	} catch (err: any) {
		return customResponse("error while creating address", APIConstants.StatusCode.BadRequest, APIConstants.Status.Failure, {}, err.message)
	}
}

const getAddress = async (req: any) => {

	try {
		const { user } = req;

		const address = await Address.read.find({ uid: user.userId })

		return customResponse("error while creating address", APIConstants.StatusCode.Ok, APIConstants.Status.Success, address, '')

	} catch (err: any) {
		return customResponse("error while creating address", APIConstants.StatusCode.BadRequest, APIConstants.Status.Failure, {}, err.message)
	}
}

const getAddressById = async (req: any) => {
	try {
		const { user } = req;

		const address = await Address.read.find({ _id: req.params.id, user: user.userId })

		return customResponse("error while creating address", APIConstants.StatusCode.Ok, APIConstants.Status.Success, address, '')

	} catch (err: any) {
		return customResponse("error while creating address", APIConstants.StatusCode.BadRequest, APIConstants.Status.Failure, {}, err.message)
	}
}


export { createAddress, getAddress, getAddressById }