import { Box } from "@mantine/core";
import Image from "next/image";
import logoImg from "../../../assets/logo.png";
import classes from "./logo.module.css";

export const Logo = () => {
  return (
    <Box className={classes.logo}>
      <Image
        src={logoImg}
        alt="Logo"
        priority={true}
        className={classes["logo-image"]}
      />
    </Box>
  );
};
