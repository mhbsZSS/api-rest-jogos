import 'dotenv/config';
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// 1. Cadastrar Gêneros
app.post('/generos', async (req: Request, res: Response) => {
    const { nome } = req.body;
    const genero = await prisma.genero.create({
        data: { nome }
    });
    res.status(201).json(genero);
});

// 2. Cadastrar Plataformas
app.post('/plataformas', async (req: Request, res: Response) => {
    const { nome } = req.body;
    const plataforma = await prisma.plataforma.create({
        data: { nome }
    });
    res.status(201).json(plataforma);
});

// 3. Cadastrar Jogos 
app.post('/jogos', async (req: Request, res: Response) => {
    const { titulo, idGenero, idsPlataformas } = req.body;

    const plataformasConectar = idsPlataformas?.map((id: number) => ({ id })) || [];

    const jogo = await prisma.jogo.create({
        data: {
            titulo,
            idGenero,
            plataformas: {
                connect: plataformasConectar
            }
        },
        include: { 
            genero: true,
            plataformas: true
        }
    });

    res.status(201).json(jogo);
});

// 4. Relacionar jogo existente com plataformas adicionais
app.post('/jogos/:id/plataformas', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { idPlataforma } = req.body;

    const jogoAtualizado = await prisma.jogo.update({
        where: { id: Number(id) },
        data: {
            plataformas: {
                connect: { id: Number(idPlataforma) }
            }
        },
        include: {
            plataformas: true
        }
    });

    res.json(jogoAtualizado);
});

// 5. Listar os dados cadastrados
app.get('/jogos', async (req: Request, res: Response) => {
    const jogos = await prisma.jogo.findMany({
        include: {
            genero: true,
            plataformas: true
        }
    });
    res.json(jogos);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});