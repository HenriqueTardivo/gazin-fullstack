import { Request, Response } from "express";
import { CreateNivelUseCase } from "@app/use-cases/niveis/create-nivel.use-case";
import { autoInjectable } from "tsyringe";
import { GetNiveisUseCase } from "@app/use-cases/niveis/get-niveis.use-case";
import { UpdateNivelUseCase } from "@app/use-cases/niveis/update-nivel.use-case";
import { DeleteNivelUseCase } from "@app/use-cases/niveis/delete-nivel.use-case";

@autoInjectable()
export class NiveisController {
  constructor(
    private readonly getNiveisUseCase: GetNiveisUseCase,
    private readonly createNivelUseCase: CreateNivelUseCase,
    private readonly updateNivelUseCase: UpdateNivelUseCase,
    private readonly deleteNivelUseCase: DeleteNivelUseCase
  ) {}

  public async getNiveis(req: Request, res: Response) {}
  public async deleteNivel(req: Request, res: Response) {}
  public async createNivel(req: Request, res: Response) {}
  public async editNivel(req: Request, res: Response) {}
}
