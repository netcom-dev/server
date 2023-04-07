import {rules, messageModel} from '../models/messageModel.js';
import {HTTP_200_OK, HTTP_201_CREATE, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT, HTTP_500_SERVER_ERROR} from '../utils/constants.js'
import {checkUserInput} from '../utils/validate.js';

'use strict';

export const createMessage =async (req, res) =>{
    const {body} =req;  
    const {isValid, errors, valid} =checkUserInput(body, rules);
    if(isValid){ 
        try{
            const message =new messageModel(body);
            if(messageModel.find({name: body.name})) return res.status(HTTP_409_CONFLICT).json({saved:false, valid});
            await message.save();
            return res.status(HTTP_201_CREATE).json({saved:true, valid})
        }catch(e){  return res.status(HTTP_500_SERVER_ERROR).json({saved:false, message:e.message}); }
    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const getMessages =async (req, res) =>{
    try{
        const messages =await messageModel.find();
        return res.status(HTTP_200_OK).json(messages); 
    }catch (e){ return res.status(HTTP_500_SERVER_ERROR).json({message:e.messag}); }
};

export const getMessage =async (req, res) =>{
    const {_id} =req.params;
    try{
        const message =await messageModel.findById(_id);
        if(message) return res.status(HTTP_200_OK).json(message);
        return res.status(HTTP_404_NOT_FOUND).json({});
    }catch(e){ return res.status(HTTP_500_SERVER_ERROR).json({message:e.messag}); }
};

export const putMessage =async (req, res) =>{
    const {_id} =req.params;
    const {body} =req;  
    const {isValid, errors, valid} =checkUserInput(body, rules);
    if(isValid){
        try{
            let message =await messageModel.findById(_id);
            if(message) {
                await messageModel.updateOne({_id}, valid)
                return res.status(HTTP_200_OK).json(valid);
            }
            return res.status(HTTP_404_NOT_FOUND).json({});
        }catch(e){ return res.status(HTTP_500_SERVER_ERROR).json({message:e.messag}); }

    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const deleteMessage =async (req, res) =>{
    const {_id} =req.params;
    try{
        const message =await messageModel.findById(_id);
        if(message) {
            await messageModel.deleteOne({_id});
            return res.status(HTTP_204_NO_CONTENT).json({});
        }
        return res.status(HTTP_404_NOT_FOUND).json({})
    }catch(e){ return res.status(HTTP_500_SERVER_ERROR).json({message:e.messag}); }
}; 