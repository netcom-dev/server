import express from "express";
import {createUser, getUsers, getUser, putUser, deleteUser} from '../controllers/UserController.js';

'use strict';

const router =express.Router();

router.delete('/delete/:_id', deleteUser);
router.post('/new', createUser);
router.get('/get/:_id', getUser);
router.put('/edit/:_id', putUser);
router.get('/', getUsers);

export default router;