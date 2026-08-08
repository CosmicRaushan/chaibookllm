import express from "express";
import "dotenv/config";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.ts";

const app = express();
const PORT = process.env.PORT;

app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
