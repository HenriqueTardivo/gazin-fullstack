import { HStack, Table } from "@chakra-ui/react";
import { DevResp } from "../../@types/desenvolvedores.types";
import { formatDate } from "../../utils/format-date";
import { RiPencilFill } from "react-icons/ri";
import { Tooltip } from "../ui/tooltip";
import { IoMdTrash } from "react-icons/io";

type Props = {
  data: DevResp[];
  onEditDesenvolvedor?: (id: number) => void;
  onDeleteDesenvolvedor?: (value: { title: string; id: number }) => void;
  onSort: (columnKey: string) => void;
};

export const TableDesenvolvedores = ({
  data,
  onEditDesenvolvedor,
  onDeleteDesenvolvedor,
  onSort,
}: Props) => (
  <Table.Root size="sm" interactive w={"80%"}>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader onClick={() => onSort("id")} cursor="pointer">
          Id
        </Table.ColumnHeader>

        <Table.ColumnHeader onClick={() => onSort("nome")} cursor="pointer">
          Nome
        </Table.ColumnHeader>

        <Table.ColumnHeader onClick={() => onSort("sexo")} cursor="pointer">
          Sexo
        </Table.ColumnHeader>

        <Table.ColumnHeader
          onClick={() => onSort("data_nascimento")}
          cursor="pointer"
        >
          Data de Nascimento
        </Table.ColumnHeader>

        <Table.ColumnHeader onClick={() => onSort("hobby")} cursor="pointer">
          Hobby
        </Table.ColumnHeader>

        <Table.ColumnHeader onClick={() => onSort("nivel_id")} cursor="pointer">
          Nível
        </Table.ColumnHeader>

        <Table.ColumnHeader></Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {data.map((item) => (
        <Table.Row key={item.id}>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>{item.nome}</Table.Cell>
          <Table.Cell>
            {item.sexo === "M" ? "Masculino" : "Feminino"}
          </Table.Cell>
          <Table.Cell>{formatDate(item.data_nascimento)}</Table.Cell>
          <Table.Cell>{item.hobby}</Table.Cell>
          <Table.Cell>{item.nivel.nivel}</Table.Cell>
          <Table.Cell>
            <HStack gap="15px" justifyContent="flex-end">
              <Tooltip content="Editar desenvolvedor" closeDelay={100}>
                <RiPencilFill
                  size="20px"
                  cursor="pointer"
                  onClick={() => onEditDesenvolvedor?.(item.id)}
                />
              </Tooltip>

              <Tooltip content="Remover desenvolvedor" closeDelay={100}>
                <IoMdTrash
                  color="red"
                  size="20px"
                  cursor="pointer"
                  onClick={() =>
                    onDeleteDesenvolvedor?.({
                      title: `Confirma a remoção do desenvolvedor: [ ${item.nome} ] ?`,
                      id: item.id,
                    })
                  }
                />
              </Tooltip>
            </HStack>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);
