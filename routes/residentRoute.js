import express from "express";
import {createResident, getResidents, getResident, putResident, deleteResident} from '../controllers/residentController.js';

'use strict';

const router =express.Router();

router.delete('/delete/:_id', deleteResident);
router.post('/new', createResident);
router.get('/get/:_id', getResident);
router.put('/edit/:_id', putResident);
router.get('/', getResidents);

export default router;