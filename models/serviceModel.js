import mongoose from "mongoose";

'use strict';

export const rules ={
    service: String,
    cost: Number,
    tax: Number,
    month: String
}

const serviceSchema =mongoose.Schema(rules);

export const serviceModel =mongoose.model('service', serviceSchema);