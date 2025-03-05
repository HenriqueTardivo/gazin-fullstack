import { NivelPaginatedResp } from "../@types/nivel.types";
import { api } from "../service/api";

export function useNiveis() {
  async function getNiveis(page: number, search: string, sort: string) {
    const { data } = await api.get<NivelPaginatedResp>("niveis", {
      params: { page, search, sort },
    });

    return data;
  }

  async function getNivelById(id: number | string) {
    const { data } = await api.get("niveis/" + id);

    return data;
  }

  async function createNivel(nivel: string) {
    const { data } = await api.post("niveis", { nivel });

    return data;
  }

  async function editNivel(id: number, nivel: string) {
    const { data } = await api.put("niveis/" + id, { nivel });

    return data;
  }

  async function deleteNivel(id: number) {
    const { data } = await api.delete("niveis/" + id);

    return data;
  }

  return { createNivel, getNiveis, editNivel, deleteNivel, getNivelById };
}
