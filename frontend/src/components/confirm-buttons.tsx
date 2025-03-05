import { Button, Center, HStack } from "@chakra-ui/react";
import { IoCheckmark } from "react-icons/io5";

type Props = {
  goBack: () => void;
  onSave: () => void;
};

export const ConfirmButtons = ({ goBack, onSave }: Props) => (
  <Center>
    <HStack gap={"20px"}>
      <Button bg={"blue.700"} w={"180px"} borderRadius={"md"} onClick={goBack}>
        Voltar
      </Button>

      <Button bg={"blue.700"} w={"180px"} borderRadius={"md"} onClick={onSave}>
        <IoCheckmark color={"white"} size={"20px"} />
        Salvar
      </Button>
    </HStack>
  </Center>
);
