import express = require('express');
import { Request, Response } from 'express';
import { getAllFurnitureController } from './controller';

const router: express.Router = express.Router();

router.get('/', async (req, res) => {
	const response = await getAllFurnitureController()
	res.json(response);
})



export { router }