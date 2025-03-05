import { DesenvolvedorRepository } from "@app/repositories/desenvolvedores.respository";
import { Desenvolvedor } from "@app/types/desenvolvedores.types";

type DevTest = { id: number } & Desenvolvedor;

export class DesenvolvedoresRepositoryInMemory
  implements DesenvolvedorRepository
{
  private desenvolvedores: DevTest[] = [];
  private idCounter = 1;

  private PAGE_SIZE = 10;

  public async createDesenvolvedor(desenvolvedor: any): Promise<DevTest> {
    const newDev: DevTest = { id: this.idCounter++, ...desenvolvedor };
    this.desenvolvedores.push(newDev);
    return newDev;
  }

  public async getDesenvolvedores(filter: {
    nome?: string;
    nivel_id?: number;
    id?: number;
  }): Promise<Desenvolvedor[]> {
    console.log(this.desenvolvedores);

    return this.desenvolvedores.filter((d) => {
      const idMatch = filter.id ? d.id === filter.id : true;
      const nomeMatch = filter.nome
        ? d.nome.toLowerCase().includes(filter.nome.toLowerCase())
        : true;
      const nivelIdMatch = filter.nivel_id
        ? d.nivel_id === filter.nivel_id
        : true;

      return idMatch && nomeMatch && nivelIdMatch;
    });
  }

  public async getDesenvolvedoresPaginated(filter: {
    page: number;
    nivel_id?: number;
    search?: string;
    sort: string;
  }): Promise<{ count: number; result: Desenvolvedor[] }> {
    let filtered = this.desenvolvedores;

    if (filter.search) {
      filtered = filtered.filter((d) =>
        d.nome.toLowerCase().includes(filter?.search?.toLowerCase() ?? "")
      );
    }

    if (filter.nivel_id) {
      filtered = filtered.filter((d) => d.nivel_id === filter.nivel_id);
    }

    const total = filtered.length;
    const paginated = filtered.slice(
      (filter.page - 1) * this.PAGE_SIZE,
      filter.page * this.PAGE_SIZE
    );

    return { result: paginated, count: total };
  }

  public async countDesenvolvedores(nivel_id: number): Promise<number> {
    return this.desenvolvedores.filter((d) => d.nivel_id === nivel_id).length;
  }

  public async updateDesenvolvedor(
    id: number,
    desenvolvedor: DevTest
  ): Promise<DevTest> {
    const index = this.desenvolvedores.findIndex((d) => d.id === id);
    if (index === -1) throw new Error("Desenvolvedor não encontrado");

    this.desenvolvedores[index] = {
      ...this.desenvolvedores[index],
      ...desenvolvedor,
    };
    return this.desenvolvedores[index];
  }

  public async deleteDesenvolvedor(id: number): Promise<void> {
    this.desenvolvedores = this.desenvolvedores.filter((d) => d.id !== id);
  }
}
