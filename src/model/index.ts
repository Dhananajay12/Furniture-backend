import { readDB, writeDB } from "../../connection";
import { furnitureSchema } from "./Furniture";
import { userSchema } from "./User";


const Furniture = {
	read: readDB.model('furniure', furnitureSchema),
	write: writeDB.model('furniure', furnitureSchema)
}

const User = {
	read: readDB.model('users', userSchema),
	write: writeDB.model('users', userSchema)
}


export {
	Furniture,
	User
}
