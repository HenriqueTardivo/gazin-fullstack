import { Center, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { DefaultPage } from "../../components/default-page";
import {
  ModalConfirmation,
  ModalConfirmationData,
} from "../../components/modal-confirmation";
import { TableNiveis } from "../../components/niveis/table-niveis";
import { PageHeader } from "../../components/page-header";
import { toaster } from "../../components/ui/toaster";
import { useDebounce } from "../../hooks/useDebounce";
import { useNiveis } from "../../hooks/useNiveis";

export function Niveis() {
  const [page, setPage] = useState<number>(1),
    [search, setSearch] = useState<string>(""),
    debounceSearch = useDebounce(search, 400),
    [deleteConfirmation, setDeleteConfirmation] =
      useState<ModalConfirmationData | null>(null),
    [sortConfig, setSortConfig] = useState<{
      key: string;
      direction: "asc" | "desc";
    }>({
      key: "id",
      direction: "asc",
    }),
    [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { getNiveis, deleteNivel } = useNiveis();

  const { isLoading, data, refetch, error } = useQuery({
    queryKey: ["NIVEIS", debounceSearch, page, sortConfig],
    queryFn: async () =>
      getNiveis(
        page,
        debounceSearch ?? "",
        `${sortConfig.key}/${sortConfig.direction}`
      ),
    retry: false,
  });

  const handleRowClick = (id: number) =>
    navigate("/desenvolvedores/nivel/" + id);

  const handleChangePage = (page: number) => setPage(page);

  const handleChangeFilter = (value: string) => setSearch(value);

  const handleOpenDeleteDialog = (data: ModalConfirmationData) =>
    setDeleteConfirmation(data);

  const handleEditNivel = (id: number) => navigate("/niveis/" + id);

  const handleSort = (columnKey: string) => {
    setSortConfig((prev) => ({
      key: columnKey,
      direction:
        prev.key === columnKey && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  async function handleDeleteConfirm(del: boolean) {
    if (!del) {
      setDeleteConfirmation(null);
      return;
    }

    setLoading(true);
    try {
      await deleteNivel(deleteConfirmation!.id);
      toaster.create({
        title: "Nível removido com sucesso!",
        type: "success",
      });
      refetch();
    } catch (error: any) {
      toaster.create({
        title: error?.response?.data?.message ?? "Erro ao deletar nível",
        type: "error",
      });
    } finally {
      setDeleteConfirmation(null);
      setLoading(false);
    }
  }

  const renderTable = () => {
    if (isLoading) {
      return (
        <Center>
          <Spinner size={"lg"} />
        </Center>
      );
    }

    if (error) {
      return (
        <Center>
          <Text fontSize={"lg"}>Nenhum nível encontrado!</Text>
        </Center>
      );
    }

    if (data && data.data.length > 0) {
      return (
        <TableNiveis
          data={data}
          onSort={handleSort}
          onDeleteNivel={handleOpenDeleteDialog}
          onEditNivel={handleEditNivel}
          onListDevelopers={handleRowClick}
          onPageChange={handleChangePage}
        />
      );
    }
  };

  return (
    <DefaultPage>
      <PageHeader
        addText="Cadastrar nível"
        searchText="Pesquise níveis"
        newItemRoute="/niveis/new"
        onChangeFilter={handleChangeFilter}
      />

      <ModalConfirmation
        isLoading={loading}
        data={deleteConfirmation}
        onConfirm={handleDeleteConfirm}
      />

      {renderTable()}
    </DefaultPage>
  );
}
