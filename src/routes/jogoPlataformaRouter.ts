import { Router } from "express";
import { relacionarJogoPlataforma } from "../controllers/jogoPlataformaController";

const router = Router();
router.post("/", relacionarJogoPlataforma);

export default router;