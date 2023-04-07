import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { HTTP_200_OK,HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED, HTTP_500_SERVER_ERROR } from '../utils/constants.js'; 
import {userModel} from '../models/userModel.js';

dotenv.config();

export const generateToken =async (req, res) =>{
  try { 
    const {email, password} =req.body; 
    const user =await userModel.findOne({email,password}); 
    if(!user) return res.status(HTTP_401_UNAUTHORIZED).json({reason: 'User with password not found'}) 
    const accessToken =jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET);    
    return res.status(HTTP_200_OK).json({accessToken, user});
  } catch ({message}) { return res.status(HTTP_500_SERVER_ERROR).json({message})}
}   

export const logout =async (req, res) =>{
    // destroy the access token 
    console.log(req.headers['authorization']);
    return res.status(HTTP_204_NO_CONTENT).json({});
}
