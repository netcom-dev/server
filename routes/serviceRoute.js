import express from "express";
import {createService, getServices, getService, putService, deleteService} from '../controllers/ServiceController.js';

'use strict';

const router =express.Router();

router.delete('/delete/:_id', deleteService);
router.post('/new', createService);
router.get('/get/:_id', getService);
router.put('/edit/:_id', putService);
router.get('/', getServices);

export default router;