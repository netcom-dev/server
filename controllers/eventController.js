import {rules, eventModel} from '../models/eventModel.js';  
import {HTTP_200_OK, HTTP_201_CREATE, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT, HTTP_500_SERVER_ERROR} from '../utils/constants.js'
 

'use strict';

export const createEvent =async (req, res) =>{
    const {body} =req;    
    try{
        console.log(body);
        const event =new eventModel(body);
        if(await eventModel.findOne({event_name: body.event_name})) return res.status(HTTP_409_CONFLICT).json({message: `${body.event_name} already added`});
        const new_event =await event.save(); 
        return res.status(HTTP_201_CREATE).json({new_event});
    }catch({message}){  return res.status(HTTP_500_SERVER_ERROR).json({message}); } 
};

export const getEvents =async (req, res) =>{
    try{
        const events =await eventModel.find();
        return res.status(HTTP_200_OK).json({events}); 
    }catch ({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
};

export const getEvent =async (req, res) =>{
    const {_id} =req.params;
    try{
        const event =await eventModel.findById(_id);
        if(event) return res.status(HTTP_200_OK).json(event);
        return res.status(HTTP_404_NOT_FOUND).json({});
    }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
};

export const putEvent =async (req, res) =>{
    const {_id} =req.params;
    const {body} =req;  
    const {isValid, errors, valid} =checkUserInput(body, rules);
    if(isValid){
        try{
            let event =await eventModel.findById(_id);
            if(event) {
                await eventModel.updateOne({_id}, valid)
                return res.status(HTTP_200_OK).json(valid);
            }
            return res.status(HTTP_404_NOT_FOUND).json({});
        }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }

    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const deleteEvent =async (req, res) =>{
    const {_id} =req.params;
    try{
        const event =await eventModel.findById(_id);
        if(event) {
            await eventModel.deleteOne({_id});
            return res.status(HTTP_204_NO_CONTENT).json({});
        }
        return res.status(HTTP_404_NOT_FOUND).json({})
    }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
}; 