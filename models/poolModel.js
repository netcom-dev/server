import mongoose from "mongoose";

'use strict';

export const rules ={
    service: String,
    cost: Number,
    tax: Number,
    month: String
}
const poolSchema =mongoose.Schema(rules);

export const poolModel =mongoose.model('pool', poolSchema); 