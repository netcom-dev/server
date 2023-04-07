import {rules, visitorModel} from '../models/visitorModel.js';
import {HTTP_200_OK, HTTP_201_CREATE, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT, HTTP_500_SERVER_ERROR} from '../utils/constants.js'
import {checkUserInput} from '../utils/validate.js';

'use strict';

export const createVisitor =async (req, res) =>{
    const {body} =req;  
    const {isValid, errors, valid} =checkUserInput(body, rules);
    if(isValid){ 
        try{
            const visitor =new visitorModel(body);
            if(visitorModel.find({name: body.name})) return res.status(HTTP_409_CONFLICT).json({saved:false, valid});
            await visitor.save();
            return res.status(HTTP_201_CREATE).json({saved:true, valid})
        }catch({message}){  return res.status(HTTP_500_SERVER_ERROR).json({saved:false, message}); }
    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const getVisitors =async (req, res) =>{
    try{
        const visitors =await visitorModel.find();
        return res.status(HTTP_200_OK).json(visitors); 
    }catch ({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
};

export const getVisitor =async (req, res) =>{
    const {_id} =req.params;
    try{
        const visitor =await visitorModel.findById(_id);
        if(visitor) return res.status(HTTP_200_OK).json(visitor);
        return res.status(HTTP_404_NOT_FOUND).json({});
    }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
};

export const putVisitor =async (req, res) =>{
    const {_id} =req.params;
    const {body} =req;  
    const {isValid, errors, valid} =checkvisitorInput(body, rules);
    if(isValid){
        try{
            let visitor =await visitorModel.findById(_id);
            if(visitor) {
                await visitorModel.updateOne({_id}, valid)
                return res.status(HTTP_200_OK).json(valid);
            }
            return res.status(HTTP_404_NOT_FOUND).json({});
        }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }

    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const deleteVisitor =async (req, res) =>{
    const {_id} =req.params;
    try{
        const visitor =await visitorModel.findById(_id);
        if(visitor) {
            await visitorModel.deleteOne({_id});
            return res.status(HTTP_204_NO_CONTENT).json({});
        }
        return res.status(HTTP_404_NOT_FOUND).json({})
    }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
}; 