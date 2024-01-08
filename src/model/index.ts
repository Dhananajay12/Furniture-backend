import { readDB, writeDB } from "../../connection";
import { AutoIncrementSchema } from "./AutoIncrement";
import { categorySchema } from "./Category";
import { productVariantSchema } from "./ProductVariant";
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
const ProductVariant = {
	read: readDB.model('productVariant', productVariantSchema),
	write: writeDB.model('productVariant', productVariantSchema)
}
const Category = {
	read: readDB.model('category', categorySchema),
	write: writeDB.model('category', categorySchema)
}
const Autoincrement = {
	read: readDB.model('autoIncrement', AutoIncrementSchema),
	write: writeDB.model('autoIncrement', AutoIncrementSchema)
}



export {
	Products,
	Category,
	User,
	Autoincrement,
	ProductVariant
}
