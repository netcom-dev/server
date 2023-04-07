import mongoose from "mongoose";

'use strict';

export const rules ={
    make: String,
    model: String,
    year: Number,
    cost: Number
}
const carSchema =mongoose.Schema(rules);

export const carModel =mongoose.model('car', carSchema); 