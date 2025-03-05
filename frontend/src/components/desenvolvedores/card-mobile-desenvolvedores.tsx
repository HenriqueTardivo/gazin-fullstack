import { HStack, Stack, Text } from "@chakra-ui/react";
import { DevResp } from "../../@types/desenvolvedores.types";
import { formatDate } from "../../utils/format-date";
import { Tooltip } from "../ui/tooltip";
import { RiPencilFill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";

type Props = {
  data: DevResp[];
  onEditDesenvolvedor?: (id: number) => void;
  onDeleteDesenvolvedor?: (value: { title: string; id: number }) => void;
};

export const CardMobileDesenvolvedores = ({
  data,
  onDeleteDesenvolvedor,
  onEditDesenvolvedor,
}: Props) =>
  data.map((dev) => (
    <Stack
      key={dev.id}
      borderWidth={"1px"}
      borderRadius={"md"}
      w={"370px"}
      p={"20px"}
      shadow={"md"}
    >
      <HStack>
        <Text fontWeight={"bold"}>Id</Text>
        <Text>{dev.id}</Text>
      </HStack>

      <HStack>
        <Text fontWeight={"bold"}>Nome</Text>
        <Text>{dev.nome}</Text>
      </HStack>

      <HStack>
        <Text fontWeight={"bold"}>Sexo</Text>
        <Text>{dev.sexo === "M" ? "Masculino" : "Feminino"}</Text>
      </HStack>

      <HStack>
        <Text fontWeight={"bold"}>Data de Nascimento</Text>
        <Text>{formatDate(dev.data_nascimento)}</Text>
      </HStack>

      <HStack>
        <Text fontWeight={"bold"}>Hobby</Text>
        <Text>{dev.hobby}</Text>
      </HStack>

      <HStack>
        <Text fontWeight={"bold"}>Nível</Text>
        <Text>{dev.nivel.nivel}</Text>
      </HStack>

      <HStack gap="25px" justifyContent="center" my={"10px"}>
        <Tooltip content="Editar desenvolvedor" closeDelay={100}>
          <RiPencilFill
            size="30px"
            cursor="pointer"
            onClick={() => onEditDesenvolvedor?.(dev.id)}
          />
        </Tooltip>

        <Tooltip content="Remover desenvolvedor" closeDelay={100}>
          <IoMdTrash
            color="red"
            size="30px"
            cursor="pointer"
            onClick={() =>
              onDeleteDesenvolvedor?.({
                title: `Confirma a remoção do desenvolvedor [ ${dev.nivel} ] ?`,
                id: dev.id,
              })
            }
          />
        </Tooltip>
      </HStack>
    </Stack>
  ));
