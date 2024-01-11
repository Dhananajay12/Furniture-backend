const express = require('express');
import { Request, Response } from "express";
import { createAddress, getAddress, getAddressById } from "./controller";

const router = express.Router();


router.post('/create', async (req: Request, res: Response) => {
	const reponse = await createAddress(req.body )
	res.json(reponse)
})

router.get('/getAddress', async (req: Request, res: Response) => {
	const reponse = await getAddress(req)
	res.json(reponse)

})
router.get('/getAddressbyId/:id', async (req: Request, res: Response) => {
	const reponse = await getAddressById(req)
	res.json(reponse)
})

export { router };