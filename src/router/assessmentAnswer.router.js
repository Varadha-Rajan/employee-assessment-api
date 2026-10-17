import express from "express";
import controller from "../controller/assessmentAnswer.controller.js";

const router = express.Router();

router.post("/", controller.create);
router.post("/list", controller.findAll);
router.get("/:id", controller.findById);

export default router;
