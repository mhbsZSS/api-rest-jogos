import { Router } from "express";
import { cadastrarJogo, listarTudo } from "../controllers/jogoController";

const router = Router();
router.post("/", cadastrarJogo);
router.get("/", listarTudo);

export default router;