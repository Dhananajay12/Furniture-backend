import { connections } from "./connection";
import express = require('express');
import { Express,} from "express";;
import { router } from "./src/routes";
import dotenv from 'dotenv';
import http from 'http'

// authencatorMiddleware

dotenv.config()

const app: Express = express();
const server = http.createServer(app)

app.use(express.json())
app.use('/api/v3', router)

app.get('/' , (req, res) =>{
 res.json({success:true , status:'success'})
//  res.send("heyyy")
})

connections();

server.listen(4000, async  () => {
	console.log('listing on port 4000');
})