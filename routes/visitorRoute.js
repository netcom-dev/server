import express from "express";
import {createVisitor, getVisitors, getVisitor, putVisitor, deleteVisitor} from '../controllers/visitorController.js';

'use strict';

const router =express.Router();

router.delete('/delete/:_id', deleteVisitor);
router.post('/new', createVisitor);
router.get('/get/:_id', getVisitor);
router.put('/edit/:_id', putVisitor);
router.get('/', getVisitors);

export default router;