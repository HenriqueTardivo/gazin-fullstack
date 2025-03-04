import { Flex, HStack, Image, Stack } from "@chakra-ui/react";
import { IoExitOutline } from "react-icons/io5";
import Logo from "../assets/logo.svg";
import { HeaderButton } from "./header-button";
import { ReactNode } from "react";
import { useLocation } from "react-router";

type Props = {
  children: ReactNode;
};

export function DefaultPage({ children }: Props) {
  const location = useLocation();

  const handleExit = () => window.open("https://www.gazin.com.br");

  const buttons = [
    { title: "Desenvolvedores", route: "/desenvolvedores" },
    { title: "Níveis", route: "/niveis" },
  ];

  return (
    <Stack>
      <Flex
        justify={"space-between"}
        flexDir={{ base: "column", md: "row" }}
        px={{ base: "20px", md: "50px" }}
        py={{ base: "15px", md: "30px" }}
        alignItems={"center"}
        gap={{ base: "10px", md: "0px" }}
      >
        <Image
          src={Logo}
          alt="gazin logo"
          width={"100%"}
          height={"auto"}
          maxWidth={"120px"}
        />

        <Flex gap={"10px"} flexDir={{ base: "column", md: "row" }}>
          {buttons.map((btn) => (
            <HeaderButton
              key={btn.route}
              isSelected={location.pathname === btn.route}
              title={btn.title}
              route={btn.route}
            />
          ))}
        </Flex>

        <IoExitOutline size={"20px"} onClick={handleExit} cursor="pointer" />
      </Flex>
      {children}
    </Stack>
  );
}
