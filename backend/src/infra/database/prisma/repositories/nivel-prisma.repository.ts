import { NiveisRepository } from "@app/repositories/niveis.repository";
import { Nivel } from "@app/types/niveis.types";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";
import { orderByObj } from "@app/utils/order-by-obj";

@Injectable()
export class NiveisRepositoryPrisma implements NiveisRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private PAGE_SIZE = 10;

  public async createNivel({ nivel }: Nivel): Promise<Nivel> {
    return await this.prismaService.niveis.create({ data: { nivel } });
  }

  public async getNiveisPaginated(filter: {
    page: number;
    search?: string;
    sort: string;
  }) {
    const where: Prisma.NiveisWhereInput = filter?.search
      ? {
          nivel: {
            contains: filter.search,
            mode: "insensitive",
          },
        }
      : {};

    const orderBy: any =
      filter.sort === "desenvolvedores/desc"
        ? { desenvolvedores: { _count: "desc" } }
        : filter.sort === "desenvolvedores/asc"
        ? { desenvolvedores: { _count: "asc" } }
        : orderByObj(filter.sort);

    const [result, count] = await Promise.all([
      this.prismaService.niveis.findMany({
        where,
        take: this.PAGE_SIZE,
        skip: Number((filter.page - 1) * this.PAGE_SIZE),
        orderBy,
        include: {
          _count: {
            select: {
              desenvolvedores: true,
            },
          },
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
