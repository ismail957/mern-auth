import express from "express";
import { singup } from "../controllers/authController.js";

const router = express.Router();

router.post('/sing-up', singup)

export default router;