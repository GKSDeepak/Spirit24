import express from "express";
const router = express.Router();
import { scoreboardController } from "../controllers/scoreboardController";
// const scoreboardController = require("../controllers/scoreboardController");

// Route to get the sorted scoreboard
router.get("/scoreboard", scoreboardController.getScoreboard);

module.exports = router;
