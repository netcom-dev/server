import {rules, poolModel} from '../models/poolModel.js';
import {HTTP_200_OK, HTTP_201_CREATE, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT, HTTP_500_SERVER_ERROR} from '../utils/constants.js'
import {checkUserInput} from '../utils/validate.js';

'use strict';

export const createPool =async (req, res) =>{
    const {body} =req;  
    const {isValid, errors, valid} =checkUserInput(body, rules);
    if(isValid){ 
        try{
            const pool =new poolModel(body);
            if(poolModel.find({name: body.name})) return res.status(HTTP_409_CONFLICT).json({saved:false, valid});
            await pool.save();
            return res.status(HTTP_201_CREATE).json({saved:true, valid})
        }catch({pool}){  return res.status(HTTP_500_SERVER_ERROR).json({saved:false, pool}); }
    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const getPools =async (req, res) =>{
    try{
        const pools =await poolModel.find();
        return res.status(HTTP_200_OK).json(pools); 
    }catch ({pool}){ return res.status(HTTP_500_SERVER_ERROR).json({pool}); }
};

export const getPool =async (req, res) =>{
    const {_id} =req.params;
    try{
        const pool =await poolModel.findById(_id);
        if(pool) return res.status(HTTP_200_OK).json(pool);
        return res.status(HTTP_404_NOT_FOUND).json({});
    }catch({pool}){ return res.status(HTTP_500_SERVER_ERROR).json({pool}); }
};

export const putPool =async (req, res) =>{
    const {_id} =req.params;
    const {body} =req;  
    const {isValid, errors, valid} =checkUserInput(body, rules);
    if(isValid){
        try{
            let pool =await poolModel.findById(_id);
            if(pool) {
                await poolModel.updateOne({_id}, valid)
                return res.status(HTTP_200_OK).json(valid);
            }
            return res.status(HTTP_404_NOT_FOUND).json({});
        }catch({pool}){ return res.status(HTTP_500_SERVER_ERROR).json({pool}); }

    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const deletePool =async (req, res) =>{
    const {_id} =req.params;
    try{
        const pool =await poolModel.findById(_id);
        if(pool) {
            await poolModel.deleteOne({_id});
            return res.status(HTTP_204_NO_CONTENT).json({});
        }
        return res.status(HTTP_404_NOT_FOUND).json({})
    }catch({pool}){ return res.status(HTTP_500_SERVER_ERROR).json({pool}); }
}; 