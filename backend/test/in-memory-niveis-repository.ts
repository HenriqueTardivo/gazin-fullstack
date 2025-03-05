import { NiveisRepository } from "@app/repositories/niveis.repository";
import { Nivel } from "@app/types/niveis.types";

export class NiveisRepositoryInMemory implements NiveisRepository {
  private niveis: { id: number; nivel: string }[] = [];
  private idCounter = 1;

  private PAGE_SIZE = 10;

  public async createNivel({ nivel }: Nivel): Promise<Nivel & { id: number }> {
    const newNivel = { id: this.idCounter++, nivel };
    this.niveis.push(newNivel);
    return newNivel;
  }

  public async getNiveisPaginated(filter: {
    page: number;
    search?: string;
    sort: string;
  }) {
    let filtered = this.niveis;

    if (filter.search) {
      filtered = filtered.filter((n) =>
        n.nivel.toLowerCase().includes(filter?.search?.toLowerCase() ?? "")
      );
    }

    const total = filtered.length;
    const paginated = filtered.slice(
      (filter.page - 1) * this.PAGE_SIZE,
      filter.page * this.PAGE_SIZE
    );

    return { result: paginated, count: total };
  }

  public async getNiveis(filter: {
    id?: number;
    nivel?: string;
  }): Promise<any[]> {
    return this.niveis.filter(
      (n) =>
        (filter.id ? n.id === filter.id : true) &&
        (filter.nivel ? n.nivel === filter.nivel : true)
    );
  }

  public async updateNivel(id: number, { nivel }: any): Promise<any> {
    const index = this.niveis.findIndex((n) => n.id === id);
    if (index === -1) throw new Error("Nível não encontrado");

    this.niveis[index].nivel = nivel;
    return this.niveis[index];
  }

  public async deleteNivel(id: number): Promise<void> {
    this.niveis = this.niveis.filter((n) => n.id !== id);
  }
}
