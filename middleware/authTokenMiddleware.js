import { HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDEN } from "../utils/constants.js";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const authToken =(req, res, next) =>{ 
    const headers =req.headers['authorization']; 
    const token =headers && headers.split(' ')[1] 
    console.log(token);
    if(!token) return res.status(HTTP_401_UNAUTHORIZED).json({message: "Login Required*"});
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) return res.status(HTTP_403_FORBIDEN).json({message: err.message}); 
        req.user =user;
        next();
    });
};

export default authToken;