import { Nivel } from "@app/types/niveis.types";

export abstract class NiveisRepository {
  abstract createNivel: (nivel: Nivel) => Promise<Nivel>;
  abstract getNiveis: (filter: {
    id?: number;
    nivel?: string;
  }) => Promise<Nivel[]>;
  abstract getNiveisPaginated: (filter: {
    page: number;
    search?: string;
  }) => Promise<{ count: number; result: Nivel[] }>;
  abstract updateNivel: (id: number, nivel: Nivel) => Promise<Nivel>;
  abstract deleteNivel: (id: number) => void;
}
