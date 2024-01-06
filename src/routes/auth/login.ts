import express = require('express');
import { Request, Response } from 'express';

const router = express.Router();

router.post('/login', (req:Request, res: Response) => {

	res.json({ message: "success" });
})

router.post('/register', (req: Request, res: Response) => {
	res.json({ message: "success" });
})


export { router }