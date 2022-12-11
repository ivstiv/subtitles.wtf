import { Badge, Button, Card, Group, Text } from "@mantine/core";
import Image from "next/image";
import type { FC } from "react";
import type { OMDBMovieType } from "../server/trpc/router/example";

type Props ={
  movie: OMDBMovieType
  onSelect: (imdbID: string) => void
}
export const MovieCard: FC<Props> = ({ movie, onSelect }) => {
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

      <Group position="apart" mt="md" mb="xs" noWrap>
        <Text
          weight={500}
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "200px",
          }}
        >
          {movie.Title}
        </Text>

        <Badge color="pink" variant="light">
          {movie.Year}
        </Badge>
      </Group>

      {/* <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text> */}

      <Button
        onClick={() => onSelect(movie.imdbID)}
        variant="light"
        color="blue"
        fullWidth mt="md"
        radius="md"
      >
        Select
      </Button>
    </Card>
  );
};
