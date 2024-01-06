import { connections } from "./connection";
import express = require('express');
import { Express,} from "express";;
import { router } from "./src/routes";
import * as dotenv from 'dotenv';

const app: Express = express();

dotenv.config()

app.use(express.json())
app.use('/api/v3', router)


connections();


app.listen(4000, async  () => {

	console.log('listing on port 4000');
})