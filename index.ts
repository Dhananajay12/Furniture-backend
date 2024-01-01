import { connections } from "./connection";
import express = require('express');
import { Express, Request, Response } from "express";
import { Furniture } from "./src/model/index";

const app: Express = express();

connections();


app.listen(4000, async  () => {
	console.log(await Furniture.read.find())
	console.log('listing on port 4000');
})