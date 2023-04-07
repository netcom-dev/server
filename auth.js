import express from 'express';
import mongoose from "mongoose";
import cors from "cors";   
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { HTTP_200_OK, HTTP_401_UNAUTHORIZED } from './utils/constants.js';  

'use strict';
 
dotenv.config();
const app = express(); // init app

//  configure app
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); 
 
const user_posts =[
    {
      name: 'tester',
      post: "Test Post"
    },
    {
      name: 'tester1',
      post: "Test Post 1"
    },
    {
      name: 'tester2',
      post: "Test Post 2"
    },
    
] 

// configure server port and database url
const DB_URL =process.env.DB_URL;  
const PORT =4000;

app.post('/auth', (req, res) =>{
  const  {username} =req.body; 
  const user =user_posts.find(({name}) =>name ===username); 
  if(!user) return res.status(HTTP_401_UNAUTHORIZED).json({reason: 'Unknown user'})
  const accessToken =jwt.sign(user.name, process.env.ACCESS_TOKEN_SECRET);
  return res.status(HTTP_200_OK).json({accessToken})
});  

// connect database and start server
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`[*] Server Running on Port ${PORT}`))
  )
  .catch((error) => console.log(error.message));