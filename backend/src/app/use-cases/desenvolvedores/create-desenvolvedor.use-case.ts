import { DesenvolvedoresRepositoryPrisma } from "@infra/database/repositories/desenvolvedores.repository";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class CreateDesenvolvedorUseCase {
  constructor(
    private desenvolvedorRepository: DesenvolvedoresRepositoryPrisma
  ) {}

  public async execute() {}
}
