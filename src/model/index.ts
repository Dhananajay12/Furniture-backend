import { readDB, writeDB } from "../../connection";
import { categorySchema } from "./Category";
import { productSchema } from "./Products";
import { userSchema } from "./User";


const Products = {
	read: readDB.model('product', productSchema),
	write: writeDB.model('product', productSchema)
}

const User = {
	read: readDB.model('users', userSchema),
	write: writeDB.model('users', userSchema)
}
const Category = {
	read: readDB.model('category', categorySchema),
	write: writeDB.model('category', categorySchema)
}


export {
	Products,
	Category,
	User
}
