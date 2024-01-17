
import express = require('express');
import { Request, Response } from 'express';
import { createCoupon, getCouponById, getCouponCoupons } from './controller';

const router: express.Router = express.Router();


router.post('/create', async (req: Request, res: Response) => {

	const response = await createCoupon(req.body)
	res.json(response)

})

router.get('/getCoupons/:id', async (req: Request, res: Response) => {
	const response = await getCouponById(req.params.id)
	res.json(response)
})


router.get('/getCoupons', async (req: Request, res: Response) => {
	const response = await getCouponCoupons()
	res.json(response)
})


export { router }

