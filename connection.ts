
import mongoose from 'mongoose';

function connections(): void {

	mongoose.connect("mongodb+srv://dhananjay:dhananjay@cluster0.rqk9e.mongodb.net/furniture?retryWrites=true&w=majority")
		.then(() => console.log("Succesfully conntected"))
		.catch((err : Error) => console.log(err))
}

export { connections };

