import express from "express";
import {createPool, getPools, getPool, putPool, deletePool} from '../controllers/poolController.js';

'use strict';

const router =express.Router();

router.delete('/delete/:_id', deletePool);
router.post('/new', createPool);
router.get('/get/:_id', getPool);
router.put('/edit/:_id', putPool);
router.get('/', getPools);

export default router;