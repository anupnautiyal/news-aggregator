import express from "express";
import dotenv from "dotenv";
import { getTopHeadlines, searchEverything } from "./services/news.service.js";
import newsRouter from "./routes/news.route.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));

dotenv.config();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', newsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});