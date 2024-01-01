import express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

	console.log("agya")
	res.json({message:"success"});
})



export { router }