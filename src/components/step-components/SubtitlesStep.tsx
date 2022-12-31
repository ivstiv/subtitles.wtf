import { Badge, Button, Card, Group, NumberInput, Switch, Text } from "@mantine/core";
import { IconDownload, IconStar, IconFlag, IconExternalLink } from "@tabler/icons";
import { useContext } from "react";
import { trpc } from "../../utils/trpc";
import { AppContext } from "../AppContext";



// TO-DO: handle error
// TO-DO: handle loading
// TO-DO: implement controls https://opensubtitles.stoplight.io/docs/opensubtitles-api/a172317bd5ccc-search-for-subtitles
// TO-DO: separate into small components
// TO-DO: infinite query may be?
export const SubtitlesStep = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("Missing context provider for AppContext!");
  }

  const subs = trpc.subtitles.getSubtitles.useQuery({
    imdbID: context.imdbID,
    languages: context.languages,
  }, {
    staleTime: Infinity,
    onError: err => {
      // TO-DO: show alert
    },
  });



  return (
    <Group position="center">
      <Card
        p="lg"
        withBorder
        sx={theme => ({
          width: "90%",
          [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            width: "60%",
          },
        })}
      >
        <Group position="left">
          <NumberInput
            size="lg"
            defaultValue={0}
            label="Season"
            sx={{ width: "10%" }}
            hideControls
          />
          <NumberInput
            size="lg"
            defaultValue={0}
            label="Episode"
            sx={{ width: "10%" }}
            hideControls
          />
          <Switch size="lg" label="AI Generated"/>
          <Switch size="lg" label="Only trusted"/>
        </Group>
      </Card>
      {subs.data?.data.map(entry => (
        <Card
          key={entry.id}
          p="lg"
          withBorder
          sx={theme => ({
            width: "90%",
            [`@media (min-width: ${theme.breakpoints.md}px)`]: {
              width: "60%",
            },
          })}
        >
          <Group position="apart">
            <Text sx={{ textOverflow: "ellipsis", overflow: "hidden", width: "50%", wordBreak: "break-all" }}>
              {entry.attributes.release}
            </Text>
            <Group>
              <Badge
                variant="outline"
                leftSection={<IconStar size={10}/>}
                size="lg"
              >
                {entry.attributes.ratings}
              </Badge>
              <Badge
                variant="outline"
                leftSection={<IconFlag size={10}/>}
                size="lg"
              >
                {entry.attributes.language}
              </Badge>
              <Button variant="filled">
                <IconExternalLink/>
              </Button>
              <Button variant="gradient" leftIcon={<IconDownload/>}>
                {entry.attributes.download_count}
              </Button>
            </Group>
          </Group>
        </Card>
      ))}
    </Group>
  );
};
