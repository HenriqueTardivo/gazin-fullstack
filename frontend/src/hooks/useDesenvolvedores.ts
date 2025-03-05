import {
  Desenvolvedor,
  DevPaginatedResp,
  DevResp,
} from "../@types/desenvolvedores.types";
import { api } from "../service/api";

type GetDesenvolvedoresParams = {
  page: number;
  search: string;
  nivel_id?: string;
  sort?: string;
};

export function useDesenvolvedores() {
  async function getDesenvolvedores({
    page,
    search,
    sort,
    nivel_id,
  }: GetDesenvolvedoresParams) {
    const { data } = await api.get<DevPaginatedResp>("desenvolvedores", {
      params: { page, search, nivel_id, sort },
    });

    return data;
  }

  async function getDesenvolvedoresById(id: number | string) {
    const { data } = await api.get<DevResp[]>("desenvolvedores/" + id);

    return data;
  }

  async function createDesenvolvedor(body: any) {
    const { data } = await api.post("desenvolvedores", body);

    return data;
  }

  async function editDesenvolvedor(id: number, body: Desenvolvedor) {
    const { data } = await api.put("desenvolvedores/" + id, body);

    return data;
  }

  async function deleteDesenvolvedor(id: number) {
    const { data } = await api.delete("desenvolvedores/" + id);

    return data;
  }

  return {
    createDesenvolvedor,
    getDesenvolvedores,
    getDesenvolvedoresById,
    editDesenvolvedor,
    deleteDesenvolvedor,
  };
}
