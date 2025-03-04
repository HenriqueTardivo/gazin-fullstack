import { PrismaService } from "../prisma.service";
import { DesenvolvedorRepository } from "@app/repositories/desenvolvedores.respository";
import { Desenvolvedor } from "@app/types/desenvolvedores.types";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class DesenvolvedoresRepositoryPrisma
  implements DesenvolvedorRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  private PAGE_SIZE = 10;

  public async createDesenvolvedor(
    desenvolvedor: Desenvolvedor
  ): Promise<Desenvolvedor> {
    return await this.prismaService.desenvolvedores.create({
      data: {
        data_nascimento: new Date(desenvolvedor.data_nascimento),
        hobby: desenvolvedor.hobby,
        nome: desenvolvedor.nome,
        sexo: desenvolvedor.sexo,
        nivel_id: desenvolvedor.nivel_id,
      },
    });
  }

  public async getDesenvolvedores(filter: {
    nome?: string;
    nivel_id?: number;
    id?: number;
    page?: number;
    search?: string;
  }): Promise<Desenvolvedor[]> {
    return [];
  }

  public async getDesenvolvedoresPaginated(filter: {
    page: number;
    nivel_id?: number;
    search?: string;
  }): Promise<{ count: number; result: Desenvolvedor[] }> {
    const where: Prisma.DesenvolvedoresWhereInput = {
      ...(filter.search
        ? { nome: { contains: filter.search, mode: "insensitive" } }
        : {}),
      ...(filter.nivel_id ? { nivel_id: filter.nivel_id } : {}),
    };

    const [result, count] = await Promise.all([
      this.prismaService.desenvolvedores.findMany({
        where,
        take: this.PAGE_SIZE,
        skip: Number(filter.page * this.PAGE_SIZE),
        orderBy: {
          id: "asc",
        },
      }),
      this.prismaService.desenvolvedores.count({
        where,
      }),
    ]);

    return { result, count };
  }
  public async countDesenvolvedores(nivel_id: number): Promise<number> {
    return await this.prismaService.desenvolvedores.count({
      where: { nivel_id },
    });
  }

  public async updateDesenvolvedor(
    id: number,
    desenvolvedor: Desenvolvedor
  ): Promise<Desenvolvedor> {
    return await this.prismaService.desenvolvedores.update({
      data: { ...desenvolvedor },
      where: { id },
    });
  }

  public async deleteDesenvolvedor(id: number): Promise<void> {
    await this.prismaService.desenvolvedores.delete({ where: { id } });
  }
}
