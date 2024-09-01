import { useCallback } from "react";
import { Stepper as MantineStepper } from "@mantine/core";
import { useAppContext } from "~/data/app-context";
import classes from "./stepper.module.css";

export const Stepper = () => {
  const context = useAppContext();

  const changeStep = useCallback(
    (step: number) => {
      // can't go to language if movie is not selected
      if (step === 1 && !context.imdbID) {
        return;
      }

      // can't go to subtitles without movie and language
      if (step === 2 && (!context.imdbID || !context.languages)) {
        return;
      }

      context.setStep(step);
    },
    [context],
  );

  return (
    <MantineStepper
      active={context.step}
      onStepClick={changeStep}
      className={classes.stepper}
      visibleFrom="sm"
    >
      <MantineStepper.Step label="Pick your movie" />
      <MantineStepper.Step label="Select language" />
      <MantineStepper.Step label="Get your snacks" />
      <MantineStepper.Completed>Wooo</MantineStepper.Completed>
    </MantineStepper>
  );
};
