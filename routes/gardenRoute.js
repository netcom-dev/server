import express from "express";
import {createGarden, getGardens, getGarden, putGarden, deleteGarden} from '../controllers/gardenController.js';

'use strict';

const router =express.Router();

router.delete('/delete/:_id', deleteGarden);
router.post('/new', createGarden);
router.get('/get/:_id', getGarden);
router.put('/edit/:_id', putGarden);
router.get('/', getGardens);

export default router;