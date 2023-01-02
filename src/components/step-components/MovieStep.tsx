import { useContext } from "react";
import { AppContext } from "../AppContext";
import { useForm } from "@mantine/form";
import { IconMovie } from "@tabler/icons";
import { trpc } from "../../utils/trpc";
import { useScrollIntoView } from "@mantine/hooks";
import { MovieResults } from "../MovieResults";
import { CenteredCard } from "../ui-elements/CenteredCard";
import {
  Button,
  Center,
  FocusTrap,
  Group,
  Space,
  Text,
  TextInput,
  Title,
} from "@mantine/core";




export const MovieStep = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("Missing context provider for AppContext!");
  }

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  const form = useForm({
    initialValues: {
      searchQuery: "",
    },
    validate: {
      searchQuery: value => value.length ? null : "You must specify a movie!",
    },
  });

  const movies = trpc.movies.getMovie.useQuery({
    searchQuery: form.values.searchQuery,
  }, {
    enabled: false,
    staleTime: Infinity,
    onSuccess: () => {
      scrollIntoView();
    },
    onError: err => {
      // backend errors are json encoded..
      // TO-DO: how do we parse this safely?
      form.setFieldError("searchQuery", JSON.parse(err.message)[0].message);
    },
  });

  // TO-DO: show selected movie here, may be add a new endpoint
  // fetch some movie data
  // may be swap between a movie details card and the search component

  return(
    <>
      <CenteredCard maxWidth="50%">
        <FocusTrap active={true}>
          <form
            onSubmit={form.onSubmit(() => {
              movies.refetch();
            })}
          >
            <TextInput
              size="lg"
              name="movie"
              placeholder="Movie title..."
              {...form.getInputProps("searchQuery")}
              icon={<IconMovie/>}
            />
            <Group position="apart" mt="md" sx={{ flexDirection: "row-reverse" }}>
              <Button
                type="submit"
                size="lg"
                variant="gradient"
                loading={movies.isFetching}
                disabled={movies.isFetching}
              >
                  Search
              </Button>
              <Text
                sx={theme => ({
                  fontSize: theme.fontSizes.md,
                  [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
                    fontSize: theme.fontSizes.xs,
                  },
                })}
              >
                  Search powered by <a href="https://www.omdbapi.com/" target="_blank" rel="external noreferrer">OMDb API</a>.
              </Text>
            </Group>
          </form>
        </FocusTrap>
      </CenteredCard>
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
