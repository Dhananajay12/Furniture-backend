import { Schema } from "mongoose";

interface SchemaElement {
	title : string;
	description:string;
	featuredImg:string
}


const categorySchema = new Schema<SchemaElement>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	featuredImg: { type: String, required: true },
})

export { categorySchema }