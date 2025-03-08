import { Center, HStack, Spinner, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useMediaQuery } from "usehooks-ts";
import { DefaultPage } from "../../components/default-page";
import { CardMobileDesenvolvedores } from "../../components/desenvolvedores/card-mobile-desenvolvedores";
import { TableDesenvolvedores } from "../../components/desenvolvedores/table-desenvolvedores";
import {
  ModalConfirmation,
  ModalConfirmationData,
} from "../../components/modal-confirmation";
import { PageHeader } from "../../components/page-header";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import { toaster } from "../../components/ui/toaster";
import { useDebounce } from "../../hooks/useDebounce";
import { useDesenvolvedores } from "../../hooks/useDesenvolvedores";

export function Desenvolvedores() {
  const [page, setPage] = useState(1),
    [search, setSearch] = useState(""),
    [sortConfig, setSortConfig] = useState<{
      key: string;
      direction: "asc" | "desc";
    }>({
      key: "id",
      direction: "asc",
    }),
    debounceSearch = useDebounce(search, 400);

  const [deleteConfirmation, setDeleteConfirmation] =
    useState<ModalConfirmationData | null>(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { getDesenvolvedores, deleteDesenvolvedor } = useDesenvolvedores();

  const { isLoading, data, refetch, error } = useQuery({
    queryKey: ["DESENVOLVEDORES", page, debounceSearch, sortConfig],
    queryFn: async () =>
      getDesenvolvedores({
        page,
        search: debounceSearch ?? "",
        sort: `${sortConfig.key}/${sortConfig.direction}`,
      }),
    retry: false,
  });

  const handleSort = (columnKey: string) => {
    setSortConfig((prev) => ({
      key: columnKey,
      direction:
        prev.key === columnKey && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleChangePage = (page: number) => setPage(page);

  const handleChangeFilter = (value: string) => setSearch(value);

  const handleOpenDeleteDialog = (data: ModalConfirmationData) =>
    setDeleteConfirmation(data);

  const handleEditDesenvolvedor = (id: number) =>
    navigate("/desenvolvedores/" + id);

  async function handleDeleteConfirm(del: boolean) {
    if (!del) {
      setDeleteConfirmation(null);
      return;
    }

    setLoading(true);
    try {
      await deleteDesenvolvedor(deleteConfirmation!.id);
      toaster.create({
        title: "Desenvolvedor removido com sucesso!",
        type: "success",
      });
      refetch();
    } catch (error: any) {
      toaster.create({
        title:
          error?.response?.data?.message ?? "Erro ao deletar desenvolvedor",
        type: "error",
      });
    } finally {
      setDeleteConfirmation(null);
      setLoading(false);
    }
  }

  const isMobile = useMediaQuery("(max-width: 768px)");

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
          <Text>Nenhum desenvolvedor encontrado!</Text>
        </Center>
      );
    }

    if (data && data.data.length > 0) {
      return (
        <Stack align={"center"}>
          {isMobile ? (
            <CardMobileDesenvolvedores
              data={data.data}
              onDeleteDesenvolvedor={handleOpenDeleteDialog}
              onEditDesenvolvedor={handleEditDesenvolvedor}
            />
          ) : (
            <TableDesenvolvedores
              onSort={handleSort}
              data={data.data}
              onDeleteDesenvolvedor={handleOpenDeleteDialog}
              onEditDesenvolvedor={handleEditDesenvolvedor}
            />
          )}

          {data.meta && (
            <PaginationRoot
              count={data.meta.total}
              pageSize={data.meta.per_page}
              defaultPage={data.meta.current_page}
              onPageChange={({ page }) => handleChangePage(page)}
            >
              <HStack>
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
              </HStack>
            </PaginationRoot>
          )}
        </Stack>
      );
    }
  };

  return (
    <DefaultPage>
      <PageHeader
        addText="Cadastrar desenvolvedor"
        searchText="Pesquise desenvolvedores"
        onChangeFilter={handleChangeFilter}
        newItemRoute="/desenvolvedores/new"
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
