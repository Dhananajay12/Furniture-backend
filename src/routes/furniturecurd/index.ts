import express = require('express');
import { Request, Response } from 'express';
import { createFurnitureController, deleteFurnitureController, getAllFurnitureController, updateFurnitureController } from './controller';

const router: express.Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
	const response = await getAllFurnitureController()
	res.json(response);
})

router.post('/create', async (req:Request, res:Response) => {
	const response = await createFurnitureController(req.body)
	res.json(response);
})

router.put('/update', async (req: Request, res: Response) => {
	const response = await updateFurnitureController(req.body)
	res.json(response);
})

router.delete('/detele', async (req: Request, res: Response) => {
	const response = await deleteFurnitureController(req.body)
	res.json(response);
})

console.log(process.env.JWT_SECRET_KEY)

export { router }