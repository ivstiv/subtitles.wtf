import {
  Badge,
  Button,
  Card,
  Group,
  Text,
  Modal,
  Loader,
  Title,
  Grid,
} from "@mantine/core";
import Image from "next/image";
import { type OMDBMovieType } from "~/server/api/routers/movie";
import classes from "./movie-card.module.css";
import { api } from "~/trpc/react";
import {
  IconInfoCircle,
  IconCalendar,
  IconClock,
  IconMovie,
  IconStar,
  IconLanguage,
  IconWorld,
} from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  movie: OMDBMovieType;
  onSelect: (imdbID: string) => void;
};
export const MovieCard = ({ movie, onSelect }: Props) => {
  const [modalOpened, setModalOpened] = useState(false);
  const movieDetails = api.movie.getMovieDetails.useQuery(
    {
      imdbID: movie.imdbID,
    },
    {
      enabled: false,
      staleTime: Infinity,
    },
  );

  const handleInfoClick = () => {
    void movieDetails.refetch();
    setModalOpened(true);
  };

  return (
    <>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            unoptimized
            src={movie.Poster}
            width="300"
            height="443"
            alt={movie.Title}
          />
        </Card.Section>

        <Group mt="md" justify="space-between">
          <Text className={classes["movie-card-text"]}>
            {movie.Title}
            <Badge color="pink" variant="light">
              {movie.Year}
            </Badge>
          </Text>
        </Group>

        <Group mt="md">
          <Button
            onClick={() => onSelect(movie.imdbID)}
            variant="light"
            color="blue"
            radius="md"
            style={{ flexGrow: 1 }}
          >
            Select
          </Button>
          <Button
            variant="outline"
            color="blue"
            radius="md"
            onClick={handleInfoClick}
            px="xs"
          >
            <IconInfoCircle size={16} />
          </Button>
        </Group>
      </Card>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        size="lg"
        padding="md"
        title={
          <Group justify="apart" style={{ width: "100%" }}>
            <Title order={3}>{movie.Title}</Title>
          </Group>
        }
      >
        {movieDetails.data ? (
          <Grid>
            <Grid.Col span={4} visibleFrom="xs">
              <Image
                src={movieDetails.data.Poster}
                alt={movieDetails.data.Title}
                width={300}
                height={445}
                className={classes["modal-image"]}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <Group gap="xs" mb="xs">
                <IconCalendar size={16} />
                <Text>{movieDetails.data.Year}</Text>
                <IconClock size={16} />
                <Text>{movieDetails.data.Runtime}</Text>
                <IconMovie size={16} />
                <Text>{movieDetails.data.Genre}</Text>
              </Group>
              <Text mb="xs">
                <strong>Director:</strong> {movieDetails.data.Director}
              </Text>
              <Text mb="xs">
                <strong>Writer:</strong> {movieDetails.data.Writer}
              </Text>
              <Text mb="xs">
                <strong>Actors:</strong> {movieDetails.data.Actors}
              </Text>
              <Text mb="md">
                <strong>Plot:</strong> {movieDetails.data.Plot}
              </Text>
              <Group gap="xs" mb="xs">
                <Text>
                  <strong>IMDB Rating:</strong> {movieDetails.data.imdbRating}
                </Text>
                <IconStar size={16} />
                <Text>
                  <strong>Awards:</strong> {movieDetails.data.Awards}
                </Text>
              </Group>
              <Group gap="xs" mb="xs">
                <IconLanguage size={16} />
                <Text>
                  <strong>Language:</strong> {movieDetails.data.Language}
                </Text>
                <IconWorld size={16} />
                <Text>
                  <strong>Country:</strong> {movieDetails.data.Country}
                </Text>
              </Group>
              {movieDetails.data.BoxOffice && (
                <Text mb="xs">
                  <strong>Box Office:</strong> {movieDetails.data.BoxOffice}
                </Text>
              )}
              {movieDetails.data.Production && (
                <Text mb="xs">
                  <strong>Production:</strong> {movieDetails.data.Production}
                </Text>
              )}
            </Grid.Col>
          </Grid>
        ) : (
          <Loader />
        )}
      </Modal>
    </>
  );
};
