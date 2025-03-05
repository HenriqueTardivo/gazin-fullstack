import { NiveisRepository } from "@app/repositories/niveis.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetNivelByIdUseCase {
  constructor(private readonly niveisRepository: NiveisRepository) {}

  public async execute(id: number) {
    return await this.niveisRepository.getNiveis({ id });
  }
}
