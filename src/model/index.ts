import { readDB, writeDB } from "../../connection";
import { AddressSchema } from "./Address";
import { AutoIncrementSchema } from "./AutoIncrement";
import { categorySchema } from "./Category";
import { couponSchema } from "./Coupon";
import { orderSchema } from "./Orders";
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
const Address = {
	read: readDB.model('address', AddressSchema),
	write: writeDB.model('address', AddressSchema)
}

const Order = {
	read: readDB.model('order', orderSchema),
	write: writeDB.model('order', orderSchema)
}
const Coupon = {
	read: readDB.model('coupon', couponSchema),
	write: writeDB.model('coupon', couponSchema)
}


export {
	Products,
	Category,
	User,
	Autoincrement,
	ProductVariant,
	Address,
	Order,
	Coupon
}
