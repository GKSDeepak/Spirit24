import express from "express";
import { profileController } from "../controllers/profileController.js";

const profileRoute = express.Router();

profileRoute.get("/profile", profileController.profile);

export default profileRoute;
