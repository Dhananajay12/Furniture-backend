import express = require('express');
import { Request, Response } from 'express';
import { loginController, registerController } from './controller';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
	const { email, password } = req.body
	const response = await loginController(email, password)
	res.json(response);
})

router.post('/register', async (req: Request, res: Response) => {

	const { fullName,phone , email, password } = req.body
	const response = await registerController(fullName, phone, email, password)
	res.json(response);
})


export { router }