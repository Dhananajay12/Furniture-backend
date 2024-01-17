import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { APIConstants, customResponse } from '../helper/ApiResponse';

declare module 'express' {
	interface Request {
		user?: any; // Replace 'DecodedUser' with the actual type of your user object
	}
}

const authencatorMiddleware = (req: Request, res: Response, next: NextFunction) => {

	try {
		const token = req.headers['authorization']?.replace('Bearer ', '');

		if (!token) {
			throw new Error("Token not found");
		}

		let jwtSecretKey = process.env.JWT_SECRET_KEY;

		if (!jwtSecretKey) {
			throw new Error("JWT secret key not found");
		}

		const verified = jwt.verify(token, jwtSecretKey as Secret);

		req.user = verified

		next();
	} catch (err: any) {
		return customResponse("Error while token process", APIConstants.StatusCode.BadRequest, APIConstants.Status.Failure, {}, err.message)
	}

}

function restrictTo(roles = ['']) {

	return function (req: Request, res: Response, next: NextFunction) {
		if (!req.user.role) return customResponse("user is not present in request", APIConstants.StatusCode.BadRequest, APIConstants.Status.Failure, {}, "user is not present in request")

		if (req.user?.role && !roles.includes(req.user?.role)) return customResponse("UnAuthorized", APIConstants.StatusCode.BadRequest, APIConstants.Status.Failure, {}, "UnAuthorized")

		return next();
	}

}


export { authencatorMiddleware, restrictTo }
