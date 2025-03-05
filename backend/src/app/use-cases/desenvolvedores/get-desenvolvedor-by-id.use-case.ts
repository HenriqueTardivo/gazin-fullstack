import { DesenvolvedorRepository } from "@app/repositories/desenvolvedores.respository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetDesenvolvedorByIdUseCase {
  constructor(
    private readonly desenvolvedoresRepository: DesenvolvedorRepository
  ) {}

  public async execute(id: number) {
    return await this.desenvolvedoresRepository.getDesenvolvedores({ id });
  }
}
