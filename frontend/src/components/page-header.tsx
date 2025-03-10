import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { InputGroup } from "./ui/input-group";
import { IoAdd, IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

type Props = {
  readonly?: boolean;
  newItemRoute?: string;
  searchText: string;
  addText?: string;
  onChangeFilter?: (search: string) => void;
};

export const PageHeader = ({
  onChangeFilter,
  newItemRoute,
  searchText,
  readonly = false,
  addText,
}: Props) => {
  const navigate = useNavigate();
  const handleAdd = () => newItemRoute && navigate(newItemRoute);

  return (
    <Stack justify="center" align="center" gap={"20px"}>
      <InputGroup endElement={<IoSearchOutline size={"20px"} />} w="80%">
        <Input
          placeholder={searchText}
          borderRadius="xl"
          shadow="md"
          h={"50px"}
          pr="40px"
          onChange={(e) => onChangeFilter?.(e.target.value)}
        />
      </InputGroup>

      {readonly ? null : (
        <Button
          bg={"blue.700"}
          w={"210px"}
          borderRadius={"md"}
          _hover={{ opacity: 0.8 }}
          onClick={handleAdd}
        >
          <IoAdd color={"white"} size={"20px"} />
          {addText}
        </Button>
      )}

      <Box bg={"gray.200"} h={"1px"} w={"100%"} />
    </Stack>
  );
};
