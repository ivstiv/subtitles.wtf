import { Flex } from "@mantine/core";
import { Logo } from "~/app/_components/logo/logo";
import { Stepper } from "~/app/_components/stepper/stepper";
import classes from "./header.module.css";

export const Header = () => {
  return (
    <Flex
      component="header"
      justify="center"
      align="center"
      gap="xl"
      className={classes.header}
    >
      <Logo />
      <Stepper />
    </Flex>
  );
};
