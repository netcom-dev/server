import mongoose from "mongoose";

'use strict';

export const rules ={
    token: String, 
}
const tokenSchema =mongoose.Schema(rules);

export const tokenModel =mongoose.model('token', tokenSchema); 