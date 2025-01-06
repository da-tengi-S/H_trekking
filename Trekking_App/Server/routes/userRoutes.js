// routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/usercontroller.js';


const router = express.Router();

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;