import { DesenvolvedorRepository } from "@app/repositories/desenvolvedores.respository";
import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class DeleteDesenvolvedorUseCase {
  constructor(
    private readonly desenvolvedoresRepository: DesenvolvedorRepository
  ) {}

  public async execute(id: number) {
    const devExists = await this.desenvolvedoresRepository.getDesenvolvedores({
      id,
    });

    if (devExists.length === 0) {
      throw new HttpException("Desenvolvedor inexistente!", 401);
    }

    return await this.desenvolvedoresRepository.deleteDesenvolvedor(id);
  }
}
