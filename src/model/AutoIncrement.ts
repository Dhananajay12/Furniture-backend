import { Schema } from "mongoose"

interface AutoIncrement {
	name: string;
	seq: number;
}

const AutoIncrementSchema = new Schema<AutoIncrement>({
	name: { type: String, required: true, unique: true },
	seq: { type: Number, default: 0, required: true },
});

export { AutoIncrementSchema };
