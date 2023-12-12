import express from "express"
import { init } from "../controllers/userController.js";

const router = express.Router();

router.get('/', init);

export default router;