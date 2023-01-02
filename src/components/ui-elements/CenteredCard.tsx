import type { MantineTheme } from "@mantine/core";
import { Card } from "@mantine/core";
import type { FC, ReactElement } from "react";
import { useCallback } from "react";



type Props = {
  children: ReactElement | ReactElement[]
  maxWidth: string
}
export const CenteredCard: FC<Props> = ({ children, maxWidth }) => {

  const sxHandler = useCallback(
    (theme: MantineTheme) => ({
      width: "90%",
      margin: "0 auto",
      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        width: maxWidth,
      },
    }), [maxWidth]);

  return (
    <Card
      p="lg"
      withBorder
      sx={sxHandler}
    >
      {children}
    </Card>
  );
};
