import express from "express";
import { registerUser, loginUser, updateUser, deleteUser } from "../controllers/userController.js";
import { authUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Reister new user
router.post("/register", registerUser );

// Login existing user
router.post("/login", loginUser );

// Update user info
router.patch("/update", authUser, updateUser );

// Delete user
router.delete("/delete", authUser, deleteUser );

export default router;
