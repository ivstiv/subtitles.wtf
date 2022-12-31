import { useCallback, useContext } from "react";
import { Stepper as MantineStepper } from "@mantine/core";
import { AppContext } from "./AppContext";



export const Stepper = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("Missing context provider for AppContext!");
  }

  const changeStep = useCallback((step: number) => {
    // can't go to language if movie is not selected
    if(step === 1 && !context.imdbID) {
      return;
    }

    // can't go to subtitles without movie and language
    if(step === 2 && (!context.imdbID || !context.languages)) {
      return;
    }

    context.setStep(step);
  }, [context]);

  return (
    <>
      <MantineStepper
        active={context.step}
        onStepClick={changeStep}
        sx={theme => ({
          width: "fit-content",
          [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
            width: "100%",
          },
        })}
      >
        <MantineStepper.Step label="Pick your movie" />
        <MantineStepper.Step label="Select language"/>
        <MantineStepper.Step label="Get your snacks"/>
        <MantineStepper.Completed> completed todo??</MantineStepper.Completed>
      </MantineStepper>
    </>
  );
};
