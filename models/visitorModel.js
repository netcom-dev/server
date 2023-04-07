import mongoose from 'mongoose';

'use strict';

export const rules ={
    name: String,
    apt: String,
    number: String,
    approval: String
};

const vistorSchema =mongoose.Schema(rules);
 
export const visitorModel =mongoose.model('visitor', vistorSchema); 