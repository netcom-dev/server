import express from "express";
import {createBuilding, getBuildings, getBuilding, putBuilding, deleteBuilding} from '../controllers/buildingController.js';
import authToken from "../middleware/authTokenMiddleware.js";
'use strict';

const router =express.Router();

router.delete('/delete/:_id', authToken, deleteBuilding);
router.post('/new', createBuilding);
router.get('/get/:_id', getBuilding);
router.put('/edit/:_id', putBuilding);
router.get('/', getBuildings);

export default router;