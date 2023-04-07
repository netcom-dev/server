import {rules, buildingModel} from '../models/buildingModel.js';
import {HTTP_200_OK, HTTP_201_CREATE, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT, HTTP_500_SERVER_ERROR} from '../utils/constants.js'
import {checkUserInput} from '../utils/validate.js';

'use strict';

export const createBuilding =async (req, res) =>{
    const {body} =req;  
    const {isValid, errors, valid} =checkUserInput(body, rules);
    if(isValid){ 
        try{
            const building =new buildingModel(body);
            if(buildingModel.find({name: body.name})) return res.status(HTTP_409_CONFLICT).json({saved:false, valid});
            await building.save();
            return res.status(HTTP_201_CREATE).json({saved:true, valid})
        }catch({message}){  return res.status(HTTP_500_SERVER_ERROR).json({saved:false, message}); }
    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const getBuildings =async (req, res) =>{
    try{
        const buildings =await buildingModel.find();
        return res.status(HTTP_200_OK).json(buildings); 
    }catch ({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
};

export const getBuilding =async (req, res) =>{
    const {_id} =req.params;
    try{
        const building =await buildingModel.findById(_id);
        if(building) return res.status(HTTP_200_OK).json(building);
        return res.status(HTTP_404_NOT_FOUND).json({});
    }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
};

export const putBuilding =async (req, res) =>{
    const {_id} =req.params;
    const {body} =req;  
    const {isValid, errors, valid} =checkUserInput(body, rules);
    if(isValid){
        try{
            let building =await buildingModel.findById(_id);
            if(building) {
                await buildingModel.updateOne({_id}, valid)
                return res.status(HTTP_200_OK).json(valid);
            }
            return res.status(HTTP_404_NOT_FOUND).json({});
        }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }

    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const deleteBuilding =async (req, res) =>{
    const {_id} =req.params;
    try{
        const building =await buildingModel.findById(_id);
        if(building) {
            await buildingModel.deleteOne({_id});
            return res.status(HTTP_204_NO_CONTENT).json({});
        }
        return res.status(HTTP_404_NOT_FOUND).json({})
    }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
}; 