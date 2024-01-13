import { Schema } from "mongoose";
import { User } from "../model";
import { createHmac } from 'crypto'
import  jwt, { Secret }  from "jsonwebtoken";
interface User {
	_doc: {
		password: string;
		salt: string;
		// Include other properties as needed
	};
}

interface Auth {
	email: string;
	password: string;
}

interface UserToken {
	_id: string;
	uid: string,
	first_name: string,
	last_name: string,
	phone: number,
	email: string,
	role: string;
}


const createTokenForUser = (user: UserToken) => {
   
	const token = jwt.sign(user, process.env.JWT_SECRET_KEY as Secret)
	return token      
}



const matchPassword = async (email: string, password: string) => {

	try {

		const user = await User.read.findOne({ email });

		if (!user) throw new Error('User not found!');

		const salt = user.salt;
		const hashPass = user.password;

		const userProvidedHash = createHmac("sha256", salt).update(password).digest('hex');

		
		if (userProvidedHash !== hashPass) throw new Error('Incorrect Password');

		const userData = {
			_id: user._id.toString(),
			uid: user.uid,
			first_name: user.first_name,
			last_name: user.last_name,
			phone: user.phone,
			email: user.email,
			role: user.role
		}

		const data = createTokenForUser(userData)
		
		return { userId: user._id.toString(), token: data, status: 200 };
	} catch (err: any) {
		return { message: err.message, status: 400 }
	}
};

export default matchPassword;