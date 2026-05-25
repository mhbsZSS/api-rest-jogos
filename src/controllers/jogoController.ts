import { Request, Response } from "express";
import { prisma } from "../prisma";

export const cadastrarJogo = async (req: Request, res: Response) => {
  try {
    const { titulo, idGenero } = req.body;
    if (!titulo || !idGenero) return res.status(400).json({ erro: "Título e idGenero são obrigatórios." });

    const novo = await prisma.jogo.create({
      data: { titulo, idGenero: Number(idGenero) }
    });
    return res.status(201).json(novo);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao cadastrar jogo." });
  }
};

export const listarTudo = async (req: Request, res: Response) => {
  try {
    const jogos = await prisma.jogo.findMany({
      include: {
        genero: true,
        plataformas: { include: { plataforma: true } }
      }
    });

    const formatado = jogos.map((j: any) => ({
      id: j.id,
      titulo: j.titulo,
      genero: j.genero?.nome || "Sem Gênero",
      plataformas: j.plataformas.map((p: any) => p.plataforma.nome)
    }));

    return res.json(formatado);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao listar dados." });
  }
};