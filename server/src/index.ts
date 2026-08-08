import express from "express";
import "dotenv/config";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.ts";
import { registerRoutes } from "./routes/index.ts";
import { errorHandler } from "./middleware/error-handler.middleware.ts";

const app = express();
const PORT = process.env.PORT ?? 3000;
const clientUrl = process.env.CLIENT_URL ?? `http://localhost:3001`;

app.use(
    cors({
        origin: clientUrl,
        credentials: true
    })
)

app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

registerRoutes(app);
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
