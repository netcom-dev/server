import mongoose from 'mongoose';

'use strict';

export const rules ={
    name: String,
    phone: String,
    email: String,
    message: String
}

const messageSchema =mongoose.Schema(rules);

export const messageModel =mongoose.model('message', messageSchema); 