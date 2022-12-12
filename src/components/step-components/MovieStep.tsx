import { Button, Card, Center, FocusTrap, Group, Space, Text, TextInput, Title } from "@mantine/core";
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { useForm } from "@mantine/form";
import { IconMovie } from "@tabler/icons";
import { trpc } from "../../utils/trpc";
import { useScrollIntoView } from "@mantine/hooks";
import { MovieResults } from "../MovieResults";


export const MovieStep = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("Missing context provider for AppContext!");
  }

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  const [searchQuery, setSearchQuery] = useState("");
  const movies = trpc.example.getMovie.useQuery({ searchQuery }, {
    enabled: !!searchQuery,
    staleTime: Infinity,
    onSuccess: () => {
      scrollIntoView();
    },
  });

  const form = useForm({
    initialValues: {
      searchQuery: "",
    },
    validate: {
      searchQuery: value => value.length ? null : "You must specify a movie!",
    },
  });

  return(
    <>
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
          <FocusTrap active={true}>
            <form
              onSubmit={form.onSubmit(({ searchQuery }) => {
                setSearchQuery(searchQuery);
              })}
            >
              <TextInput
                size="lg"
                withAsterisk
                labelProps={{
                  size: "lg",
                }}
                label="Find your movie"
                placeholder="Movie title..."
                {...form.getInputProps("searchQuery")}
                icon={<IconMovie size={18} />}
              />
              <Group position="apart" mt="md" sx={{ flexDirection: "row-reverse" }}>
                <Button type="submit" size="lg">Search</Button>
                <Text
                  sx={theme => ({
                    fontSize: theme.fontSizes.md,
                    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
                      fontSize: theme.fontSizes.xs,
                    },
                  })}
                >
                  Search powered by <a href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">OMDb API</a>.</Text>
              </Group>
            </form>
          </FocusTrap>
        </Card>
      </Group>
      <Space h="md" />
      <Center>
        <Title ref={targetRef} opacity={!!movies.data ? 1 : 0}>Pick your movie</Title>
      </Center>
      {!!movies.data && movies.data?.length > 0 &&
          <MovieResults movies={movies.data}/>
      }
    </>
  );
};
