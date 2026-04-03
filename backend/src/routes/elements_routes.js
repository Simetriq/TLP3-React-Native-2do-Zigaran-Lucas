import express from "express";
import {
  getElements,
  getElementById,
  createElement,
  updateElement,
  deleteElement,
} from "../controllers/elements_controller.js";

const router = express.Router();

// Rutas para elementos
router.get("/", getElements); // GET /elements
router.get("/:id", getElementById); // GET /elements/:id
router.post("/", createElement); // POST /elements
router.put("/:id", updateElement); // PUT /elements/:id
router.delete("/:id", deleteElement); // DELETE /elements/:id

export default router;
