import { Nivel } from "@app/types/niveis.types";

export interface NiveisRepository {
  createNivel: (nivel: Nivel) => Promise<Nivel>;
  getNiveis: (page: number, search?: string) => Promise<Nivel[]>;
  updateNivel: (id: number, nivel: Nivel) => Promise<Nivel>;
  deleteNivel: (id: number) => void;
}
