import {rules, gardenModel} from '../models/gardenModel.js';
import {HTTP_200_OK, HTTP_201_CREATE, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT, HTTP_500_SERVER_ERROR} from '../utils/constants.js'
import {checkUserInput} from '../utils/validate.js';

'use strict';

export const createGarden =async (req, res) =>{
    const {body} =req;  
    const {isValid, errors, valid} =checkUserInput(body, rules);
    if(isValid){ 
        try{
            const garden =new gardenModel(body);
            if(gardenModel.find({name: body.name})) return res.status(HTTP_409_CONFLICT).json({saved:false, valid});
            await garden.save();
            return res.status(HTTP_201_CREATE).json({saved:true, valid})
        }catch({message}){  return res.status(HTTP_500_SERVER_ERROR).json({saved:false, message}); }
    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const getGardens =async (req, res) =>{
    try{
        const gardens =await gardenModel.find();
        return res.status(HTTP_200_OK).json(gardens); 
    }catch ({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
};

export const getGarden =async (req, res) =>{
    const {_id} =req.params;
    try{
        const garden =await gardenModel.findById(_id);
        if(garden) return res.status(HTTP_200_OK).json(garden);
        return res.status(HTTP_404_NOT_FOUND).json({});
    }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
};

export const putGarden =async (req, res) =>{
    const {_id} =req.params;
    const {body} =req;  
    const {isValid, errors, valid} =checkUserInput(body, rules);
    if(isValid){
        try{
            let garden =await gardenModel.findById(_id);
            if(garden) {
                await gardenModel.updateOne({_id}, valid)
                return res.status(HTTP_200_OK).json(valid);
            }
            return res.status(HTTP_404_NOT_FOUND).json({});
        }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }

    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const deleteGarden =async (req, res) =>{
    const {_id} =req.params;
    try{
        const garden =await gardenModel.findById(_id);
        if(garden) {
            await gardenModel.deleteOne({_id});
            return res.status(HTTP_204_NO_CONTENT).json({});
        }
        return res.status(HTTP_404_NOT_FOUND).json({})
    }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
}; 