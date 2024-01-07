import express = require('express');
import { Router, } from "express";
import { router as productRouter } from "./products/index";
import { router as authRouter } from "./auth/login";


const router: Router = express.Router();

router.use('/products', productRouter)
router.use('/auth', authRouter)


export {router}