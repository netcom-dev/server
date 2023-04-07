import { generateToken, logout} from "../controllers/authController.js";
import express from 'express';
import authToken from "../middleware/authTokenMiddleware.js";

const router =express.Router();

router.post('/generate_token', generateToken); 
router.delete('/logout', authToken, logout)

export default router;