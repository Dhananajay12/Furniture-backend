import { connections } from "./connection";
import express = require('express');
import { Express, Request, Response } from "express";

const app: Express = express();

connections();


app.listen(4000, () => {
	console.log('listing on port 4000');
})