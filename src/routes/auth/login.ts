import express = require('express');
import { Request, Response } from 'express';
import { loginController } from './controller';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
	const { email, password } = req.body
	const response = await loginController(email, password)
	res.json(response);
})

router.post('/register', (req: Request, res: Response) => {
	res.json({ message: "success" });
})


export { router }