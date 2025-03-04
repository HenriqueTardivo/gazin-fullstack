import { DesenvolvedorRepository } from "@app/repositories/desenvolvedores.respository";
import { CreateDesenvolvedorDTO } from "@infra/http/dto/create-desenvolvedor.dto";
import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class UpdateDesenvolvedoresUseCase {
  constructor(
    private readonly desenvolvedoresRepository: DesenvolvedorRepository
  ) {}

  public async execute(id: number, desenvolvedor: CreateDesenvolvedorDTO) {
    const devExists = await this.desenvolvedoresRepository.getDesenvolvedores({
      id,
    });

    if (devExists.length === 0) {
      throw new HttpException("Desenvolvedor inexistente!", 401);
    }

    return await this.desenvolvedoresRepository.updateDesenvolvedor(
      id,
      desenvolvedor
    );
  }
}
