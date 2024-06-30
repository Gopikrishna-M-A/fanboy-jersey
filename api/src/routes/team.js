import express from 'express';
import { getTeam, getAllTeam, createTeam, updateTeam, removeTeam }  from '../controllers/team.js';
const router = express.Router();

router.get("/:teamId", getTeam)
router.get("/", getAllTeam)
router.post("/", createTeam)
router.patch("/:teamId", updateTeam)
router.delete("/:teamId", removeTeam)

export default router;
