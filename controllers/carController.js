import {rules, carModel} from '../models/carModel.js';
import {HTTP_200_OK, HTTP_201_CREATE, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT, HTTP_500_SERVER_ERROR} from '../utils/constants.js'
import {checkUserInput} from '../utils/validate.js';

'use strict';

export const createCar =async (req, res) =>{
    const {body} =req;  
    const {isValid, errors, valid} =checkUserInput(body, rules);
    if(isValid){ 
        try{
            const car =new carModel(body);
            if(carModel.find({name: body.name})) return res.status(HTTP_409_CONFLICT).json({saved:false, valid});
            await car.save();
            return res.status(HTTP_201_CREATE).json({saved:true, valid})
        }catch({message}){  return res.status(HTTP_500_SERVER_ERROR).json({saved:false, message}); }
    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const getCars =async (req, res) =>{
    try{
        const cars =await carModel.find();
        return res.status(HTTP_200_OK).json(cars); 
    }catch ({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
};

export const getCar =async (req, res) =>{
    const {_id} =req.params;
    try{
        const car =await carModel.findById(_id);
        if(car) return res.status(HTTP_200_OK).json(car);
        return res.status(HTTP_404_NOT_FOUND).json({});
    }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
};

export const putCar =async (req, res) =>{
    const {_id} =req.params;
    const {body} =req;  
    const {isValid, errors, valid} =checkUserInput(body, rules);
    if(isValid){
        try{
            let car =await carModel.findById(_id);
            if(car) {
                await carModel.updateOne({_id}, valid)
                return res.status(HTTP_200_OK).json(valid);
            }
            return res.status(HTTP_404_NOT_FOUND).json({});
        }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }

    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const deleteCar =async (req, res) =>{
    const {_id} =req.params;
    try{
        const car =await carModel.findById(_id);
        if(car) {
            await carModel.deleteOne({_id});
            return res.status(HTTP_204_NO_CONTENT).json({});
        }
        return res.status(HTTP_404_NOT_FOUND).json({})
    }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
}; 