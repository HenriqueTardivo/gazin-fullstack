import { NiveisRepository } from "@app/repositories/niveis.repository";
import { CreateNivelDTO } from "@infra/http/dto/create-nivel.dto";
import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class UpdateNivelUseCase {
  constructor(private readonly nivelRepository: NiveisRepository) {}

  public async execute(id: number, nivel: CreateNivelDTO) {
    const nivelExists = await this.nivelRepository.getNiveis({
      id,
    });

    if (nivelExists.length === 0) {
      throw new HttpException("Nível inexistente!", 401);
    }

    return await this.nivelRepository.updateNivel(id, nivel);
  }
}
