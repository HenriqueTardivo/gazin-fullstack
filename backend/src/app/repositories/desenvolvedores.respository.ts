import { Desenvolvedor } from "@app/types/desenvolvedores.types";

export abstract class DesenvolvedorRepository {
  abstract createDesenvolvedor: (
    desenvolvedor: Desenvolvedor
  ) => Promise<Desenvolvedor>;

  abstract getDesenvolvedoresPaginated: (filter: {
    page?: number;
    nivel_id?: number;
    sort?: string;
    search?: string;
  }) => Promise<{ count: number; result: Desenvolvedor[] }>;

  abstract getDesenvolvedores: (filter: {
    nome?: string;
    nivel_id?: number;
    id?: number;
  }) => Promise<Desenvolvedor[]>;

  abstract countDesenvolvedores: (nivel_id: number) => Promise<number>;

  abstract updateDesenvolvedor: (
    id: number,
    desenvolvedor: Desenvolvedor
  ) => Promise<Desenvolvedor>;

  abstract deleteDesenvolvedor: (id: number) => Promise<void>;
}
