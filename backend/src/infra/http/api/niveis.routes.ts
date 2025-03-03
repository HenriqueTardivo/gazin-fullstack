import { Router } from "express";
import { NiveisController } from "./controllers/niveis.controller";
import { container } from "tsyringe";

const niveisRouter = Router();
const niveisController = container.resolve(NiveisController);

niveisRouter.post("", niveisController.createNivel);
niveisRouter.get("", niveisController.getNiveis);
niveisRouter.put("", niveisController.editNivel);
niveisRouter.delete(":id", niveisController.deleteNivel);

export { niveisRouter };
