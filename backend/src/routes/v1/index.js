import express from "express";
import projectRouter from "./projects.js";
import { pingCheck } from "../../controllers/pingController.js";

const router = express.Router();

router.use('/ping', pingCheck);

router.use('/projects', projectRouter);

export default router;