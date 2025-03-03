import { autoInjectable } from "tsyringe";
import { PrismaService } from "../prisma.service";
import { NiveisRepository } from "@app/repositories/niveis.repository";
import { Nivel } from "@app/types/niveis.types";

@autoInjectable()
export class NiveisRepositoryPrisma implements NiveisRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async createNivel({ nivel }: Nivel): Promise<Nivel> {
    return await this.prismaService.niveis.create({ data: { nivel } });
  }

  public async getNiveis(page: number, search?: string): Promise<Nivel[]> {
    return [];
  }

  public async updateNivel(id: number, { nivel }: Nivel): Promise<Nivel> {
    return await this.prismaService.niveis.update({
      where: { id },
      data: { nivel },
    });
  }

  public async deleteNivel(id: number) {
    return await this.prismaService.niveis.delete({ where: { id } });
  }
}
