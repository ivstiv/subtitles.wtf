import { Button, Card, Group, Text, TextInput } from "@mantine/core";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { useForm } from "@mantine/form";
import { IconMovie } from "@tabler/icons";


export const MovieStep = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("Missing context provider for AppContext!");
  }

  const form = useForm({
    initialValues: {
      movie: "",
    },
    validate: {
      movie: value => value.length ? null : "You must specify a movie!",
    },
  });

  return(
    <Group position="center">
      <Card
        p="lg"
        withBorder
        sx={theme => ({
          width: "90%",
          [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            width: "50%",
          },
        })}
      >
        <form
          onSubmit={form.onSubmit(({ movie }) => {
            console.log(movie);
          })}
        >
          <TextInput
            withAsterisk
            label="Search by title"
            placeholder="Movie title..."
            {...form.getInputProps("movie")}
            icon={<IconMovie size={18} />}
          />
          <Group position="apart" mt="md">
            <Text
              sx={theme => ({
                fontSize: theme.fontSizes.md,
                [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
                  fontSize: theme.fontSizes.sm,
                },
              })}
            >
              Search powered by <a href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">OMDb API</a>.</Text>
            <Button type="submit">Search</Button>
          </Group>
        </form>
      </Card>
    </Group>
  );
};
