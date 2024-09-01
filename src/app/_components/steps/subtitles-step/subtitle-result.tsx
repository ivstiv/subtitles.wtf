import { Badge, Button, Card, Group, Text, Tooltip } from "@mantine/core";
import { IconStar, IconFlag, IconExternalLink } from "@tabler/icons-react";
import { DownloadButton } from "./download-button";
import classes from "./subtitles-step.module.css";

interface Props {
  entry: {
    id: string;
    attributes: {
      release: string;
      ratings: number;
      language: string;
      url: string;
      files: { file_id: number }[];
      download_count: number;
    };
  };
}

export const SubtitleResult = ({ entry }: Props) => {
  return (
    <Card p="lg" withBorder className={classes.card}>
      <Group justify="space-between">
        <Text className={classes["subtitle-label"]}>
          {entry.attributes.release}
        </Text>
        <Group>
          <Badge
            variant="outline"
            leftSection={<IconStar size={10} />}
            size="lg"
          >
            {entry.attributes.ratings}
          </Badge>
          <Badge
            variant="outline"
            leftSection={<IconFlag size={10} />}
            size="lg"
          >
            {entry.attributes.language}
          </Badge>
          <Tooltip label="View on OpenSubtitles">
            <Button
              variant="filled"
              component="a"
              href={entry.attributes.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconExternalLink />
            </Button>
          </Tooltip>
          <DownloadButton
            fileId={entry.attributes.files[0]?.file_id ?? -1}
            downloadCount={entry.attributes.download_count}
          />
        </Group>
      </Group>
    </Card>
  );
};
