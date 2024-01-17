
import mongoose from 'mongoose';

function connections(): void {
	const mongoDBUrl = process.env.MONGO_DB_URL;

	if (!mongoDBUrl) {
		console.error("MongoDB URL is not defined in the environment variables.");
		return;
	}

	mongoose.connect(mongoDBUrl)
		.then(() => console.log("Succesfully conntected"))
		.catch((err: Error) => console.log(err))
}


export { connections };
export const readDB = mongoose.connection
export const writeDB = mongoose.connection



