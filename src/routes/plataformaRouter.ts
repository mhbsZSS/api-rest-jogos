import { Router } from "express";
import { cadastrarPlataforma, listarPlataformas } from "../controllers/plataformaController";

const router = Router();
router.post("/", cadastrarPlataforma);
router.get("/", listarPlataformas);

export default router;