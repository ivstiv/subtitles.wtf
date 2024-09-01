import { useAppContext } from "~/data/app-context";
import { MovieStep } from "./movie-step/movie-step";
import { LanguageStep } from "./language-step/language-step";
import { SubtitlesStep } from "./subtitles-step/subtitles-step";

const stepComponents = [
  <MovieStep key={0} />,
  <LanguageStep key={1} />,
  <SubtitlesStep key={2} />,
];

export const CurrentStep = () => {
  const context = useAppContext();

  return stepComponents.at(context.step);
};
