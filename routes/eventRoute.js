import express from "express";
import {createEvent, getEvents, getEvent, putEvent, deleteEvent} from '../controllers/eventController.js';

'use strict';

const router =express.Router();

router.delete('/delete/:_id', deleteEvent);
router.post('/new', createEvent);
router.get('/get/:_id', getEvent);
router.put('/edit/:_id', putEvent);
router.get('/', getEvents);

export default router;