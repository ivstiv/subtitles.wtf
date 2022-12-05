import { Box } from "@mantine/core";
import Image from "next/image";
import logoImg from "../assets/images/logo.png";

export const Logo = () => {
  return (
    <Box
      sx={theme => ({
        width: "100%",
        [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
          width: "40%",
        },
      })}
    >
      <Image
        src={logoImg}
        alt="Logo"
        priority={true}
        style={{ height: "100%", width:"100%" }}
      />
    </Box>
  );
};
