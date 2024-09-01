import { useForm } from "@mantine/form";
import { useScrollIntoView } from "@mantine/hooks";
import {
  Anchor,
  Button,
  Card,
  Center,
  FocusTrap,
  Group,
  Space,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { api } from "~/trpc/react";
import { useEffect } from "react";
import { MovieResults } from "../../movie-results/movie-results";
import { IconMovie } from "@tabler/icons-react";
import classes from "./movie-step.module.css";

export const MovieStep = () => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  const form = useForm({
    initialValues: {
      searchQuery: "",
    },
    validate: {
      searchQuery: (value) =>
        value.length ? null : "You must specify a movie!",
    },
  });

  const movies = api.movie.getMovie.useQuery(
    {
      searchQuery: form.values.searchQuery,
    },
    {
      enabled: false,
      staleTime: Infinity,
    },
  );

  useEffect(() => {
    if (movies.data) {
      scrollIntoView();
    }
  }, [movies.data, scrollIntoView]);

  useEffect(() => {
    if (movies.error) {
      form.setFieldError("searchQuery", movies.error.message);
    }
  }, [movies.error, form]);

  const onSubmit = () => {
    void movies.refetch();
  };

  // TO-DO: show selected movie here, may be add a new endpoint
  // fetch some movie data
  // may be swap between a movie details card and the search component

  return (
    <>
      <Card p="lg" withBorder className={classes.card}>
        <FocusTrap active={true}>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
              size="md"
              name="movie"
              placeholder="Movie title..."
              {...form.getInputProps("searchQuery")}
              leftSection={<IconMovie />}
            />
            <Group mt="md" className={classes.wrapper}>
              <Button
                type="submit"
                size="md"
                variant="gradient"
                loading={movies.isFetching}
                disabled={movies.isFetching}
              >
                Search
              </Button>
              <Text className={classes["omdb-text"]}>
                Search powered by{" "}
                <Anchor href="https://www.omdbapi.com/" target="_blank">
                  OMDb API
                </Anchor>
                .
              </Text>
            </Group>
          </form>
        </FocusTrap>
      </Card>
      <Space h="md" />
      <Center>
        <Title ref={targetRef} opacity={!!movies.data ? 1 : 0}>
          Pick your movie
        </Title>
      </Center>
      {!!movies.data && movies.data?.length > 0 && (
        <MovieResults movies={movies.data} />
      )}
    </>
  );
};
