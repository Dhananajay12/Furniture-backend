const express = require('express');
import { Request, Response } from "express";
import { createAddress } from "./controller";

const router = express.Router();


router.post('/create', async (req: Request, res: Response) => {

	const reponse = await createAddress(req.body)
	res.json(reponse)

})

export { router };