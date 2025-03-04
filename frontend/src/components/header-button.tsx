import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

type Props = {
  title: string;
  route: string;
  isSelected: boolean;
};

export const HeaderButton = ({ isSelected, route, title }: Props) => {
  const navigate = useNavigate();
  const handleChangeRoute = () => navigate(route);

  return (
    <Button
      bg={"white"}
      _hover={{ bg: "gray.100" }}
      borderRadius={"2xl"}
      p={{ base: "10px", md: "20px" }}
      width={{ base: "100%", md: "auto" }}
      onClick={handleChangeRoute}
    >
      <Text
        fontSize={{ base: "md", md: "xl" }}
        color={isSelected ? "blue.700" : "gray.600"}
        fontWeight={isSelected ? "bold" : "normal"}
        textAlign="center"
      >
        {title}
      </Text>
    </Button>
  );
};
