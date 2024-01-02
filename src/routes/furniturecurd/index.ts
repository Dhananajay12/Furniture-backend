import express = require('express');
import { Request, Response } from 'express';
import { createFurnitureController, getAllFurnitureController } from './controller';

const router: express.Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
	const response = await getAllFurnitureController()
	res.json(response);
})

router.post('/create', async (req:Request, res:Response) => {
	const response = await createFurnitureController(req.body)
	res.json(response);
})





export { router }