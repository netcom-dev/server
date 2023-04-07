import mongoose from "mongoose";

'use strict';

export const rules ={
    name: String,
    community: String,
    size: Number,
    cost: Number
}

const gardenSchema =mongoose.Schema(rules);

export const gardenModel =mongoose.model('garden', gardenSchema); 