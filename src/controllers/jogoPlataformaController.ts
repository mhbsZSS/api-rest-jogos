import { Request, Response } from "express";
import { prisma } from "../prisma";

export const relacionarJogoPlataforma = async (req: Request, res: Response) => {
  try {
    const { idJogo, idPlataforma } = req.body;
    if (!idJogo || !idPlataforma) return res.status(400).json({ erro: "idJogo e idPlataforma são obrigatórios." });

    const vinculo = await prisma.jogoPlataforma.create({
      data: { idJogo: Number(idJogo), idPlataforma: Number(idPlataforma) }
    });
    return res.status(201).json(vinculo);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao relacionar jogo e plataforma." });
  }
};