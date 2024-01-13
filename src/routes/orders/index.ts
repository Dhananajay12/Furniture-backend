import express = require('express');
import { Request, Response } from 'express'
import { getOrderController, placeOrderController } from './controller';
// import { ProductVariant } from '../../model';


const router: express.Router = express.Router();


router.post('/placeOrder', async (req: Request, res: Response) => {
	const response = await placeOrderController(req.body , req.user.id);
	res.json(response)
})

router.get('/getOrder', async (req: Request, res: Response) => {
	const response = await getOrderController(req.body);
	res.json(response)
})


export { router }