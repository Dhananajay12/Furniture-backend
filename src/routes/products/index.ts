import express = require('express');
import { Request, Response } from 'express';
import { createProductController, deleteProductController, getAllProductController, getProductByIdController, getProductBySearch, updateProductController } from './controller';
// import { createFurnitureController, deleteFurnitureController, getAllFurnitureController, updateFurnitureController } from './controller';

const router: express.Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
	const response = await getAllProductController()
	res.json(response);
})
router.get('/getById/:id', async (req: Request, res: Response) => {
	const response = await getProductByIdController(req.params.id)
	res.json(response);
})

router.get('/searchByName', async (req: Request, res: Response) => {
	const { search } = req.query;
	const response = await getProductBySearch(search)
	res.json(response);
})

router.post('/create', async (req:Request, res:Response) => {
	const response = await createProductController(req.body)
	res.json(response);
})

router.put('/update', async (req: Request, res: Response) => {
	const response = await updateProductController(req.body)
	res.json(response);
})

router.delete('/detele', async (req: Request, res: Response) => {
	const response = await deleteProductController(req.body)
	res.json(response);
})


export { router }