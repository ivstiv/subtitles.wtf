import { Alert, Badge, Button, Group, Loader, NumberInput, Switch, Text } from "@mantine/core";
import { IconDownload, IconStar, IconFlag, IconExternalLink, IconAlertCircle } from "@tabler/icons";
import { useContext } from "react";
import { trpc } from "../../utils/trpc";
import { AppContext } from "../AppContext";
import { CenteredCard } from "../ui-elements/CenteredCard";



// TO-DO: implement controls https://opensubtitles.stoplight.io/docs/opensubtitles-api/a172317bd5ccc-search-for-subtitles
// TO-DO: separate into small components
// TO-DO: infinite query may be?
// TO-DO: add poppins font
// TO-DO: implement downloading
// TO-DO: fix button links
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
  });


  if(subs.isFetching) {
    return (
      <CenteredCard maxWidth="50%">
        <Group position="center">
          <Loader></Loader>
        </Group>
      </CenteredCard>
    );
  }

  if(subs.isError) {
    return (
      <Group position="center">
        <Alert icon={<IconAlertCircle />} title="Bummer!" color="red">
          {
            // backend errors are json encoded..
            // TO-DO: how do we parse this safely?
            JSON.parse(subs.error.message)[0].message
          }
        </Alert>
      </Group>
    );
  }

  return (
    <Group>
      <CenteredCard maxWidth="50%">
        <Group position="right">
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
          <Text>
          Subtitles provided by <a href="https://www.opensubtitles.com/" target="_blank" rel="external noreferrer">opensubtitles.com</a>
          </Text>
        </Group>
      </CenteredCard>
      {subs.data?.data.map(entry => (
        <CenteredCard key={entry.id} maxWidth="60%">
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
        </CenteredCard>
      ))}
    </Group>
  );
};
