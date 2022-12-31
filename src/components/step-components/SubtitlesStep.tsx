import { useContext } from "react";
import { trpc } from "../../utils/trpc";
import { AppContext } from "../AppContext";


export const SubtitlesStep = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("Missing context provider for AppContext!");
  }

  const subs = trpc.subtitles.getSubtitles.useQuery({
    imdbID: context.imdbID,
    languages: context.languages,
  }, {
    enabled: false,
    staleTime: Infinity,
    onError: err => {
      // TO-DO: show alert
    },
  });

  return <>subs</>;
};
