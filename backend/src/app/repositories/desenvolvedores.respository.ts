import { Desenvolvedor } from "@app/types/desenvolvedores.types";

export interface DesenvolvedorRepository {
  createDesenvolvedor: (desenvolvedor: Desenvolvedor) => Promise<Desenvolvedor>;

  getDesenvolvedores: (
    page: number,
    nivel_id?: number,
    search?: string
  ) => Promise<Desenvolvedor[]>;

  updateDesenvolvedor: (
    id: number,
    desenvolvedor: Desenvolvedor
  ) => Promise<Desenvolvedor>;

  deleteDesenvolvedor: (id: number) => void;
}
