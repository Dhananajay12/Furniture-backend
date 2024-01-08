
import { writeDB } from "../../connection";
import { Autoincrement } from "../model";
import { AutoIncrementSchema } from "../model/AutoIncrement";

const autoIncrementCustomerId = async (autoIncField: string, start = 10000) => {
	const incrementData = await Autoincrement.read.findOneAndUpdate(
		{ name: autoIncField },
		{ $inc: { seq: 1 } },
		{
			new: true,
		}
	);

	let newSeq = start;
	if (!incrementData) {
		const newIncrementData = new Autoincrement.write({
			name: autoIncField,
			seq: newSeq,
		});
		newIncrementData.save();
	} else {
		newSeq = incrementData.seq;
	}

	let temp = newSeq.toString();
	return temp;
};

const autoIncrementOrderId = async (autoIncField: string, start = 10000000000) => {
	// const autoIncrement = Autoincrement.write.model("auto_increments");

	const incrementData = await Autoincrement.write.findOneAndUpdate(
		{ name: autoIncField },
		{ $inc: { seq: 1 } },
		{
			new: true,
		}
	);

	let newSeq = start;
	if (!incrementData) {
		const newIncrementData = new Autoincrement.write({
			name: autoIncField,
			seq: newSeq,
		});
		newIncrementData.save();
	} else {
		newSeq = incrementData.seq;
	}

	return newSeq;
};

const autoIncrement = async (data: any, model: any, autoIncField: string, modelFieldName: string, start = 1, session = null) => {

	const autoIncrement = writeDB.model("auto_increments", AutoIncrementSchema);

	const incrementData = await autoIncrement.findOneAndUpdate(
		{ name: autoIncField },
		{ $inc: { seq: 1 } },
		{
			new: true,
			session,
		}
	);

	let newSeq = start;
	if (!incrementData) {
		// creating auo increment data for the first time
		const newIncrementData = new autoIncrement({
			name: autoIncField,
			seq: newSeq,
		});
		newIncrementData.save();
	} else {
		newSeq = incrementData.seq;
	}

	const newData = await model.findOneAndUpdate({ _id: data._id },{ [modelFieldName]: newSeq },{ new: true, session });

	console.log(newData)

	return newData;
};
export {
	autoIncrementCustomerId,
	autoIncrement,
	autoIncrementOrderId,
};
