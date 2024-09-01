import { Button } from "@mantine/core";
import { useMemo } from "react";
import { IconX, IconFlag, IconFlagOff } from "@tabler/icons-react";
import { languages } from "~/utils/languages";

type Props = {
  language: string;
  isSelected: boolean;
  onPress?: () => void;
};

export const LanguageButton = (props: Props) => {
  const languageToShow = useMemo(
    () => languages.find((l) => l.code === props.language)?.name ?? "Unknown",
    [props.language],
  );

  return (
    <Button
      size="xs"
      variant={props.isSelected ? "filled" : "light"}
      leftSection={props.isSelected ? <IconFlag /> : <IconFlagOff />}
      rightSection={props.isSelected ? <IconX /> : undefined}
      onClick={() => {
        if (props.onPress) {
          props.onPress();
        }
      }}
    >
      {languageToShow}
    </Button>
  );
};
