import express from 'express';
import mongoose from "mongoose";
import cors from "cors";   
import * as dotenv from 'dotenv'; 

import { buildingRoute, carRoute, gardenRoute, messageRoute, poolRoute, residentRoute, serviceRoute, userRoute, visitorRoute, authRoute, eventRoute } from './routes/index.js';
import authToken from './middleware/authTokenMiddleware.js';

'use strict';
 
dotenv.config();
const app = express(); // init app

//  configure app
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); 

// add routes
app.use("/buildings", buildingRoute);
app.use("/cars", carRoute);
app.use("/gardens", gardenRoute);
app.use("/messages", authToken, messageRoute);
app.use("/pools", poolRoute); 
app.use("/residents", residentRoute); 
app.use("/services", serviceRoute); 
app.use("/users", /*authToken,*/ userRoute); 
app.use("/visitors", visitorRoute); 
app.use("/events", eventRoute);
app.use("/auth", authRoute);

// configure server port and database url
const DB_URL =process.env.DB_URL;  
const PORT =process.env.SERVER_PORT || 5000;

 
// connect database and start server
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`[*] Server Running on Port ${PORT}`))
  )
  .catch((error) => console.log(error.message));