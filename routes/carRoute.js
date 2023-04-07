import express from "express";
import {createCar, getCars, getCar, putCar, deleteCar} from '../controllers/CarController.js';

'use strict';

const router =express.Router();

router.delete('/delete/:_id', deleteCar);
router.post('/new', createCar);
router.get('/get/:_id', getCar);
router.put('/edit/:_id', putCar);
router.get('/', getCars);

export default router;