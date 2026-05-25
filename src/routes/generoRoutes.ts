import { Router } from "express";
import { cadastrarGenero, listarGeneros } from "../controllers/generoControllers";

const router = Router();
router.post("/", cadastrarGenero);
router.get("/", listarGeneros);

export default router;