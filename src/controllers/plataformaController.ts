import { Request, Response } from "express";
import { prisma } from "../prisma";

export const cadastrarPlataforma = async (req: Request, res: Response) => {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ erro: "Nome é obrigatório." });

    const nova = await prisma.plataforma.create({ data: { nome } });
    return res.status(201).json(nova);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao cadastrar plataforma." });
  }
};

export const listarPlataformas = async (req: Request, res: Response) => {
  const dados = await prisma.plataforma.findMany();
  return res.json(dados);
};