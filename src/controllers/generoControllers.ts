import { Request, Response } from "express";
import { prisma } from "../prisma";

export const cadastrarGenero = async (req: Request, res: Response) => {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ erro: "Nome é obrigatório." });

    const novo = await prisma.genero.create({ data: { nome } });
    return res.status(201).json(novo);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao cadastrar gênero." });
  }
};

export const listarGeneros = async (req: Request, res: Response) => {
  const dados = await prisma.genero.findMany();
  return res.json(dados);
};