
import mongoose from 'mongoose';
import { authencatorMiddleware } from './src/middleware/Authenticator';
// authencatorMiddleware();

function connections(): void {

	mongoose.connect("mongodb+srv://dhananjay:dhananjay@cluster0.rqk9e.mongodb.net/furniture?retryWrites=true&w=majority")
		.then(() => console.log("Succesfully conntected"))
		.catch((err : Error) => console.log(err))
}


// module.exports.readDB = mongoose.connection;
// module.exports.writeDB = mongoose.connection;
export { connections };
export const readDB = mongoose.connection
export const writeDB = mongoose.connection



