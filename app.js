import express from "express";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config();

app.get("/news", async (req, res) => {
    try {
        const apiKey = process.env.NEWS_API_KEY;
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});