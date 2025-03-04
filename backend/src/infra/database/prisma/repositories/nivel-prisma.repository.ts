import { NiveisRepository } from "@app/repositories/niveis.repository";
import { Nivel } from "@app/types/niveis.types";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class NiveisRepositoryPrisma implements NiveisRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private PAGE_SIZE = 10;

  public async createNivel({ nivel }: Nivel): Promise<Nivel> {
    return await this.prismaService.niveis.create({ data: { nivel } });
  }

  public async getNiveisPaginated(filter: { page: number; search?: string }) {
    const where: Prisma.NiveisWhereInput = filter?.search
      ? {
          nivel: {
            contains: filter.search,
            mode: "insensitive",
          },
        }
      : {};

    const [result, count] = await Promise.all([
      this.prismaService.niveis.findMany({
        where,
        take: this.PAGE_SIZE,
        skip: Number(filter.page * this.PAGE_SIZE),
        orderBy: {
          id: "asc",
        },
      }),
      this.prismaService.niveis.count({
        where,
      }),
    ]);

    return { result, count };
  }

  public async getNiveis(filter: {
    id?: number;
    nivel?: string;
  }): Promise<Nivel[]> {
    if (!filter.id && !filter.nivel) return [];

    return this.prismaService.niveis.findMany({
      where: {
        id: filter?.id,
        nivel: filter?.nivel,
      },
    });
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
