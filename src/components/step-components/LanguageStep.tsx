import { Button, FocusTrap, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useFocusTrap } from "@mantine/hooks";
import { useContext, useMemo, useState } from "react";
import { languages } from "../../utils/languages";
import { AppContext } from "../AppContext";
import { CenteredCard } from "../ui-elements/CenteredCard";
import { LanguageButton } from "../ui-elements/LanguageButton";



const DEFAULT_LANGUAGE_CODES = ["en", "zh", "hi", "es"];
const NUM_OF_SHOWN_LANGS = 4;

export const LanguageStep = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("Missing context provider for AppContext!");
  }

  const form = useForm({
    initialValues: {
      languageInput: "",
      languages: context.languages,
    },
    validate: {
      languages: value => value.length ? null : "You must select a language",
    },
  });

  const selectedLanguages = useMemo(() => {
    if(form.values.languages) {
      const langugesCodes = form.values.languages.split(",");
      return languages.filter(l =>
        langugesCodes.includes(l.code)
      );
    } else {
      return [];
    }
  }, [form.values.languages]);

  const filteredLanguages = useMemo(() => {
    // const filteredLangs = [];
    if(form.values.languageInput.length > 0) {
      return languages
        .filter(l => // filter by input query
          l.name.toUpperCase()
            .includes(form.values.languageInput.toUpperCase())
        )
        .filter(filteredLang => // remove the selected langs
          !selectedLanguages.some(selectedLang =>
            selectedLang.code === filteredLang.code
          )
        );
    } else {
      if(selectedLanguages.length) {
        return [];
      } else {
        return languages.filter(l =>
          DEFAULT_LANGUAGE_CODES.includes(l.code)
        );
      }
    }
  }, [form.values.languageInput, selectedLanguages]);

  const [shouldFocusOnInput, setShouldFocusOnInput] = useState(false);
  const focusRef = useFocusTrap(shouldFocusOnInput);


  return (
    <CenteredCard maxWidth="50%">
      <FocusTrap active={true}>
        <form
          onSubmit={form.onSubmit(({ languages }) => {
            context.setLanguages(languages);
            context.setStep(prev => prev+1);
          })}
        >
          <Group position="apart">
            <TextInput
              ref={focusRef}
              name="language"
              size="lg"
              placeholder="Filter languages..."
              sx={{ flexGrow: 1 }}
              {...form.getInputProps("languageInput")}
              error={form.errors.languages}
            />
            <Button
              type="submit"
              size="lg"
              variant="gradient"
            >
                Show subtitles
            </Button>
          </Group>

          <Group position="left" mt="md" sx={{ flexDirection: "row" }}>
            {selectedLanguages.map(lang => (
              <LanguageButton
                key={`${lang.code}-selected`}
                language={lang.code}
                isSelected={true}
                onPress={() => {
                  const newLangs = form.values.languages
                    .split(",")
                    .filter(code => code !== lang.code);
                  form.setValues({
                    languages: newLangs.join(","),
                  });
                }}
              />
            ))}

            {filteredLanguages.slice(0, NUM_OF_SHOWN_LANGS).map(lang => (
              <LanguageButton
                key={`${lang.code}-filtered`}
                language={lang.code}
                isSelected={false}
                onPress={() => {
                  const isFirst = form.values.languages.length === 0;
                  const newValue = isFirst ?
                    lang.code : `${form.values.languages},${lang.code}`;
                  form.setValues({
                    languages: newValue,
                  });
                  form.setValues({ languageInput: "" });
                  setShouldFocusOnInput(true);
                }}
              />
            ))}
            {(filteredLanguages.length - NUM_OF_SHOWN_LANGS) > 0 &&
              `+ ${(filteredLanguages.length - NUM_OF_SHOWN_LANGS)} more...`
            }
          </Group>
        </form>
      </FocusTrap>
    </CenteredCard>
  );
};
