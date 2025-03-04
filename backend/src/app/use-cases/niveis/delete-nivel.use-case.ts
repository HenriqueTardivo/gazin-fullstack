import { DesenvolvedorRepository } from "@app/repositories/desenvolvedores.respository";
import { NiveisRepository } from "@app/repositories/niveis.repository";
import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class DeleteNivelUseCase {
  constructor(
    private readonly nivelRepository: NiveisRepository,
    private readonly desenvolvedoresRepository: DesenvolvedorRepository
  ) {}

  public async execute(id: number) {
    const devsNivel = await this.desenvolvedoresRepository.getDesenvolvedores({
      nivel_id: id,
    });

    if (devsNivel.length > 0) {
      throw new HttpException(
        `Existem ${devsNivel.length} desenvolvedores cadastrados nesse nível, não é possível deletar!`,
        401
      );
    }

    return await this.nivelRepository.deleteNivel(id);
  }
}
