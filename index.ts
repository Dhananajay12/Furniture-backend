import { connections } from "./connection";
import express = require('express');
import { Express,} from "express";
import { Furniture } from "./src/model/index";
import { router } from "./src/routes";

const app: Express = express();

app.use(express.json())
app.use('/api/v3', router)


connections();


app.listen(4000, async  () => {

	console.log('listing on port 4000');
})