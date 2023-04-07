import {rules, userModel} from '../models/userModel.js';
import {HTTP_200_OK, HTTP_201_CREATE, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT, HTTP_500_SERVER_ERROR} from '../utils/constants.js'
import {checkUserInput} from '../utils/validate.js';

'use strict';

export const createUser =async (req, res) =>{
    const {body} =req;   
    try{
        const user =new userModel(body); 
        if(await userModel.findOne({email: body.email})) return res.status(HTTP_409_CONFLICT).json({message: 'User already exists'});
        const new_user =await user.save(); 
        return res.status(HTTP_201_CREATE).json({new_user})
    }catch({message}){   
        return res.status(HTTP_500_SERVER_ERROR).json({message}); 
    }
     
};

export const getUsers =async (req, res) =>{
    try{
        const users =await userModel.find();
        return res.status(HTTP_200_OK).json(users); 
    }catch ({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
};

export const getUser =async (req, res) =>{
    const {_id} =req.params;
    try{
        const user =await userModel.findById(_id);
        if(user) return res.status(HTTP_200_OK).json(user);
        return res.status(HTTP_404_NOT_FOUND).json({});
    }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
};

export const putUser =async (req, res) =>{
    const {_id} =req.params;
    const {body} =req;  
    const {isValid, errors, valid} =checkUserInput(body, rules);
    if(isValid){
        try{
            let user =await userModel.findById(_id);
            if(user) {
                await userModel.updateOne({_id}, valid)
                return res.status(HTTP_200_OK).json(valid);
            }
            return res.status(HTTP_404_NOT_FOUND).json({});
        }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }

    }
    return res.status(HTTP_400_BAD_REQUEST).json({saved:false, errors, valid});
};

export const deleteUser =async (req, res) =>{
    const {_id} =req.params;
    try{
        const user =await userModel.findById(_id);
        if(user) {
            await userModel.deleteOne({_id});
            return res.status(HTTP_204_NO_CONTENT).json({});
        }
        return res.status(HTTP_404_NOT_FOUND).json({})
    }catch({message}){ return res.status(HTTP_500_SERVER_ERROR).json({message}); }
}; 