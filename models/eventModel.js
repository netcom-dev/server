import mongoose from "mongoose";

'use strict';

export const rules ={
    event_name: String,
    event_date: Date,
    event_venue: String,
    event_description: String,
    advertised: {type: Boolean, default: false},
    attendiees: {type: Array, default: []}
}
const eventSchema =mongoose.Schema(rules);

export const eventModel =mongoose.model('event', eventSchema); 