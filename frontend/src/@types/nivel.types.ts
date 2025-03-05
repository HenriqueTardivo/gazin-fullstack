import { ApiPaginatedResp } from "./global.types";

export type NivelPaginatedResp = ApiPaginatedResp<NivelResp>;

export type NivelResp = {
  id: number;
  nivel: string;
  _count: {
    desenvolvedores: number;
  };
};
export type Nivel = {
  nivel: string;
};
