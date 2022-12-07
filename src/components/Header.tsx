import { Flex } from "@mantine/core";
import { Logo } from "./Logo";
import { Stepper } from "./Stepper";

export const Header = () => {
  return (
    <Flex
      justify="center"
      align="center"
      gap="xl"
      wrap={{
        lg:"nowrap",
        xs:"wrap",
      }}
      sx={{
        margin: "2rem",
        flexWrap: "wrap",
      }}
    >
      <Logo/>
      <Stepper/>
    </Flex>
  );
};
