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

// --- ROUTE PAIEMENT ADHÉSION (Flutterwave Standard ou équivalent) ---

app.post("/api/membership-payment", async (req, res) => {
    try {
        const { name, email, phone } = req.body || {};

        if (!name || !email || !phone) {
            return res.status(400).json({ error: "Nom, email et téléphone sont obligatoires." });
        }

        const secretKey = process.env.FLW_SECRET_KEY;
        const redirectUrl = process.env.MEMBERSHIP_RETURN_URL;

        if (!secretKey) {
            return res.status(500).json({ error: "Clé secrète de paiement non configurée (FLW_SECRET_KEY)." });
        }

        const txRef = `tusaidiyane-membership-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

        const payload = {
            tx_ref: txRef,
            amount: 1,
            currency: "USD",
            redirect_url: redirectUrl,
            customer: {
                email,
                phonenumber: phone,
                name,
            },
            customizations: {
                title: "Adhésion Fondation TUSAIDIYANE",
                description: "Frais symbolique d'adhésion (1 $)",
            },
        };

        const fwRes = await fetch("https://api.flutterwave.com/v3/payments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${secretKey}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await fwRes.json();

        if (!fwRes.ok || data.status !== "success" || !data.data?.link) {
            return res.status(500).json({
                error: "Impossible de créer le paiement.",
                details: data,
            });
        }

        return res.json({ link: data.data.link });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default app;
