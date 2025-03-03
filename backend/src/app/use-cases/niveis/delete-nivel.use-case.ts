import { NiveisRepositoryPrisma } from "@infra/database/repositories/niveis.repository";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class DeleteNivelUseCase {
  constructor(private niveisRepository: NiveisRepositoryPrisma) {}
  public async execute() {}
}
