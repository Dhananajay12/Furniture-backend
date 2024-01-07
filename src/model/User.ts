import mongoose from "mongoose";
import bcrypt, { hash } from 'bcrypt'
import { createHmac, randomBytes } from 'crypto'


interface UserDocument extends Document {

	fullName: string,
	phone: number,
	email: string,
	salt: string,
	password: string,
	role:string
}

const userSchema = new mongoose.Schema<UserDocument>({
	fullName: {
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
	salt: {
		type: String
	},
	role:{
   type:String,
	 enum:['user','admin']
	},
	password: {
		type: String,
		require: true
	}

}, { timestamps: true })

userSchema.pre('save', async function (next) {
	const user = this;

	if (!user.isModified('password')) return;

	const salt = randomBytes(16).toString();

	const hashPass = createHmac('sha256', salt).update(user.password).digest('hex');

	this.salt = salt;
	this.password = hashPass;

	next();
});


userSchema.static('matchPassword', async function (email, password) {
	const user = await this.findOne({ email });

	if (!user) throw new Error('User not found!');

	const salt = user.salt;
	const hashPass = user.password;

	const userProvidedHas = createHmac("sha256", salt, password);

	if (userProvidedHas !== hashPass) throw new Error('Incorrect Password')

	return {...user._doc , password:undefined , salt: undefined};

});


export { userSchema }