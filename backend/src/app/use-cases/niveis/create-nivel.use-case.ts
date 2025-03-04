import { NiveisRepository } from "@app/repositories/niveis.repository";
import { CreateNivelDTO } from "@infra/http/dto/create-nivel.dto";
import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class CreateNivelUseCase {
  constructor(private readonly nivelRespository: NiveisRepository) {}

  public async execute({ nivel }: CreateNivelDTO) {
    const duplicateNivel = await this.nivelRespository.getNiveis({ nivel });

    if (duplicateNivel.length > 0) {
      throw new HttpException("Nível já cadastrado!", 401);
    }

    return await this.nivelRespository.createNivel({ nivel });
  }
}
