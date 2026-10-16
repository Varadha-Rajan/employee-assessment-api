import express from "express";
import controller from "../controller/assessment.controller.js";

const router = express.Router();

router.post("/", controller.create);
router.post("/list", controller.findAll);
router.get("/:id", controller.findById);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;