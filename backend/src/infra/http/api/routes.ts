import { Router } from "express";
import { niveisRouter } from "./niveis.routes";
import { desenvolvedorRouter } from "./desenvolvedores.routes";

const router = Router();

router.use("/api/desenvolvedores", desenvolvedorRouter);
router.use("/api/niveis", niveisRouter);

export { router };
