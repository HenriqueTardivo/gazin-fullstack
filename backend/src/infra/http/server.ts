import "core-js";
import "reflect-metadata";
import cors from "cors";
import express from "express";
import { router } from "./api/routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.listen(8080, () => console.log("🚀 Backend iniciado na porta 8080"));
