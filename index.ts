import { connections } from "./connection";
import express = require('express');
import { Express,} from "express";;
import { router } from "./src/routes";
import dotenv from 'dotenv';
import { authencatorMiddleware } from "./src/middleware/Authenticator";
import { User } from "./src/model";
// authencatorMiddleware


dotenv.config()

const app: Express = express();


app.use(express.json())
app.use('/api/v3', router)


connections();

app.listen(4000, async  () => {

	console.log('listing on port 4000');
})