import { NiveisRepositoryPrisma } from "@infra/database/repositories/niveis.repository";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class CreateNivelUseCase {
  constructor(private niveisRepository: NiveisRepositoryPrisma) {}

  public async execute() {}
}
