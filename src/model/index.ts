import { readDB, writeDB } from "../../connection";
import { furnitureSchema } from "./Furniture";


const Furniture = {
	read: readDB.model('furniure', furnitureSchema),
	write: writeDB.model('furniure', furnitureSchema)
}

export {
	Furniture
}
