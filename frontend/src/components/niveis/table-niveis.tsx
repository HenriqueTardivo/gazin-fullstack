import { HStack, Stack, Table } from "@chakra-ui/react";
import { NivelPaginatedResp } from "../../@types/nivel.types";
import { Tooltip } from "../ui/tooltip";
import { IoIosEye, IoMdTrash } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../ui/pagination";

type Props = {
  data: NivelPaginatedResp;
  onEditNivel?: (id: number) => void;
  onDeleteNivel?: (value: { title: string; id: number }) => void;
  onListDevelopers?: (id: number) => void;
  onSelectRow?: (id: number, nivel: string) => void;
  onPageChange: (page: number) => void;
  onSort: (columnKey: string) => void;
  readonly?: boolean;
};

export const TableNiveis = ({
  data,
  onEditNivel,
  onDeleteNivel,
  onListDevelopers,
  onPageChange,
  onSelectRow,
  onSort,
  readonly = false,
}: Props) => (
  <Stack align={"center"}>
    <Table.Root size="sm" interactive w={"80%"}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader onClick={() => onSort("id")} cursor="pointer">
            Id
          </Table.ColumnHeader>

          <Table.ColumnHeader onClick={() => onSort("nivel")} cursor="pointer">
            Nível
          </Table.ColumnHeader>

          <Table.ColumnHeader
            onClick={() => onSort("desenvolvedores")}
            cursor="pointer"
          >
            Devs
          </Table.ColumnHeader>

          {readonly ? null : <Table.ColumnHeader></Table.ColumnHeader>}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.data.map((item) => (
          <Table.Row
            key={item.id}
            cursor={readonly ? "pointer" : undefined}
            onClick={() => onSelectRow?.(item.id, item.nivel)}
          >
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.nivel}</Table.Cell>
            <Table.Cell>{item._count.desenvolvedores}</Table.Cell>
            {readonly ? null : (
              <Table.Cell>
                <HStack gap="15px" justifyContent="flex-end">
                  <Tooltip
                    content="Visualizar desenvolvedores"
                    closeDelay={100}
                  >
                    <IoIosEye
                      size="20px"
                      cursor="pointer"
                      onClick={() => onListDevelopers?.(item.id)}
                    />
                  </Tooltip>

                  <Tooltip content="Editar nível" closeDelay={100}>
                    <RiPencilFill
                      size="20px"
                      cursor="pointer"
                      onClick={() => onEditNivel?.(item.id)}
                    />
                  </Tooltip>

                  <Tooltip content="Remover nível" closeDelay={100}>
                    <IoMdTrash
                      color="red"
                      size="20px"
                      cursor="pointer"
                      onClick={() =>
                        onDeleteNivel &&
                        onDeleteNivel({
                          title: `Confirma a remoção do nível [ ${item.nivel} ] ?`,
                          id: item.id,
                        })
                      }
                    />
                  </Tooltip>
                </HStack>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    {data.meta && (
      <PaginationRoot
        count={data.meta.total}
        pageSize={data.meta.per_page}
        defaultPage={data.meta.current_page}
        onPageChange={({ page }) => onPageChange(page)}
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
