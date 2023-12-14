import express from "express";
import { singin, singup } from "../controllers/authController.js";

const router = express.Router();

router.post('/sing-up', singup)
router.post('/sing-in', singin)

export default router;