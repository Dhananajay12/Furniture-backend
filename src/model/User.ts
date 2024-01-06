import mongoose from "mongoose";
import bcrypt from 'bcrypt'
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

}, { timestamps: true })

userSchema.pre('save', async function (next) {
	const saltRounds = 8
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, saltRounds);
	}
	next();
});

export { userSchema }