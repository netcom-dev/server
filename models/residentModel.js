import mongoose from 'mongoose';

'use strict';

export const rules ={
    name: String,
    apartment: String,
    community: String,
    services: String
}
const residentSchema =mongoose.Schema(rules);

export const residentModel =mongoose.model('resident', residentSchema); 