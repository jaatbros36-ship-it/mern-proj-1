import express from "express";
import { setGoal, getGoals, updateGoal, deleteGoal } from "../controllers/goalController.js";
import { authUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create new goal
router.post('/creategoal', authUser, setGoal);

// Get all goals for a user
router.get('/getgoals', authUser, getGoals);

// Update user goal
router.patch('/updategoal/:id', authUser, updateGoal);

// Delete user goal
router.delete('/deletegoal/:id', authUser, deleteGoal);

export default router;