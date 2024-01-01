import express = require('express');
import { Router, } from "express";
import { router as furnitureRouter } from "./furniturecurd/index";

const router: Router = express.Router();

router.use('/furniture', furnitureRouter)


export {router}