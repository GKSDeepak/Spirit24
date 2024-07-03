import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

// creating a user
router.post("/users", createUser);

// fetching all the users
router.get("/users", getAllUsers);

// fetching user by id from the body.params
router.get("/users/:id", getUserById);

export default router;
