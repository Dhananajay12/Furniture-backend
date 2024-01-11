import { APIConstants, customResponse } from "../../helper/ApiResponse"
import matchPassword from "../../helper/AuthFunctions"
import { User } from "../../model"
import crypto from 'crypto'

const loginController = async (email: string, password: string) => {

	try {
		const data = await matchPassword(email, password)

		if (data.status === 400) throw new Error(data.message);

		return customResponse("login Successfully", APIConstants.StatusCode.Ok, APIConstants.Status.Success, data, '')
	} catch (err: any) {
		return customResponse("Error while login", APIConstants.StatusCode.BadRequest, APIConstants.Status.Failure, {}, err.message)
	}
}


const registerController = async (first_name: string, last_name: string, phone: number, email: string, password: string) => {
	try {

		if (!first_name || !last_name || !phone || !email || !password) throw new Error('please provide all fields');

		const userData = await User.write.create({ uid: crypto.randomUUID() ,first_name, last_name, phone, email, password })

		return customResponse("Successfully register ", APIConstants.StatusCode.Ok, APIConstants.Status.Success, userData, '')

	} catch (err: any) {
		return customResponse("Error while creating user", APIConstants.StatusCode.BadRequest, APIConstants.Status.Failure, {}, err.message)
	}
}

export { loginController, registerController }