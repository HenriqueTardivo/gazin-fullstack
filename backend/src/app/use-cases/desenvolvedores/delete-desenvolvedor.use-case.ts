import { DesenvolvedoresRepositoryPrisma } from "@infra/database/repositories/desenvolvedores.repository";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class DeleteDesenvolvedorUseCase {
  constructor(
    private readonly desenvolvedorRepository: DesenvolvedoresRepositoryPrisma
  ) {}

  public async execute() {}
}
