import express from "express";

import { verifyOtp , signup} from "../controllers/signUpController.js";

const router = express.Router();

router.post("/", signup);
router.post("/verifyOtp",verifyOtp);

export default router;
