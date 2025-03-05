import { Box, Button, Center, Spinner, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useNiveis } from "../../hooks/useNiveis";
import { TableNiveis } from "../niveis/table-niveis";
import { PageHeader } from "../page-header";

type Props = {
  onNivelSelect: (values: { id: number; nivel: string } | null) => void;
};

export function SelectNivel({ onNivelSelect }: Props) {
  const [page, setPage] = useState<number>(1),
    [search, setSearch] = useState<string>(""),
    [sortConfig, setSortConfig] = useState<{
      key: string;
      direction: "asc" | "desc";
    }>({
      key: "id",
      direction: "asc",
    }),
    debounceSearch = useDebounce(search, 400);
  const { getNiveis } = useNiveis();

  const { isLoading, data } = useQuery({
    queryKey: ["NIVEIS", debounceSearch, page],
    queryFn: async () =>
      getNiveis(
        page,
        debounceSearch ?? "",
        `${sortConfig.key}/${sortConfig.direction}`
      ),
  });

  const handleSort = (columnKey: string) => {
    setSortConfig((prev) => ({
      key: columnKey,
      direction:
        prev.key === columnKey && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleChangeFilter = (value: string) => setSearch(value);

  const handleChangePage = (page: number) => setPage(page);

  const handleNivelSelect = (id: number, nivel: string) =>
    onNivelSelect({ id, nivel });

  const handleCancel = () => onNivelSelect(null);

  const renderTable = () => {
    if (isLoading) {
      return (
        <Center>
          <Spinner size={"lg"} />
        </Center>
      );
    }

    if (data && data.data.length > 0) {
      return (
        <TableNiveis
          onSort={handleSort}
          readonly
          data={data}
          onPageChange={handleChangePage}
          onSelectRow={handleNivelSelect}
        />
      );
    }
  };

  return (
    <Stack>
      <PageHeader
        readonly
        searchText="Pesquise níveis"
        onChangeFilter={handleChangeFilter}
      />

      {renderTable()}

      <Box bg={"gray.200"} h={"1px"} w={"100%"} />

      <Center>
        <Button
          bg={"blue.700"}
          w={"180px"}
          borderRadius={"md"}
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </Center>
    </Stack>
  );
}
