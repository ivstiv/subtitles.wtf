import { Button } from "@mantine/core";
import type { FC } from "react";
import { useMemo } from "react";
import { IconX, IconFlag, IconFlagOff } from "@tabler/icons";
import { languages } from "../../utils/languages";



type Props = {
  language: string
  isSelected: boolean
  onPress?: () => void
}

export const LanguageButton: FC<Props> = props => {
  const languageToShow = useMemo(() =>
    languages.find(l => l.code === props.language)?.name ?? "Unknown",
  [props.language]);

  return(
    <Button
      variant="light"
      leftIcon={props.isSelected ? <IconFlag/> : <IconFlagOff/>}
      rightIcon={props.isSelected ? <IconX/> : undefined}
      onClick={() => {
        props.onPress && props.onPress();
      }}
    >
      {languageToShow}
    </Button>
  );
};
