import { Badge, Button, Card, Group, Text } from "@mantine/core";
import Image from "next/image";
import { type OMDBMovieType } from "~/server/api/routers/movie";
import classes from "./movie-card.module.css";

type Props = {
  movie: OMDBMovieType;
  onSelect: (imdbID: string) => void;
};
export const MovieCard = ({ movie, onSelect }: Props) => {
  return (
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

      <Group mt="md">
        <Text className={classes["movie-card-text"]}>
          {movie.Title}
          <Badge color="pink" variant="light">
            {movie.Year}
          </Badge>
        </Text>
      </Group>

      {/* <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text> */}

      <Button
        onClick={() => onSelect(movie.imdbID)}
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        Select
      </Button>
    </Card>
  );
};
