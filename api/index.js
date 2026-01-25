import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(
    process.env.PRISMA_DATABASE_URL
        ? { accelerateUrl: process.env.PRISMA_DATABASE_URL }
        : {}
);
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// --- ROUTES NEWS ---

app.get("/api/news", async (req, res) => {
    try {
        const news = await prisma.news.findMany({
            orderBy: { date: "desc" },
        });
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/news", async (req, res) => {
    try {
        const { title, excerpt, content, date, author, category, image, readTime } = req.body;
        const item = await prisma.news.create({
            data: {
                title,
                excerpt,
                content,
                date: new Date(date),
                author,
                category,
                image,
                readTime,
            },
        });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/api/news/:id", async (req, res) => {
    try {
        const item = await prisma.news.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/api/news/:id", async (req, res) => {
    try {
        await prisma.news.delete({ where: { id: req.params.id } });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- ROUTES ACHIEVEMENTS ---

app.get("/api/achievements", async (req, res) => {
    try {
        const items = await prisma.achievement.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/achievements", async (req, res) => {
    try {
        const item = await prisma.achievement.create({ data: req.body });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/api/achievements/:id", async (req, res) => {
    try {
        const item = await prisma.achievement.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/api/achievements/:id", async (req, res) => {
    try {
        await prisma.achievement.delete({ where: { id: req.params.id } });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- ROUTES CONTACT ---

app.post("/api/contact", async (req, res) => {
    try {
        const item = await prisma.contact.create({ data: req.body });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default app;
