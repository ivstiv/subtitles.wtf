import { Anchor, Text } from "@mantine/core";
import classes from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Text size="sm">
        Built by{" "}
        <Anchor
          href="https://github.com/ivstiv/subtitles.wtf"
          target="_blank"
          rel="noopener noreferrer"
        >
          ivstiv
        </Anchor>
      </Text>
    </footer>
  );
};
