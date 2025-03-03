import { CreateDesenvolvedorUseCase } from "@app/use-cases/desenvolvedores/create-desenvolvedor.use-case";
import { DeleteDesenvolvedorUseCase } from "@app/use-cases/desenvolvedores/delete-desenvolvedor.use-case";
import { GetDesenvolvedoresUseCase } from "@app/use-cases/desenvolvedores/get-desenvolvedores.use-case";
import { UpdateDesenvolvedoresUseCase } from "@app/use-cases/desenvolvedores/update-desenvolvedor.use-case";
import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class DesenvolvedoresController {
  constructor(
    private readonly getDesenvolvedoresUseCase: GetDesenvolvedoresUseCase,
    private readonly createDesenvolvedoresUseCase: CreateDesenvolvedorUseCase,
    private readonly updateDesenvolvedoresUseCase: UpdateDesenvolvedoresUseCase,
    private readonly deleteDesenvolvedoresUseCase: DeleteDesenvolvedorUseCase
  ) {}

  public async getDesenvolvedores(req: Request, res: Response) {}
  public async deleteDesenvolvedor(req: Request, res: Response) {}
  public async createDesenvolvedor(req: Request, res: Response) {}
  public async editDesenvolvedor(req: Request, res: Response) {}
}
