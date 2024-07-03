import express from "express";

import {opinion } from "../controllers/opinionController.js";

const router = express.Router();

router.post("/", opinion);

export default router;