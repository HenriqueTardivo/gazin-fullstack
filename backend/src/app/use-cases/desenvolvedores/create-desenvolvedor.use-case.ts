import { DesenvolvedorRepository } from "@app/repositories/desenvolvedores.respository";
import { NiveisRepository } from "@app/repositories/niveis.repository";
import { CreateDesenvolvedorDTO } from "@infra/http/dto/create-desenvolvedor.dto";
import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class CreateDesenvolvedorUseCase {
  constructor(
    private readonly nivelRepository: NiveisRepository,
    private readonly desenvolvedoresRepository: DesenvolvedorRepository
  ) {}

  public async execute(desenvolvedor: CreateDesenvolvedorDTO) {
    const [nivelExists, duplicateDev] = await Promise.all([
      this.nivelRepository.getNiveis({
        id: desenvolvedor.nivel_id,
      }),
      this.desenvolvedoresRepository.getDesenvolvedores({
        nome: desenvolvedor.nome,
      }),
    ]);

    if (nivelExists.length === 0) {
      throw new HttpException("Nível inexistente!", 401);
    }

    if (duplicateDev.length > 0) {
      throw new HttpException("Desenvolvedor já cadastrado!", 401);
    }

    return await this.desenvolvedoresRepository.createDesenvolvedor(
      desenvolvedor
    );
  }
}
