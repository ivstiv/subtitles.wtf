import { Button, Card, Center, FocusTrap, Group, ScrollArea, Space, Text, TextInput, Title } from "@mantine/core";
import { useCallback, useContext, useRef, useState } from "react";
import { AppContext } from "../AppContext";
import { useForm } from "@mantine/form";
import { IconMovie } from "@tabler/icons";
import { trpc } from "../../utils/trpc";
import { MovieCard } from "../MovieCard";
import { useScrollIntoView } from "@mantine/hooks";


export const MovieStep = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("Missing context provider for AppContext!");
  }

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();
  const resultsRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const movies = trpc.example.getMovie.useQuery({ searchQuery }, {
    enabled: !!searchQuery,
    staleTime: Infinity,
    onSuccess: () => {
      scrollIntoView();
      setInterval(() => {
        if(resultsRef.current) {
          if(resultsRef.current.scrollWidth > resultsRef.current.scrollLeft) {
            resultsRef.current.scrollTo({
              behavior: "auto",
              left: resultsRef.current.scrollLeft + 1,
            });
          }
        }
      }, 20);
    },
  });

  const selectMovie = useCallback((id: string) => {
    context.setMovie(id);
    context.setStep(prev => prev+1);
  }, [context]);

  console.log("movies", movies.data);

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
      <ScrollArea
        viewportRef={resultsRef}
        mt="md"
        style={{ width: "100%", height: "fit-content" }}
      >
        <Group noWrap sx={{ marginLeft: "200px" }}>
          {movies.data?.map((movie, i) => (
            <MovieCard
              key={`${movie.imdbID}-${i}`}
              movie={movie}
              onSelect={selectMovie}
            />
          ))}
        </Group>
      </ScrollArea>
    </>
  );
};
