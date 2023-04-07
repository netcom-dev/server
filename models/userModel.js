import mongoose from "mongoose";

'use strict';

export const rules ={
    name: String,
    email: String,
    phone: String,
    role: String,
    password: String,
}

const userSchema =mongoose.Schema(rules);

export const userModel =mongoose.model('user', userSchema); 