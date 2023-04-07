import express from "express";
import {createMessage, getMessages, getMessage, putMessage, deleteMessage} from '../controllers/MessageController.js';

'use strict';

const router =express.Router();

router.delete('/delete/:_id', deleteMessage);
router.post('/new', createMessage);
router.get('/get/:_id', getMessage);
router.put('/edit/:_id', putMessage);
router.get('/', getMessages);

export default router;