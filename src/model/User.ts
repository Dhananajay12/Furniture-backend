import mongoose from "mongoose";

interface UserDocument extends Document {

	userId: string,
	firstName: string,
	lastName: string,
	phone: number,
	email: string,
	password: string
}

const userSchema = new mongoose.Schema<UserDocument>({
	userId: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		require: true
	}

})

export { userSchema }