import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";


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

	} catch (err) {
		console.log(err)
	}

}

export { authencatorMiddleware }
