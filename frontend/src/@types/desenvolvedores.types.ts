import { ApiPaginatedResp } from "./global.types";

export type DevPaginatedResp = ApiPaginatedResp<DevResp>;

export type DevResp = {
  nivel: {
    id: number;
    nivel: string;
  };
  id: number;
} & Desenvolvedor;

export type Desenvolvedor = {
  nivel_id: number;
  nome: string;
  sexo: string;
  data_nascimento: string;
  hobby: string;
};
