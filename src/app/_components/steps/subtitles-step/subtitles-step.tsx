import {
  Alert,
  Anchor,
  Group,
  Loader,
  Pagination,
  Switch,
  Text,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useAppContext } from "~/data/app-context";
import { api } from "~/trpc/react";
import classes from "./subtitles-step.module.css";
import { useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";
import { SubtitleResult } from "./subtitle-result";

export const SubtitlesStep = () => {
  const context = useAppContext();
  const [page, setPage] = useState(1);
  const [includeAITranslated, setIncludeAITranslated] = useState(false);
  const subs = api.subtitles.getSubtitles.useQuery(
    {
      imdbID: context.imdbID,
      languages: context.languages,
      page,
      includeAITranslated,
    },
    {
      staleTime: Infinity,
      placeholderData: keepPreviousData,
      retry: 1,
    },
  );

  if (subs.isError) {
    return <ErrorCard error={subs.error.message} />;
  }

  return (
    <Group>
      <Text className={classes["os-text"]}>
        Subtitles provided by{" "}
        <Anchor href="https://www.opensubtitles.com/" target="_blank">
          opensubtitles.com
        </Anchor>
        .
      </Text>
      <Group className={classes["top-controls"]}>
        <Switch
          size="lg"
          label="AI Generated"
          mt="sm"
          checked={includeAITranslated}
          onChange={(event) =>
            setIncludeAITranslated(event.currentTarget.checked)
          }
        />
        {subs.isFetching && <Loader />}
        <Pagination
          total={subs.data?.total_pages ?? 0}
          value={subs.data?.page ?? 0}
          onChange={setPage}
          mt="sm"
        />
      </Group>
      {subs.data?.data.map((entry) => (
        <SubtitleResult key={entry.id} entry={entry} />
      ))}
    </Group>
  );
};

interface ErrorCardProps {
  error: string;
}
const ErrorCard = ({ error }: ErrorCardProps) => {
  return (
    <Group justify="center">
      <Alert
        className={classes.card}
        icon={<IconAlertCircle />}
        title="Bummer! Something went wrong..."
        color="red"
      >
        If this issue persists, please{" "}
        <Anchor
          href="https://github.com/ivstiv/subtitles.wtf/issues"
          target="_blank"
        >
          open a ticket
        </Anchor>{" "}
        so it can be fixed.
        <Text>Error: {error}</Text>
      </Alert>
    </Group>
  );
};
