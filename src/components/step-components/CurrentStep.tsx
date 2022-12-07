import { useContext } from "react";
import { AppContext } from "../AppContext";
import { LanguageStep } from "./LanguageStep";
import { MovieStep } from "./MovieStep";
import { SubtitlesStep } from "./SubtitlesStep";


const stepComponents = [
  <MovieStep key={0}/>,
  <LanguageStep key={1}/>,
  <SubtitlesStep key={2}/>,
];

export const CurrentStep = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("Missing context provider for AppContext!");
  }

  return stepComponents[context.step];
};
