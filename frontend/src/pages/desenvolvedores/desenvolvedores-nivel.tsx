import { Box, Button, Center, HStack, Spinner, Stack } from "@chakra-ui/react";
import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMediaQuery } from "usehooks-ts";
import { DefaultPage } from "../../components/default-page";
import { CardMobileDesenvolvedores } from "../../components/desenvolvedores/card-mobile-desenvolvedores";
import { TableDesenvolvedores } from "../../components/desenvolvedores/table-desenvolvedores";
import { PageHeader } from "../../components/page-header";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import { useDebounce } from "../../hooks/useDebounce";
import { useDesenvolvedores } from "../../hooks/useDesenvolvedores";
import { useNiveis } from "../../hooks/useNiveis";

export function DesenvolvedoresNivel() {
  const { id } = useParams();

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

  const navigate = useNavigate();
  const { getDesenvolvedores } = useDesenvolvedores();
  const { getNivelById } = useNiveis();
  const [devQuery, nivelQuery] = useQueries({
    queries: [
      {
        queryKey: ["DESENVOLVEDORES", page, debounceSearch, id, sortConfig],
        queryFn: async () =>
          getDesenvolvedores({
            page,
            search: debounceSearch ?? "",
            nivel_id: id,
            sort: `${sortConfig.key}/${sortConfig.direction}`,
          }),
      },
      {
        queryKey: ["NIVEL-BY-ID", id],
        queryFn: async () => getNivelById(String(id)),
      },
    ],
  });
  const handleChangePage = (page: number) => setPage(page);
  const handleChangeFilter = (value: string) => setSearch(value);
  const handleGoBack = () => navigate("/niveis");

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSort = (columnKey: string) => {
    setSortConfig((prev) => ({
      key: columnKey,
      direction:
        prev.key === columnKey && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const renderTable = () => {
    if (devQuery.isLoading) {
      return (
        <Center>
          <Spinner size={"lg"} />
        </Center>
      );
    }

    if (devQuery.data && devQuery.data.data.length > 0) {
      return (
        <Stack align={"center"}>
          {isMobile ? (
            <CardMobileDesenvolvedores data={devQuery.data.data} />
          ) : (
            <TableDesenvolvedores
              data={devQuery.data.data}
              onSort={handleSort}
            />
          )}

          {devQuery.data.meta && (
            <PaginationRoot
              count={devQuery.data.meta.total}
              pageSize={devQuery.data.meta.per_page}
              defaultPage={devQuery.data.meta.current_page}
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
    <DefaultPage
      pageTitle={
        nivelQuery.data && nivelQuery.data[0].nivel
          ? `Filtrando nivel: ${nivelQuery.data[0].nivel}`
          : " "
      }
    >
      <PageHeader
        readonly
        searchText="Pesquise desenvolvedores"
        onChangeFilter={handleChangeFilter}
      />

      {renderTable()}

      <Box bg={"gray.200"} h={"1px"} w={"100%"} />

      <Center>
        <Button
          bg={"blue.700"}
          w={"180px"}
          borderRadius={"md"}
          onClick={handleGoBack}
        >
          Voltar
        </Button>
      </Center>
    </DefaultPage>
  );
}
