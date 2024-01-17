import express = require('express');
import { Router, } from "express";
import { router as productRouter } from "./products/index";
import { router as categoryRouter } from "./category/index";
import { router as authRouter } from "./auth/login";
import { router as couponRouter } from "./coupon/index";
import { router as addressRouter } from "./address/index";
import { router as orderRouter } from "./orders";
import { router as productVariantRouter } from "./productVariant";

import { authencatorMiddleware } from '../middleware/Authenticator';

const router: Router = express.Router();

router.use('/category', categoryRouter)
router.use('/products', productRouter)
router.use('/productVariant', productVariantRouter)
router.use('/coupon', couponRouter)
router.use('/auth', authRouter)
router.use('/address', authencatorMiddleware, addressRouter)
router.use('/orders', authencatorMiddleware, orderRouter)


export {router}