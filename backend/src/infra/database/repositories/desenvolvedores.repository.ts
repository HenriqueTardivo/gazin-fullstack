import { injectable } from "tsyringe";
import { PrismaService } from "../prisma.service";
import { DesenvolvedorRepository } from "@app/repositories/desenvolvedores.respository";
import { Desenvolvedor } from "@app/types/desenvolvedores.types";

@injectable()
export class DesenvolvedoresRepositoryPrisma
  implements DesenvolvedorRepository
{
  constructor(private readonly prismaService: PrismaService) {}

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

  public async getDesenvolvedores(
    page: number,
    nivel_id?: number,
    search?: string
  ): Promise<Desenvolvedor[]> {
    return [];
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

  public async deleteDesenvolvedor(id: number): Promise<Desenvolvedor> {
    return await this.prismaService.desenvolvedores.delete({ where: { id } });
  }
}
