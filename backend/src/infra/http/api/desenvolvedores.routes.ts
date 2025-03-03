import { Router } from "express";
import { DesenvolvedoresController } from "./controllers/desenvolvedores.controller";
import { container } from "tsyringe";

const desenvolvedorRouter = Router();

const desenvolvedoresController = container.resolve(DesenvolvedoresController);

desenvolvedorRouter.post("", desenvolvedoresController.createDesenvolvedor);
desenvolvedorRouter.get("", desenvolvedoresController.getDesenvolvedores);
desenvolvedorRouter.put("", desenvolvedoresController.editDesenvolvedor);
desenvolvedorRouter.delete(
  ":id",
  desenvolvedoresController.deleteDesenvolvedor
);

export { desenvolvedorRouter };
