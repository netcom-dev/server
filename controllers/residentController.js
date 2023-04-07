import {rules, residentModel} from '../models/residentModel.js';
import {HTTP_200_OK, HTTP_201_CREATE, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT, HTTP_500_SERVER_ERROR} from '../utils/constants.js'
import {checkUserInput} from '../utils/validate.js';

'use strict';

export const createResident =async (req, res) =>{
    const {body} =req;  
    const {isValid, errors, valid} =checkUserInput(body, rules);
    if(isValid){ 
        try{
            const resident =new residentModel(body);
            if(residentModel.find({name: body.name})) return res.status(HTTP_409_CONFLICT).json({saved:false, valid});
            await resident.save();
            return res.status(HTTP_201_CREATE).json({saved:true, valid})
        }catch({message}){  return res.status(HTTP_500_SERVER_ERROR).json({saved:false, message}); }
    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const getResidents =async (req, res) =>{
    try{
        const residents =await residentModel.find();
        return res.status(HTTP_200_OK).json(residents); 
    }catch ({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
};

export const getResident =async (req, res) =>{
    const {_id} =req.params;
    try{
        const resident =await residentModel.findById(_id);
        if(resident) return res.status(HTTP_200_OK).json(resident);
        return res.status(HTTP_404_NOT_FOUND).json({});
    }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
};

export const putResident =async (req, res) =>{
    const {_id} =req.params;
    const {body} =req;  
    const {isValid, errors, valid} =checkUserInput(body, rules);
    if(isValid){
        try{
            let resident =await residentModel.findById(_id);
            if(resident) {
                await residentModel.updateOne({_id}, valid)
                return res.status(HTTP_200_OK).json(valid);
            }
            return res.status(HTTP_404_NOT_FOUND).json({});
        }catch({resident}){ return res.status(HTTP_500_SERVER_ERROR).json({resident}); }

    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const deleteResident =async (req, res) =>{
    const {_id} =req.params;
    try{
        const resident =await residentModel.findById(_id);
        if(resident) {
            await residentModel.deleteOne({_id});
            return res.status(HTTP_204_NO_CONTENT).json({});
        }
        return res.status(HTTP_404_NOT_FOUND).json({})
    }catch({resident}){ return res.status(HTTP_500_SERVER_ERROR).json({resident}); }
}; 