import mongoose from 'mongoose';

'use strict';

export const rules ={
    name: String,
    community: String,
    floors: Number,
    occupancy: Number,
}
const buildingSchema =mongoose.Schema(rules);

export const buildingModel =mongoose.model('building', buildingSchema); 